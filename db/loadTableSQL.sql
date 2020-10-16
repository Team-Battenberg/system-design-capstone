create table if not exists allanswers (
	answer_id integer not null,
	question_id integer not null,
	body varchar(255),
	date_written date, 
	answerer_name varchar(60),
	answerer_email varchar(60),
	reported integer,
	helpful integer,
	primary key(answer_id)
);
create table if not exists allquestions (
	question_id integer not null, 
	product_id integer not null, 
	body varchar(255),
	date_written date,
	asker_name varchar(60),
	asker_email varchar(60),
	reported integer,
	helpful integer,
	primary key(question_id)
);
create table if not exists allanswerphotos (
	photo_id integer,
	answer_id integer,
	url varchar(1000),
	primary key(photo_id)
);

copy allanswers--(answer_id, question_id, body, date_written, answer_name, answer_email, reported, helpful)
from '/Users/Kov37/Desktop/SDC/answers.csv'
delimiter ','
csv header;

copy allquestions
from '/Users/Kov37/Desktop/SDC/questions.csv'
delimiter ','
csv header;

copy allanswerphotos
from '/Users/Kov37/Desktop/SDC/answers_photos.csv'
delimiter ','
csv header;
