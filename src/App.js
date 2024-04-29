import './App.css';
import ContactUs from './components/ContactUs';
// import { Router, Route} from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Submissions from './components/Submissions';

function App() {
  return (
    <BrowserRouter>
      <div className="App w-full h-screen flex justify-center items-center bg-blue-400">
        <Routes>
          <Route path='/' element={<ContactUs/>} />
          <Route path='/Submissions' element={<Submissions/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
