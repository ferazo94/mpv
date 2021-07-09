import React, {useState} from 'react';
import { Modal, Card, Typography, DialogContent, Button,TextField, Grid, AppBar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardDisplay from './CardDisplay.jsx';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 100,
    marginLeft: 0,
    marginRight: 0,
    height: '10vh',
    // backgroundColor: theme.palette.background.default,
    border: 'none',
    boxShadow: 'none',
  },
  Paper: {
    position: 'absolute',
    height: '95vh',
    width: '58vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  Button: {
    margin: 0,
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
  },
  Typography: {
    margin: 0,
    top: '50%',
    '-ms-transform': 'translateY(50%)',
    transform: 'translateY(50%)',
  },
  TextField:{
    margin: 0,
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
  }
}));

let cards = [
  {
    name: 'Manabarbs',
    manaCost: "{3}{R}",
    cmc: 4.0,
    colors: [
        "Red"
    ],
    colorIdentity: [
        "R"
    ],
    type: "Enchantment",
    types: [
        "Enchantment"
    ],
    rarity: "Rare",
    set: "10E",
    setName: "Tenth Edition",
    text: "Whenever a player taps a land for mana, Manabarbs deals 1 damage to that player.",
    flavor: "\"I don't know why people say a double-edged sword is bad. It's a sword. With two edges.\"\n—Kamahl, pit fighter",
    artist: "Jeff Miracola",
    number: "218",
    layout: "normal",
    multiverseid: "130367",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130367&type=card",
  },
  {
    name: "Mana Short",
    manaCost: "{2}{U}",
    cmc: 3.0,
    colors: [
        "Blue"
    ],
    colorIdentity: [
        "U"
    ],
    type: "Instant",
    types: [
        "Instant"
    ],
    rarity: "Rare",
    set: "2ED",
    setName: "Unlimited Edition",
    text: "Tap all lands target player controls and that player loses all unspent mana.",
    artist: "Dameon Willich",
    number: "66",
    layout: "normal",
    multiverseid: "710",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=710&type=card",
  },
  {
    name: "Mana Flare",
    manaCost: "{2}{R}",
    cmc: 3.0,
    colors: [
        "Red"
    ],
    colorIdentity: [
        "R"
    ],
    type: "Enchantment",
    types: [
        "Enchantment"
    ],
    rarity: "Rare",
    set: "2ED",
    setName: "Unlimited Edition",
    text: "Whenever a player taps a land for mana, that player adds one mana of any type that land produced.",
    artist: "Christopher Rush",
    number: "163",
    layout: "normal",
    multiverseid: "807",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=807&type=card",
  },
  {
    name: "Manabarbs",
    manaCost: "{3}{R}",
    cmc: 4.0,
    colors: [
        "Red"
    ],
    colorIdentity: [
        "R"
    ],
    type: "Enchantment",
    types: [
        "Enchantment"
    ],
    rarity: "Rare",
    set: "2ED",
    setName: "Unlimited Edition",
    text: "Whenever a player taps a land for mana, Manabarbs deals 1 damage to that player.",
    artist: "Christopher Rush",
    number: "164",
    layout: "normal",
    multiverseid: "808",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=808&type=card",
  },
  {
    name: "Mana Vault",
    manaCost: "{1}",
    cmc: 1.0,
    type:"Artifact",
    types: [
        "Artifact"
    ],
    rarity: "Rare",
    set: "2ED",
    setName: "Unlimited Edition",
    text: "Mana Vault doesn't untap during your untap step.\nAt the beginning of your upkeep, you may pay {4}. If you do, untap Mana Vault.\nAt the beginning of your draw step, if Mana Vault is tapped, it deals 1 damage to you.\n{T}: Add {C}{C}{C}.",
    artist: "Mark Tedin",
    number: "260",
    layout: "normal",
    multiverseid: "627",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=627&type=card",
  },
  {
    name: "Mana Echoes",
    manaCost: "{2}{R}{R}",
    cmc: 4.0,
    colors: [
        "Red"
    ],
    colorIdentity: [
        "R"
    ],
    type: "Enchantment",
    types: [
        "Enchantment"
    ],
    rarity: "Mythic",
    set: "2XM",
    setName: "Double Masters",
    text: "Whenever a creature enters the battlefield, you may add an amount of {C} equal to the number of creatures you control that share a creature type with it.",
    flavor: "When the ground is saturated with mana, even the lightest footstep can bring it to the surface.",
    artist: "Christopher Moeller",
    number: "136",
    layout: "normal",
    multiverseid: "489809",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489809&type=card",
  },
  {
    name: "Mana Reflection",
    manaCost: "{4}{G}{G}",
    cmc: 6.0,
    colors: [
        "Green"
    ],
    colorIdentity: [
        "G"
    ],
    type: "Enchantment",
    types: [
        "Enchantment"
    ],
    rarity: "Rare",
    set: "2XM",
    setName: "Double Masters",
    text: "If you tap a permanent for mana, it produces twice as much of that mana instead.",
    flavor: "The greatest wonders of nature are found in the smallest saplings straining toward the canopy.",
    artist: "Chris Seaman",
    number: "175",
    layout: "normal",
    multiverseid: "489848",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=489848&type=card",
  }
];
const AddCard = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [inputCardName, changeCardName] = React.useState('');
  const [searchedCards, setSearchedCards] = React.useState(cards);
  const [selectedCard, setSelectedCard] = React.useState({});

  const inputCardNameChange = (e) => {
    changeCardName(e.target.value);
  };

  const searchButtom = () => {
    console.log(inputCardName);
  };

  const changeSelectedCard = (card) => {
    setSelectedCard(card);
  }

  const body = (
    <div style={modalStyle} align='center' className={classes.Paper}>
      <AppBar position="relative" className={classes.AppBar} >
        <Typography variant='h5'>Add Card to Virtual Bulk</Typography>
      </AppBar>
      <Grid container spacing={2} justifyContent='space-around'>
        <Grid item xs={3} >
          <Typography variant='h6' className={classes.Typography}>Card Name</Typography>
        </Grid>
        <Grid item xs={5} >
          <TextField id='cardName' variant='outlined' onChange={inputCardNameChange} required={true} size='medium' className={classes.TextField}/>
        </Grid>
        <Grid item xs={3} >
          <Button onClick={searchButtom} className={classes.Button}><Typography variant='h6'>Search Card</Typography></Button>
        </Grid>
        <Grid item xs={11}>
          <Paper style={{with: '100%' ,maxHeight: '75vh', overflow: 'auto'}}>
            <Grid container spacing={2} justify='space-between'>
              {searchedCards.map((item, index) => {
                return <CardDisplay key={index} card={item} index={index} selectedCard={selectedCard} changeSelectedCard={changeSelectedCard}/>
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

  return(
    <Modal open={props.openAddCard} onClose={props.closeAddCard}>
      <DialogContent>
        {body}
      </DialogContent>
    </Modal>
  )
};

export default AddCard;