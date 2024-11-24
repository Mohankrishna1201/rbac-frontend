
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardUsers from './components/Dashboard';
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className='bg-gray-50 dark:bg-[#0a0b10]'>

      <DashboardUsers />

    </div>
  );
}

export default App;
