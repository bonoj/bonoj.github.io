-- JIT MCP gateway request replay and rate-limit ledger.
-- Apply only after review; isolated from existing Hermeticon Memory tables.
create schema if not exists jit_mcp_private;
create table if not exists jit_mcp_private.gateway_requests (
  nonce text primary key,
  received_at timestamptz not null default clock_timestamp()
);
create index if not exists gateway_requests_received_at_idx
  on jit_mcp_private.gateway_requests(received_at);
revoke all on schema jit_mcp_private from public, anon, authenticated;
revoke all on all tables in schema jit_mcp_private from public, anon, authenticated;
alter table jit_mcp_private.gateway_requests enable row level security;
-- Execute through a server-only database role; never expose this table to clients.
create or replace function jit_mcp_private.accept_gateway_request(
  p_nonce text, p_timestamp timestamptz, p_limit integer default 60
) returns boolean language plpgsql security invoker set search_path = '' as $$
declare n integer;
begin
  if p_nonce is null or length(p_nonce) < 20 or length(p_nonce) > 128
    or p_nonce !~ '^[A-Za-z0-9_-]+$'
    or p_timestamp is null
    or abs(extract(epoch from (clock_timestamp() - p_timestamp))) > 60
    or p_limit < 1 or p_limit > 60 then return false; end if;
  perform pg_advisory_xact_lock(987654321);
  select count(*) into n from jit_mcp_private.gateway_requests
   where received_at > clock_timestamp() - interval '1 minute';
  if n >= p_limit then return false; end if;
  insert into jit_mcp_private.gateway_requests(nonce) values(p_nonce)
   on conflict do nothing;
  return found;
end $$;
revoke all on function jit_mcp_private.accept_gateway_request(text,timestamptz,integer) from public, anon, authenticated;
-- Periodic cleanup of entries older than one day is required before production.
