alter table jit_browser.sessions add column if not exists host_protocol smallint not null default 0 check(host_protocol in (0,1));
create table if not exists jit_browser.runtime_releases (
 version integer primary key check(version>=5),
 sha256 text not null check(sha256 ~ '^[0-9a-f]{64}$')
);
alter table jit_browser.runtime_releases enable row level security;
revoke all on jit_browser.runtime_releases from public,anon,authenticated;
CREATE OR REPLACE FUNCTION public.jit_browser_transport_v1(p_action text, p_owner uuid, p_token text, p_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
declare
 v_now timestamptz := clock_timestamp();
 v_device jit_browser.devices%rowtype;
 v_session jit_browser.sessions%rowtype;
 v_command jit_browser.commands%rowtype;
 v_id uuid;
 v_owner uuid;
 v_code text;
begin
 if p_action='pair' and p_owner is not null then
  perform pg_advisory_xact_lock(hashtextextended(p_owner::text,0));
  delete from jit_browser.enrollments where owner_id=p_owner or expires_at<=v_now;
  v_code:=replace(gen_random_uuid()::text,'-','');
  insert into jit_browser.enrollments values(encode(sha256(convert_to(v_code,'UTF8')),'hex'),p_owner,v_now+interval '5 minutes');
  return jsonb_build_object('pairing_code',v_code,'expires_in_seconds',300);
 end if;
 if p_owner is not null and p_action in ('enqueue','enqueue_v2','result') then
  if p_action='result' then
   select * into v_command from jit_browser.commands where id=(p_data->>'command_id')::uuid and owner_id=p_owner;
   if not found then return '{"error":"command_not_found"}'; end if;
   if v_command.expires_at<=v_now then return '{"error":"command_expired"}'; end if;
   if not exists(select 1 from jit_browser.sessions where id=v_command.session_id and revoked_at is null and expires_at>v_now and last_seen>v_now-interval '10 seconds' and exists(select 1 from jit_browser.devices where id=v_command.device_id and revoked_at is null)) then
    return '{"error":"session_unavailable"}';
   end if;
   return jsonb_build_object('command_id',v_command.id,'status',v_command.status,'result',v_command.result);
  end if;
  select s.* into v_session from jit_browser.sessions s join jit_browser.devices d on d.id=s.device_id
   where s.owner_id=p_owner and s.revoked_at is null and d.revoked_at is null and s.expires_at>v_now and s.last_seen>v_now-interval '10 seconds'
   and (p_action<>'enqueue_v2' or s.host_protocol=1)
   order by s.approved_at desc limit 1 for update of s;
  if not found then return '{"error":"foreground_session_required"}'; end if;
  delete from jit_browser.commands where owner_id=p_owner and expires_at<=v_now;
  if exists(select 1 from jit_browser.commands where session_id=v_session.id and status in ('pending','claimed') and expires_at>v_now) then
   return '{"error":"command_in_progress"}';
  end if;
  v_id:=gen_random_uuid();
  insert into jit_browser.commands(id,owner_id,device_id,session_id,operation,arguments,created_at,expires_at,status)
   values(v_id,p_owner,v_session.device_id,v_session.id,'browser.observe',
    case when p_action='enqueue_v2' then p_data else '{}'::jsonb end,v_now,v_now+interval '30 seconds','pending');
  return jsonb_build_object('command_id',v_id,'status','pending');
 end if;
 if p_owner is not null or p_token is null or p_token !~ '^[0-9a-f]{64}$' then return '{"error":"unauthorized"}'; end if;
 if p_action='enroll' then
  delete from jit_browser.enrollments where verifier=encode(sha256(convert_to(p_data->>'pairing_code','UTF8')),'hex')
   and expires_at>v_now returning owner_id into v_owner;
  if not found then return '{"error":"pairing_invalid"}'; end if;
  perform pg_advisory_xact_lock(hashtextextended(v_owner::text,1));
  update jit_browser.devices set revoked_at=v_now where owner_id=v_owner and revoked_at is null;
  v_id:=gen_random_uuid();
  insert into jit_browser.devices(id,owner_id,credential_verifier,enrolled_at) values(v_id,v_owner,p_token,v_now);
  return jsonb_build_object('device_id',v_id);
 end if;
 select * into v_device from jit_browser.devices where credential_verifier=p_token and revoked_at is null for update;
 if not found then return '{"error":"unauthorized"}'; end if;
 if p_action='runtime' then
  if p_data->>'host_protocol'='1' then
   return jsonb_build_object('authorized',true,'release',
    (select to_jsonb(r) from jit_browser.runtime_releases r order by r.version desc limit 1));
  end if;
  return '{"authorized":true}';
 end if;
 if p_action='start' then
  update jit_browser.sessions set revoked_at=v_now where device_id=v_device.id and revoked_at is null;
  v_id:=gen_random_uuid();
  insert into jit_browser.sessions(id,owner_id,device_id,approved_at,expires_at,current_url,last_seen,host_protocol)
   values(v_id,v_device.owner_id,v_device.id,v_now,v_now+interval '10 minutes',p_data->>'origin',v_now,case when p_data->>'host_protocol'='1' then 1 else 0 end);
  return jsonb_build_object('session_id',v_id);
 end if;
 select * into v_session from jit_browser.sessions where id=(p_data->>'session_id')::uuid and device_id=v_device.id
  and revoked_at is null and expires_at>v_now for update;
 if not found then return '{"error":"session_unavailable"}'; end if;
 if p_action='stop' then
  update jit_browser.sessions set revoked_at=v_now where id=v_session.id;
  delete from jit_browser.commands where session_id=v_session.id;
  return '{"stopped":true}';
 end if;
 if v_session.last_seen<=v_now-interval '10 seconds' then return '{"error":"session_unavailable"}'; end if;
 if p_action='claim' then
  update jit_browser.sessions set last_seen=v_now where id=v_session.id;
  select * into v_command from jit_browser.commands where session_id=v_session.id and status='pending' and expires_at>v_now
   and (arguments='{}'::jsonb or v_session.host_protocol=1)
   order by created_at limit 1 for update skip locked;
  if not found then return '{"command":null}'; end if;
  update jit_browser.commands set status='claimed',claimed_at=v_now where id=v_command.id;
  return jsonb_build_object('command',jsonb_build_object('command_id',v_command.id,'operation',v_command.operation,
   'origin',v_session.current_url,'expires_at',v_command.expires_at) ||
    case when v_command.arguments='{}'::jsonb then '{}'::jsonb else jsonb_build_object('envelope',v_command.arguments) end);
 end if;
 if p_action='complete' then
  if octet_length((p_data->'result')::text)>4096 or jsonb_typeof(p_data->'result') is distinct from 'object' then
   return '{"error":"invalid_result"}';
  end if;
  if not (p_data->'result' ? 'error') and (p_data->'result'->>'origin') is distinct from v_session.current_url then
   return '{"error":"origin_mismatch"}';
  end if;
  update jit_browser.commands set status=case when p_data->'result' ? 'error' then 'failed' else 'completed' end,
   completed_at=v_now,result=p_data->'result' where id=(p_data->>'command_id')::uuid and session_id=v_session.id
   and status='claimed' and expires_at>v_now
   and (p_data->'result' ? 'error' or
    ((arguments='{}'::jsonb) <> (p_data->'result' ? 'protocol_version')))
   and (not (p_data->'result' ? 'protocol_version') or
    ((p_data->'result'->>'kind'='browser.action') =
     (arguments->>'operation' not in ('observe','extract'))));
  if not found then return '{"error":"command_unavailable"}'; end if;
  return '{"accepted":true}';
 end if;
 return '{"error":"unsupported_operation"}';
end
$function$;
revoke all on function public.jit_browser_transport_v1(text,uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.jit_browser_transport_v1(text,uuid,text,jsonb) to service_role;
