import React, {useState} from 'react';
import axios from 'axios';
import CardDisplay from './CardDisplay.jsx';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Checkbox, FormGroup, FormControlLabel, Modal, Paper, AppBar, Grid, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {green, lightBlue, deepPurple, red, yellow, blueGrey} from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
  root: {
    color: green[600],
    '&$checked': {
      color: green[800],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: lightBlue[600],
    '&$checked': {
      color: lightBlue[800],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlackCheckbox = withStyles({
  root: {
    color: deepPurple[700],
    '&$checked': {
      color: deepPurple[900],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const WhiteCheckbox = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[400],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: red.A700,
    '&$checked': {
      color: red.A700,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ColorlessCheckbox = withStyles({
  root: {
    color: blueGrey[100],
    '&$checked': {
      color: blueGrey[300],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
  FormControlLabel:{
    margin: 0,
    top: '50%',
    '-ms-transform': 'translateY(25%)',
    transform: 'translateY(25%)',
  }
}));

const SearchCards = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [searchedCards, updateSearchedCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [state, setState] = React.useState({
    green: false,
    blue: false,
    black: false,
    white: false,
    red: false,
    colorless: false,
  });

  const handleChange = (event) => {
    setState({ ...state, colorless:false, [event.target.name]: event.target.checked });
  };

  const colorlessSelected = () => {
    if (state.colorless) {
      setState({
        ...state,
        colorless: false
      })
    } else {
      setState({
        green: false,
        blue: false,
        black: false,
        white: false,
        red: false,
        colorless: true,
      })
    }
  };

  const changeSelectedCard = (card) => {
    setSelectedCard(card);
  }

  const searchCardsFromBulk = () => {
    const colorless = state.colorless;
    let identities = '';
    if (state.white) {
      identities+='W';
    }
    if (state.blue) {
      identities+='U';
    }
    if (state.black) {
      identities+='B';
    }
    if (state.red) {
      identities+='R';
    }
    if (state.green) {
      identities+='G'
    }
    if (state.colorless) {
      identities = 'N';
    }
    axios.get(`/searchCardsByColorIdentity/${identities}/${colorless}`).then(data => {
      updateSearchedCards(data.data);
    }).catch(err => {
      console.error(err);
    });
  }

  const body = (
    <div style={modalStyle} align='center' className={classes.Paper}>
      <AppBar position="relative" className={classes.AppBar} >
        <Typography variant='h5'>Search Cards from Virtual Bulk</Typography>
      </AppBar>
      <Grid container spacing={2} justifyContent='space-around'>
        <Grid item xs={2}>
          <Typography variant='h6' className={classes.Typography}>Colors</Typography>
        </Grid>
        <Grid item xs={10}>
          <FormGroup row>
            <FormControlLabel control={<WhiteCheckbox checked={state.white} onChange={handleChange} name="white" />} label='White'className={classes.FormControlLabel}/>
            <FormControlLabel control={<BlueCheckbox checked={state.blue} onChange={handleChange} name="blue" />} label='Blue' className={classes.FormControlLabel}/>
            <FormControlLabel control={<BlackCheckbox checked={state.black} onChange={handleChange} name="black" />} label='Black'className={classes.FormControlLabel}/>
            <FormControlLabel control={<RedCheckbox checked={state.red} onChange={handleChange} name="red" />} label='Red'className={classes.FormControlLabel}/>
            <FormControlLabel control={<GreenCheckbox checked={state.green} onChange={handleChange} name="green" />} label='Green'className={classes.FormControlLabel}/>
            <FormControlLabel control={<ColorlessCheckbox checked={state.colorless} onChange={colorlessSelected} name="colorless" />} label='Colorless'className={classes.FormControlLabel}/>
          </FormGroup>
        </Grid>
        <Grid item xs={11} >
          <Button onClick={searchCardsFromBulk}>
            <Typography variant='subtitle1'>Search Cards</Typography>
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Paper style={{with: '98%' ,maxHeight: '65vh', overflow: 'auto'}}>
            <Grid container spacing={2} justifyContent='space-between'>
              {searchedCards.map((item, index) => {
                return <CardDisplay key={index} card={item} index={index} selectedCard={selectedCard} changeSelectedCard={changeSelectedCard}/>
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Modal open={props.openSearchCards} onClose={props.closeSearchCards}>
      <DialogContent>
        {body}
      </DialogContent>
    </Modal>
  )
};

export default SearchCards;