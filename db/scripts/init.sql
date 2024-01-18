create table if not exists Users
(
    uuid         uuid default uuid() not null comment 'Unique User ID' primary key,
    password     varchar(128)        not null comment 'User''s password hash',
    email        varchar(80)         not null comment 'Users''s email',
    constraint Users_email           unique (email)
)
    comment 'Users';