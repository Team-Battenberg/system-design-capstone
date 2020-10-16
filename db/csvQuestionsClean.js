const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;

const csvAllQuestionsStringifier = createCsvStringifier({
  header: [
    {id: 'id', title: 'id'},
    {id: 'product_id', title: 'product_id'},
    {id: 'body', title: 'body'},
    {id: 'date_written', title: 'date_written'},
    {id: 'asker_name', title: 'asker_name'},
    {id: 'asker_email', title: 'asker_email'},
    {id: 'reported', title: 'reported'},
    {id: 'helpful', title: 'helpful'},
  ],
});

let readStream = fs.createReadStream('/Users/Kov37/Downloads/questions.csv');
let writeStream = fs.createWriteStream('/Users/Kov37/SDCfiles/cleanQuestions.csv');

class CsvCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      //white space
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if(key != trimKey) {
        delete chunk[key];
      }
    }
    
    //cleaning each record
    //filter non-numbers
    chunk.id = chunk.id.replace(/\D/g,'');
    chunk.product_id = chunk.product_id.replace(/\D/g,'');
    chunk.reported = chunk.reported.replace(/\D/g,'');
    chunk.helpful = chunk.helpful.replace(/\D/g, '');
    chunk  = csvAllQuestionsStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
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
console.log('Done cleaning.')




