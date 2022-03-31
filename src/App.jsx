import './App.css';

import Register from './pages/register/Register';
// import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Topbar from './components/topbar/Topbar';
import Homepage from './pages/homepage/Homepage';

function App() {
  return (
    
    <div className="App">
         <Router> 
         <Topbar />
         <Routes> 
         <Route exact path = '/' element = {<Homepage /> } /> 
         
         <Route path = '/Login'  element = { <Login/>} /> 
         <Route path = '/Register' element = { <Register />} /> 
         </Routes> 
        </Router> 
      
    </div>
   
  );
}

export default App;
