-- Applied to Hermeticon Memory project.
create table if not exists public.events (id bigint generated always as identity primary key,namespace text not null,item_key text not null,payload jsonb not null,created_at timestamptz not null default now());
create index if not exists events_lookup on public.events(namespace,item_key,id desc);
create table if not exists public.quotas (namespace text not null,minute timestamptz not null,count integer not null default 0,primary key(namespace,minute));
alter table public.events enable row level security;
alter table public.quotas enable row level security;
revoke all on public.events,public.quotas from anon,authenticated;
create or replace function public.append_event(p_namespace text,p_key text,p_payload jsonb,p_minute timestamptz)
returns bigint language plpgsql security definer set search_path = '' as $$
declare n integer; new_id bigint;
begin
 if p_namespace !~ '^[A-Za-z0-9_-]{1,64}$' or p_key !~ '^[A-Za-z0-9_-]{1,64}$' or pg_catalog.octet_length(p_payload::text)>4096 then raise exception 'invalid input'; end if;
 insert into public.quotas(namespace,minute,count) values(p_namespace,p_minute,1)
 on conflict(namespace,minute) do update set count=public.quotas.count+1 returning count into n;
 if n>30 then raise exception 'rate limited' using errcode='P0001'; end if;
 insert into public.events(namespace,item_key,payload) values(p_namespace,p_key,p_payload) returning id into new_id;
 return new_id;
end $$;
revoke all on function public.append_event(text,text,jsonb,timestamptz) from public,anon,authenticated;
grant execute on function public.append_event(text,text,jsonb,timestamptz) to service_role;