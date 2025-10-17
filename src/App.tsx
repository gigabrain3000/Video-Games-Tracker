import { ReactElement } from 'react';
import './App.css'
import GameItemsContainer from './components/GameItemsContainer';
import Header from './components/Header';

function App(): ReactElement {
  return (
    <>
      <Header />
      <GameItemsContainer />
    </>
  )
}

export default App
