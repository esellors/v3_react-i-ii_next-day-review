/* 
  -We have some basic styling set up in App.css.
  -We'll bind methods for this demo (instead of using arrow functions) to learn more of when this is necessary.
  -We need to bring in our necessary components for this component.
*/

import React from 'react';
import './App.css';
import Header from './Components/Header';
import MyList from './Components/MyList';

function App() {
  return (
    <>
      <Header />
      <MyList />
    </>
  );
}

export default App;
