import { ReactElement } from 'react';
import './App.css'
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';
import AppRoutes from './routes/routes';

function App(): ReactElement {
  return (
    <>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppRoutes></AppRoutes>
      </main>
    </>
  )
}

export default App
