import React, { useState } from 'react';
import MyAppBar from './MyAppBar.jsx';
import AddCard from './AddCard.jsx';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  const [openAddCard, setOpenAddCard] = React.useState(false);
  const addCardButton = () =>{
    setOpenAddCard(true);
  };
  const closeAddCard = () => {
    setOpenAddCard(false);
  }
  return (
    <>
      <CssBaseline />
      <MyAppBar addCardButton={addCardButton}/>
      <AddCard openAddCard={openAddCard} closeAddCard={closeAddCard}/>
    </>
  )
};

export default App;