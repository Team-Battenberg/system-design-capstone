const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;


const csvAllPhotosStringifier  = createCsvStringifier({
  header: [
    {id: 'id', title: 'id'},
    {id: 'answer_id', title: 'answer_id'},
    {id: 'url', title: 'url'}
  ],
})

let readStream = fs.createReadStream('/Users/Kov37/Downloads/answers_photos.csv');
let writeStream = fs.createWriteStream('/Users/Kov37/Downloads/answer_photos.csv');

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
    chunk.answer_id = chunk.answer_id.replace(/\D/g,'');
    chunk  = csvAllPhotosStringifier.stringifyRecords([chunk]);
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