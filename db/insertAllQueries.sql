--populate photos 
insert into photos(photo_id, photo_url)
select photo_id, url
from allanswerphotos allphotos;

--populate  answerer_name
insert into answerer_name (name) 
(select distinct answerer_name 
from allanswers)

--populate  asker_name
insert into asker_name (name) 
(select distinct asker_name 
from allquestions)

--populate answers 
insert into answers(answer_id, answer_date, answerer_name_id,answer_body,helpfulness,reported)
select allanswers.answer_id,  allanswers.date_written, answerer_name.answerer_name_id, allanswers.body, allanswers.helpful, allanswers.reported 
from allanswers
left outer join  
answerer_name
on allanswers.answerer_name = answerer_name."name";

--populate questions
insert into questions(question_id,question_date,question_body, asker_name_id, reported, helpfulness)
 select allquestions.question_id, allquestions.date_written,allquestions.body,asker_name.asker_name_id,allquestions.reported,allquestions.helpful
 from allquestions 
 left outer join 
 asker_name
 on allquestions.asker_name = asker_name."name";




