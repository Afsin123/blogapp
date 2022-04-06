import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//css
import './index.css';
import "react-toastify/dist/ReactToastify.css"; 

//redux
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers,compose, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {Provider} from "react-redux"; 

// reducers import
import authReducer from './redux/reducers/authReducer';
import postReducer from './redux/reducers/postReducer';

//composers
const composedEnhancers = composeWithDevTools || compose;

//reducers
const reducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

const store = createStore(reducers, composedEnhancers(applyMiddleware(thunk))); 

//import {FirebaseContext} from './store/Context';
//import Context from './store/Context';
//import firebase from './firebase/config';

//import Store from  './store/Store';


ReactDOM.render(
  <Provider store = {store}> 
    <App/>
  </Provider>,   
  document.getElementById('root')  
);   


// ReactDOM.render(
//   <Provider store = {Store}> 
//   <FirebaseContext.Provider value = {{firebase}}> 
//   <Context> 
//   <App />
//   </Context>
//   </FirebaseContext.Provider>  
//   </Provider>,   
//   document.getElementById('root')  
// );   

