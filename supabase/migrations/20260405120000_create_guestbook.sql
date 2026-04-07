-- 방명록 테이블 (Supabase SQL Editor 또는 CLI로 적용)
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_created_at_idx
  on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

create policy "guestbook_select_all"
  on public.guestbook
  for select
  using (true);

create policy "guestbook_insert_all"
  on public.guestbook
  for insert
  with check (true);
