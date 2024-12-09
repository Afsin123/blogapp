// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";


// import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC2HmP2V9Rh6I4es5BRY6mxAO1w7k-BVbk",
    authDomain: "blog-app-8b70e.firebaseapp.com",
    projectId: "blog-app-8b70e",
    storageBucket: "blog-app-8b70e.appspot.com",
    messagingSenderId: "192711749933",
    appId: "1:192711749933:web:6ccbc0037916620a8e23a4"
  };

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD85JDx33JKjVml3H6rc8q3P9V1ymqyRDE",
//   authDomain: "blog-test-app-7fab2.firebaseapp.com",
//   projectId: "blog-test-app-7fab2",
//   storageBucket: "blog-test-app-7fab2.appspot.com",
//   messagingSenderId: "495379645328",
//   appId: "1:495379645328:web:d0fcfecfd4e0fce2c32915"
// };

  // Initialize Firebase
 
//  export const signUpEmailPwd=(email,password)=>{
//   return createUserWithEmailAndPassword(auth,email, password);
//  }
//  export const  signInEmailPwd= (email,password)=>{
//   return signInWithEmailAndPassword(auth, email, password);
//  }
 
//  export const signOutApp=()=>{
//    return signOut(auth);
//  }
  const fire = firebase.initializeApp(firebaseConfig); 
  export default fire; 
  //export default firebase.initializeApp(firebaseConfig); 
  
