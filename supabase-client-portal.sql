-- VelOrrbit Client Portal + Referral Ledger
-- Run once in Supabase Dashboard > SQL Editor.
-- ₹500 is recorded as PENDING on referral signup; an authorised admin must approve
-- it only after the published eligibility checks are completed.

create extension if not exists pgcrypto;

create table if not exists public.client_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  referral_code text not null unique,
  referred_by uuid references public.client_profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.client_profiles(id) on delete cascade,
  referred_user_id uuid not null unique references public.client_profiles(id) on delete cascade,
  amount numeric(12,2) not null default 500 check (amount > 0),
  status text not null default 'pending' check (status in ('pending','approved','paid','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create table if not exists public.client_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.client_profiles enable row level security;
alter table public.referral_rewards enable row level security;
alter table public.client_admins enable row level security;

drop policy if exists "Users read own profile" on public.client_profiles;
create policy "Users read own profile" on public.client_profiles
for select to authenticated
using (id = auth.uid() or exists (select 1 from public.client_admins a where a.user_id = auth.uid()));

drop policy if exists "Users read own referral rewards" on public.referral_rewards;
create policy "Users read own referral rewards" on public.referral_rewards
for select to authenticated
using (
  referrer_id = auth.uid()
  or referred_user_id = auth.uid()
  or exists (select 1 from public.client_admins a where a.user_id = auth.uid())
);

drop policy if exists "Admins read admin roster" on public.client_admins;
create policy "Admins read admin roster" on public.client_admins
for select to authenticated
using (user_id = auth.uid());

create or replace function public.create_velorrbit_client_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_referrer uuid;
  v_code text;
begin
  v_code := 'VO' || upper(substr(encode(gen_random_bytes(6), 'hex'), 1, 8));

  if nullif(upper(trim(coalesce(new.raw_user_meta_data->>'referral_code',''))), '') is not null then
    select id into v_referrer
    from public.client_profiles
    where referral_code = upper(trim(new.raw_user_meta_data->>'referral_code'))
    limit 1;
  end if;

  insert into public.client_profiles(id, full_name, referral_code, referred_by)
  values (new.id, nullif(trim(new.raw_user_meta_data->>'full_name'), ''), v_code,
          case when v_referrer = new.id then null else v_referrer end)
  on conflict (id) do nothing;

  if v_referrer is not null and v_referrer <> new.id then
    insert into public.referral_rewards(referrer_id, referred_user_id, amount, status)
    values (v_referrer, new.id, 500, 'pending')
    on conflict (referred_user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_velorrbit on auth.users;
create trigger on_auth_user_created_velorrbit
after insert on auth.users
for each row execute procedure public.create_velorrbit_client_profile();

create or replace function public.review_velorrbit_referral(p_reward_id uuid, p_approve boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.client_admins where user_id = auth.uid()) then
    raise exception 'Admin permission required';
  end if;

  update public.referral_rewards
  set status = case when p_approve then 'approved' else 'rejected' end,
      reviewed_at = now(),
      reviewed_by = auth.uid()
  where id = p_reward_id and status = 'pending';

  if not found then
    raise exception 'Pending referral reward not found';
  end if;
end;
$$;

revoke all on function public.review_velorrbit_referral(uuid, boolean) from public;
grant execute on function public.review_velorrbit_referral(uuid, boolean) to authenticated;

-- After creating your own account, make that user an admin by running:
-- insert into public.client_admins(user_id)
-- select id from auth.users where email = 'YOUR-ADMIN-EMAIL';
