create table if not exists user (
  id bigint primary key auto_increment,
  name varchar(50),
  constraint unique_name unique(name)
);

create table if not exists entry (
  id bigint primary key auto_increment,
  user_id bigint references user(id),
  date date,
  dispo varchar(10) check (dispo in ('OFF', 'ON', 'MAYBE', 'PLANNING'))
);

create table if not exists security_user (
  id bigint primary key auto_increment,
  user_id bigint references user(id),
  type varchar(10) check (type in ('DISCORD')),
  security_id varchar(256) unique
)