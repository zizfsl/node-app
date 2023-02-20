const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const ejs = require('ejs');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const results = [];

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.render('index', { data: results });
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
