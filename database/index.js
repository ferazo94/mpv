const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/edhBMDB', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});

const cardSchema = Schema({
  name:{ type:String, unique:true, index: true},
  manaCost: String,
  cmc:Number,
  colors: [
    String
  ],
  colorIdentity:[
    String
  ],
  type: String,
  supertypes: [
    String
  ],
  types: [
    String
  ],
  subtypes: [
    String
  ],
  text:String,
  artist:String,
  power:String,
  toughness:String,
  multiverseid:{ type:String, unique:true, index: true},
  imageUrl:String
});

const deckSchema = Schema ({
  name:{ type:String, unique:true, index: true},
  commander:String,
  colorIdentity:[
    String
  ]
});

const creatureSchema = Schema({
  deckName:{ type:String, index: true },
  name:{ type:String, index: true },
  manaCost:String,
  cmc:Number,
});

const spellSchema = Schema({
  deckName:{ type:String, index: true },
  name:{ type:String, index: true },
  manaCost:String,
  cmc:Number,
});

const Card = mongoose.model('Card', cardSchema, 'cards');
const Deck = mongoose.model('Deck', deckSchema, 'decks');
const Creature = mongoose.model('Creatures', creatureSchema, 'creatures');
const Spell = mongoose.model('Spells', spellSchema, 'spells');

const addCard = (card, callback) => {
  const newCard = new Card ({
    name:card.name,
    manaCost: card.manaCost,
    cmc:Number(card.cmc),
    colors: card.colors,
    colorIdentity:card.colorIdentity,
    type: card.type,
    supertypes: card.supertypes,
    types: card.types,
    subtypes:card.subtypes,
    text:card.text,
    artist:card.artist,
    power:card.power,
    toughness:card.toughness,
    multiverseid:card.multiverseid,
    imageUrl:card.imageUrl
  })

  newCard.save( (err, data) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const deleteCard = (multiverseid, callback) => {
  Card.deleteOne({multiverseid}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const searchCardsByColorIdentity = (identities, colorless, callback) => {
  if(colorless === true) {
    Card.aggregate().match({colors: []}).exec((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  } else {
    Card.aggregate().match({colorIdentity: {$in: identities}}).exec((err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }
}

module.exports = {
  addCard,
  deleteCard,
  searchCardsByColorIdentity
}