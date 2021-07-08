import React, {useState} from 'react';
import { Modal, Card, Typography, DialogContent, Button,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  Card: {
    margin: 'auto',
    border: 'none',
    boxShadow: 'none',
    height: 600
  },
  Media: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  Paper: {
    position: 'absolute',
    height: '95vh',
    width: '58vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const AddCard = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [inputCardName, changeCardName] = React.useState('');

  const inputCardNameChange = (e) => {
    changeCardName(e.target.value);
  };

  const searchButtom = () => {
    console.log(inputCardName);
  }

  const body = (
    <div style={modalStyle} className={classes.Paper}>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <Typography variant='subtitle2'>Card Name</Typography>
        </Grid>
        <Grid item xs={5} >
          <TextField id='cardName' label='Ex: Tesigur, the Golden Fang' variant='outline' onChange={inputCardNameChange} required={true} size='medium'/>
        </Grid>
        <Grid item xs={3} >
          <Button onClick={searchButtom}><Typography variant='subtitle2'>Search Card</Typography></Button>
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