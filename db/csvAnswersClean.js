const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const MAX_LINE_SIZE = 100000;
const csvAllAnswersStringifier = createCsvStringifier({
  header: [
    {id: 'id', title: 'id'},
    {id: 'question_id', title: 'question_id'},
    {id: 'body', title: 'body'},
    {id: 'date_written', title: 'date_written'},
    {id: 'answerer_name', title: 'answerer_name'},
    {id: 'answerer_email', title: 'answerer_email'},
    {id: 'reported', title: 'reported'},
    {id: 'helpful', title: 'helpful'},
  ],
});

let readStream = fs.createReadStream('/Users/Kov37/Downloads/answers.csv');
let writeStream = fs.createWriteStream('/Users/Kov37/SDCfiles/cleanAnswers.csv');

class CsvCleaner extends Transform {
  constructor(options) {
    super(options);
    this.line = 0;
  }
  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      //white space
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if(key != trimKey) {
        delete chunk[key];
      }
      console.log('Chunk is of type: ', typeof chunk);
      console.log('Chunk.id is of type: ', typeof chunk.id);
    }
    this.line++;

    //cleaning each record
    //filter non-numbers
    console.log('Line Number:', this.line, chunk);
    if (this.line < MAX_LINE_SIZE) {
      chunk.id = Number(chunk.id.replace(/\D/g,''));
      chunk.question_id = chunk.question_id.replace(/\D/g,'');
      chunk.reported = chunk.reported.replace(/\D/g,'');
      chunk.helpful = chunk.helpful.replace(/\D/g, '');
      chunk = csvAllAnswersStringifier.stringifyRecords([chunk]);
      this.push(chunk);
      next();
    }
  }
}

//create instance of Transform  Object
const  transformer = new CsvCleaner({
  writableObjectMode: true
});

console.log('Cleaning data...');
//do the cleaning 
readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish',  () => {
    console.log('All done!');
  });




