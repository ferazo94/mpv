import React from 'react';
import { AppBar, Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '8vh',
    // backgroundColor: theme.palette.background.default,
    border: 'none',
    boxShadow: 'none',
  },
  logo: {
    display: 'block',
    height: '6vh',
    width: 'auto',
    margin: '5px',
    display: 'inline',
  },
  typography: {
    margin: 0,
    position: 'inline',
    top: '50%',
    '-ms-transform': 'translateY(50%)',
    transform: 'translateY(50%)',
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    margin: 0,
    top: '50%',
    '-ms-transform': 'translateY(25%)',
    transform: 'translateY(25%)',
  }
}));

const MyAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.appBar}>
      <Grid container spacing={2} justifyContent='space-around'>
        <Grid item xs={5}>
          <Typography variant='h6' className={classes.typography}>EDH Bulk Manager {"&"} Deck Builder</Typography>
        </Grid>
        <Grid item xs={5}>
          <ButtonGroup variant='text' color='inherit' className={classes.buttonGroup}>
            <Button onClick={props.addCardButton}><Typography variant='h6'>Add Card</Typography></Button>
            <Button onClick={props.searchCardsButton}><Typography variant='h6'>Search Cards</Typography></Button>
            <Button><Typography variant='h6'>Decks</Typography> </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </AppBar>
  )
};

export default MyAppBar;