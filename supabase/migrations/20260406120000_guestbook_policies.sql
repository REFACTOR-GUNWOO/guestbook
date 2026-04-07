-- guestbook RLS + policies (re-apply after table recreation)

alter table public.guestbook enable row level security;

drop policy if exists "guestbook_select_all" on public.guestbook;
create policy "guestbook_select_all"
  on public.guestbook
  for select
  using (true);

drop policy if exists "guestbook_insert_all" on public.guestbook;
create policy "guestbook_insert_all"
  on public.guestbook
  for insert
  with check (true);
