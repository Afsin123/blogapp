import React, {useEffect, useContext} from 'react';
import Register from './pages/register/Register';

// import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';
import Login from './pages/login/Login';
import Topbar from './components/topbar/Topbar';
import Homepage from './pages/homepage/Homepage';
import { ToastContainer } from 'react-toastify'; 

import { useSelector, useDispatch } from 'react-redux';
import fire from './firebase/config';
// import { AuthContext } from './store/Context';
// import { FirebaseContext } from './store/Context';
import './App.css';
import AddPost from './dashboard/AddPost';
import SeePost from './dashboard/SeePost';
import Posts from './dashboard/Posts';
import Dashboard from './dashboard/Dashboard';
import EditPost from './dashboard/EditPost';



function App() {

  const dispatch = useDispatch();
  //const path = useRoutes();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user)=> {
      if(user){
        if(!isLoggedIn) dispatch({ type:"SET_USER", payload: user});
      }
    })

  }, [dispatch]); 

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);



  
  
  // const {user, setUser} = useContext(AuthContext)
  // const {firebase} = useContext(FirebaseContext)
  // useEffect(() => {
  //   fire.auth().onAuthStateChanged((user)=>{
  //     setUser(user)
  //   })
  // }) 
    
  
  return (
    
    <div className="App">
      <ToastContainer /> 
         <Router> 
         <Topbar />
         <Routes> 
         <Route exact path = '/' element = {<Homepage /> } /> 
         <Route path = '/dashboard'  element = { <Dashboard /> } /> 
         
         <Route path = '/Login'  element = { <Login/>} /> 
         <Route path = '/Register' element = { <Register />} /> 
         <Route path = '/Write'  element = { <AddPost />} /> 
         <Route path = '/homepage/post/:id/edit'  element = { <EditPost /> } /> 
         <Route path = '/posts'  element = { <Posts  /> } />  
         <Route path = '/post/:id'  element = { <SeePost /> } /> 
         <Route path = ":id" element = { <SeePost /> } /> 
         </Routes> 
        </Router> 
      
    </div>
   
  );
}

export default App;
