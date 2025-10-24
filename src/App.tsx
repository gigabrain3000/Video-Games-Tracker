import { ReactElement } from 'react';
import './App.css'
import GameItemsContainer from './components/GameItemsContainer';
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';

function App(): ReactElement {
  return (
    <>
      <Header />
      <main className='flex'>
        <Sidebar />
        <GameItemsContainer />
      </main>
    </>
  )
}

export default App
