const express = require('express');
const axios = require('axios');
const path = require('path');
const port = 3000;
const db = require('./database');
const url = 'https://api.magicthegathering.io/v1/cards';

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());

app.get('/apiCards', (req, res) => {
  axios.get(url, {
    params: {
      name: req.body.name
    }
  }).then(data => {
    res.send(data.data.cards);
  }).catch(err => {
    res.end(err);
  })
});

app.post('/addCard', (req, res) => {
  db.addCard(req.body.card, (err, data) => {
    if(err) {
      res.end(err)
    } else {
      res.sendStatus(201);
    }
  })
});

app.delete('/deleteCard', (req, res) => {
  db.deleteCard(req.body.multiverseid, (err, data) => {
    if (err) {
      res.end(err);
    } else {
      res.send(204);
    }
  })
});

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
});