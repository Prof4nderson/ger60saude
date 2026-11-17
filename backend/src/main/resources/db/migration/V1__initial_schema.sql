create table app_user (
  id bigserial primary key,
  name varchar(120) not null,
  email varchar(180) not null unique,
  password_hash varchar(255) not null,
  role varchar(30) not null,
  created_at timestamptz not null default now()
);

create table elder (
  id bigserial primary key,
  name varchar(140) not null,
  birth_date date not null,
  relation varchar(60),
  blood_type varchar(4),
  allergies text,
  conditions text,
  created_at timestamptz not null default now()
);

create table elder_access (
  user_id bigint not null references app_user(id) on delete cascade,
  elder_id bigint not null references elder(id) on delete cascade,
  permission varchar(30) not null default 'READ_WRITE',
  primary key (user_id, elder_id)
);

create table medication (
  id bigserial primary key,
  elder_id bigint not null references elder(id) on delete cascade,
  name varchar(120) not null,
  dose varchar(80) not null,
  schedule_time time not null,
  stock_quantity integer not null default 0,
  stock_expires_on date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table medication_log (
  id bigserial primary key,
  medication_id bigint not null references medication(id) on delete cascade,
  administered_at timestamptz not null,
  status varchar(20) not null,
  responsible_user_id bigint references app_user(id),
  notes varchar(500)
);

create table care_activity (
  id bigserial primary key,
  elder_id bigint not null references elder(id) on delete cascade,
  category varchar(40) not null,
  title varchar(140) not null,
  detail varchar(500),
  scheduled_at timestamptz,
  completed_at timestamptz,
  created_by bigint references app_user(id),
  created_at timestamptz not null default now()
);

create table appointment (
  id bigserial primary key,
  elder_id bigint not null references elder(id) on delete cascade,
  title varchar(160) not null,
  professional varchar(140),
  appointment_type varchar(40) not null,
  starts_at timestamptz not null,
  location varchar(180),
  notes varchar(500),
  created_at timestamptz not null default now()
);

create table care_diary_entry (
  id bigserial primary key,
  elder_id bigint not null references elder(id) on delete cascade,
  mood varchar(40),
  note text,
  created_by bigint references app_user(id),
  created_at timestamptz not null default now()
);

create index idx_medication_elder on medication(elder_id);
create index idx_activity_elder_scheduled on care_activity(elder_id, scheduled_at);
create index idx_appointment_elder_starts on appointment(elder_id, starts_at);
create index idx_diary_elder_created on care_diary_entry(elder_id, created_at desc);
