import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
//import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate} from "react-router-dom";
import "./Register.css";

const Register = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {firebase} = useContext(FirebaseContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=> {
      result.user.updateProfile({displayName: username}).then(()=> {
       firebase.firestore().collection('users').add({
         id:result.user.uid,
         username: username
       }).then(()=> {
          history("/login");
       })
      })
    })
  
    // console.log(email, username, password);
    // console.log(firebase);
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="registerInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
        />
        <label htmlFor="email">Email</label>
        <input
          className="registerInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <label htmlFor="password">Password</label>
        <input
          className="registerInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />

        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">Login</button>
    </div>
  );
};

export default Register;
