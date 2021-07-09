import React, {useState} from 'react';
import axios from 'axios';
import { Modal, Card, Typography, DialogContent, Button,TextField, Grid, AppBar, Paper, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardDisplay from './CardDisplay.jsx';
import Alert from '@material-ui/lab/Alert';

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

const AddCard = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [inputCardName, changeCardName] = React.useState('');
  const [searchedCards, setSearchedCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFail, setOpenFail] = React.useState(false);

  const inputCardNameChange = (e) => {
    changeCardName(e.target.value);
  };

  const searchButtom = () => {
    axios.get(`/apiCards/${inputCardName}`)
    .then(data => {
      setSearchedCards(data.data);
    }).catch(err => {
      console.error(err);
    });
  };

  const changeSelectedCard = (card) => {
    setSelectedCard(card);
  }

  const addCardToBulk = () => {
    axios.post('/addCard',{
      card: selectedCard
    }).then(data => {
      setSearchedCards([]);
      setSelectedCard({});
      changeCardName('');
      setOpenSuccess(true);
      setTimeout(()=>{
        setOpenSuccess(false);
      }, 5000);
    }).catch (err => {
      setOpenFail(true);
      setTimeout(()=>{
        setOpenFail(false);
      }, 5000);
    })
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
          <TextField id='cardName' variant='outlined' onChange={inputCardNameChange} required={true} size='medium' className={classes.TextField} value={inputCardName}/>
        </Grid>
        <Grid item xs={3} >
          <Button onClick={searchButtom} className={classes.Button}><Typography variant='h6'>Search Card</Typography></Button>
        </Grid>
        <Grid item xs={11}>
          <Paper style={{with: '100%' ,maxHeight: '75vh', overflow: 'auto'}}>
            <Grid container spacing={2} justifyContent='space-between'>
              {searchedCards.map((item, index) => {
                return <CardDisplay key={index} card={item} index={index} selectedCard={selectedCard} changeSelectedCard={changeSelectedCard}/>
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={11}>
          <Collapse in={openSuccess}>
            <Alert severity='success'>Card add successfully</Alert>
          </Collapse>
          <Collapse in={openFail}>
            <Alert severity='error'>Card is already in the bulk</Alert>
          </Collapse>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={addCardToBulk} className={classes.Button}>
            <Typography variant='h6'>Add Card</Typography>
          </Button>
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