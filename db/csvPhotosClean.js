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
let writeStream = fs.createWriteStream('/Users/Kov37/SDCfiles/answers_photos.csv');

class CsvCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      //white space
      let trimmed = key.trim();
      chunk[trimmed] = chunk[key];
      if(key != trimmed) {
        delete chunk[key];
      }
    }
    
    //cleaning each record
    //filter non-numbers
    chunk.id = chunk.id.replace(/\D/g,'');
    chunk.answer_id = chunk.answer_id.replace(/\D/g,'');
    chunk.url = chunk.url ? chunk.url : '';
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

console.log('Done cleaning.')