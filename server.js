const express = require('express');
const axios = require('axios');
const path = require('path');
const port = 3000;
const db = require('./database');

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());


app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
})