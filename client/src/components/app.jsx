import React, { useState } from 'react';
import MyAppBar from './MyAppBar.jsx';
import AddCard from './AddCard.jsx';
import SearchCards from './SearchCards.jsx';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  const [openAddCard, setOpenAddCard] = React.useState(false);
  const [openSearchCards, setOpenSearchCards] = React.useState(false);
  const addCardButton = () =>{
    setOpenAddCard(true);
  };
  const searchCardsButton = () => {
    setOpenSearchCards(true);
  }
  const closeAddCard = () => {
    setOpenAddCard(false);
  }
  const closeSearchCards = () => {
    setOpenSearchCards(false);
  }
  return (
    <>
      <CssBaseline />
      <MyAppBar addCardButton={addCardButton} searchCardsButton={searchCardsButton}/>
      <AddCard openAddCard={openAddCard} closeAddCard={closeAddCard}/>
      <SearchCards openSearchCards={openSearchCards} closeSearchCards={closeSearchCards}/>
    </>
  )
};

export default App;