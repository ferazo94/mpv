import React from 'react';
import { Card, Grid, Checkbox, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  Card: {
    margin: 'auto',
    border: 'none',
    boxShadow: 'none',
    height: 300
  },
  Media: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    marginRight: 'auto',
    marginLeft: 'auto'
  }
}));

const CardDisplay = ({card, index, selectedCard, changeSelectedCard}) => {
  const classes = useStyles();
  const changeCardTo = () => {
    changeSelectedCard(card);
  };
  const invisible = () => {
    if (selectedCard.multiverseid === undefined) {
      return true;
    } else if (selectedCard.multiverseid === card.multiverseid) {
      return false;
    }
    return true;
  };
  return (
    <Grid item xs={3}>
      <Badge color="secondary" badgeContent=" " overlap='circular' invisible={invisible()}>
        <Checkbox
            icon={<Card key={index} className={classes.Card}>
            <img src={card.imageUrl} alt={index} className={classes.Media}/>
            </Card>}
            checkedIcon={<Card key={index} className={classes.Card}>
            <img src={card.imageUrl} alt={index} className={classes.Media}/>
            </Card>}
            onClick={changeCardTo}
          />
      </Badge>
    </Grid>
  )
};

export default CardDisplay;