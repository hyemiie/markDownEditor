// index.js
const express = require('express');
const cors = require('cors');
const { getText } = require('./controller/content.controller');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/convertText', getText);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
