import './App.css';
import ContactUs from './components/ContactUs';
// import { Router, Route} from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Submissions from './components/Submissions';
import { useState } from 'react';

function App() {

  return (
    <BrowserRouter>
      <div className="App background-image  w-full h-screen flex justify-end items-center">
        <div className='h-screen w-screen bg-gradient-to-r from-indigo-700  opacity-80 absolute'></div>
        <Routes>
          <Route path='/' element={<ContactUs />} />
          <Route path='/Submissions' element={<Submissions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
