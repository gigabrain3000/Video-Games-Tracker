import { ReactElement } from 'react';
import './App.css'
import Header from './components/Header';
import { Sidebar } from './components/Sidebar';
import AppRoutes from './routes/routes';
import { AppProvider } from "./context/AppContext";

function App(): ReactElement {
  return (
    <AppProvider>
      <Header />
      <main className='flex'>
        <Sidebar />
        <AppRoutes></AppRoutes>
      </main>
    </AppProvider>
  )
}

export default App
