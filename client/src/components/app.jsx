import React, { useState } from 'react';
import MyAppBar from './MyAppBar.jsx';

const App = () => {
  const [apiCards, setApiCards] = React.useState([]);
  const addCardButton = () =>{
    console.log('here!!');
  }
  return (
    <div>
      <MyAppBar addCardButton={addCardButton}/>
    </div>
  )
};

export default App;