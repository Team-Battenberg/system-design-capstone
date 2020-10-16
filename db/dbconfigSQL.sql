--first load this file into postGreSql
--drop database if exists SDC;
create database SDC;

--use database SDC;
--create all primary tables without foreign keys
create table if not exists questions (
	question_id integer not null, 
	question_date date, 
	question_body varchar(255),
	asker_name_id integer not null, 
	reported integer, 
	helpfulness integer, 
	primary key(question_id)
);
create table if not exists answers (
	answer_id integer not null, 
	answer_date date, 
	answerer_name_id integer not null, 
	answer_body varchar(255), 
	helpfulness integer, 
	reported integer, 
	primary key(answer_id)
);
create table if not exists answer_photos (
	photo_id integer not null, 
	photo_url varchar(255),
	primary key(photo_id)
);
create table if not exists asker_name (
	asker_name_id integer not null primary key, 
	name varchar(255)
);
create table if not exists answerer_name (
	answerer_name_id integer not null, 
	name varchar(255)
);
--end create all primary tables


create table if not exists questions_photos (
	question_id integer not null, 
	photo_id integer not null, 
	primary key(question_id), 
	constraint fk_question_id
		foreign key(question_id)
		references questions(question_id), 
	CONSTRAINT fk_photo_id
      FOREIGN KEY(photo_id) 
	  REFERENCES answer_photos(photo_id)
);
create table if not exists answers_photos (
	answer_id integer not null, 
	photo_id integer not null, 
	primary key(answer_id), 
	constraint fk_answer_id
		foreign key(answer_id)
		references answers(answer_id), 
	CONSTRAINT fk_photo_id
      FOREIGN KEY(photo_id) 
	  REFERENCES answer_photos(photo_id)
);


create table if not exists questions_answers (
	question_id integer not null, 
	answer_id integer not null,
	product_id integer not null,
	CONSTRAINT fk_question_id
      FOREIGN KEY(question_id) 
	  REFERENCES questions(question_id), 
	CONSTRAINT fk_answer_id
      FOREIGN KEY(answer_id) 
	  REFERENCES answers(answer_id)
);
