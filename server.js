const express = require('express');
const axios = require('axios');
const path = require('path');
const port = 3000;
const db = require('./database');
const url = 'https://api.magicthegathering.io/v1/cards';

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());

app.get('/apiCards/:name', (req, res) => {
  axios.get(url, {
    params: {
      name: req.params.name
    }
  }).then(data => {
    res.send(data.data.cards);
  }).catch(err => {
    res.end(err);
  });
});

app.post('/addCard', (req, res) => {
  db.addCard(req.body.card, (err, data) => {
    if(err) {
      res.status(409).end();
    } else {
      res.sendStatus(201);
    }
  });
});

app.delete('/deleteCard', (req, res) => {
  db.deleteCard(req.body.multiverseid, (err, data) => {
    if (err) {
      res.status(400).end();
    } else {
      res.send(204);
    }
  })
});

app.get('/searchCardsByColorIdentity/:identities/:colorless', (req, res) => {
  const colorless = req.params.colorless === 'true' ? true:false;
  const identities = req.params.identities.split('');
  db.searchCardsByColorIdentity(identities, colorless, (err, data) => {
    if(err) {
      console.log(err);
      res.status(400).end()
    } else {
      res.send(data);
    }
  })
})

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
});