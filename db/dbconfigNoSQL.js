import { connect, connection, Schema, model } from 'mongoose';
const connectionString = 'mongodb://localhost/SDC';

connect(connectionString, {useNewUrlParser: true});
const db = connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to collection catwalk...");
});

const questionsSchema = new Schema({
  question_id: {
    type: Number,
    unique: true,
    index: true,
    required: true
  },
  body:  {
    type: String
  },
  date: {
    type: Date
  },
  asker_name: {
    type: String
  }, 
  helpfulness: {
    type: Number
  }, 
  reported : {
    type: Number
  }
});
const questions = model('questions', questionsSchema);

const answerQuestionsSchema = new Schema({
  answer_id: {
    type: Number,
    index: true,
    required: true, 
    unique: true
  },
  question_id: {
    type: Number
  },
  product_id: {
    type: Number
  }
});
const answerQuestions = model('answerQuestions', answerQuestionsSchema);

const answersSchema = new Schema({
  answer_id:  {
    type: Number, 
    unique: true,
    required: true
  },
  body: {
    type: String
  },
  date: {
    type: Date
  },
  helpfulness:  {
    type: Number
  },
  reported: {
    type: Number
  }, 
  photos: [String]
});
const answers = model('answers', answersSchema);

export default {
  answers,
  answerQuestions, 
  questions,
  db
};