import React, { useState } from 'react';
import MyAppBar from './MyAppBar.jsx';
import AddCard from './AddCard.jsx';

const App = () => {
  const [apiCards, setApiCards] = React.useState([]);
  const [openAddCard, setOpenAddCard] = React.useState(false);
  const addCardButton = () =>{
    setOpenAddCard(true);
  };
  const closeAddCard = () => {
    setOpenAddCard(false);
  }
  return (
    <div>
      <MyAppBar addCardButton={addCardButton}/>
      <AddCard openAddCard={openAddCard} closeAddCard={closeAddCard}/>
    </div>
  )
};

export default App;