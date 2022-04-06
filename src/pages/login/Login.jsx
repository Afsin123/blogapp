import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import { signUpEmailPwd, signInEmailPwd } from "../../firebase/config";

import "./Login.css";
//import { Formik, Form , Field} from "formik";
//mport * as Yup from 'yup';

import { Button, Label, Divider } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { firebase } = useContext(FirebaseContext);
  const history = useNavigate();

  const handleLogin = (e) => {
    
    e.preventDefault(); 
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Logged In')
        history('/');
      })
      .catch((error) => {
        alert(error.message);
      });
    }
    
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;

{
  /* <Formik
initialValues={{ email: "", password: "" }}
 validationSchema={Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(4),
 })}
onSubmit={(values) => {
  console.log(values);
}}
>
{({ isSubmitting, isValid, dirty, errors, touched}) => (
  <div className="login">
    <span className="loginTitle">Login</span>
    <Form className="loginForm">
      <label>Email</label>
      <input
        className="loginInput"
        name="email"
        type="text"
        placeholder="Enter your email..."
      />
      
      <label>Password</label>
      <input
        className="loginInput"
        name="password"
        type="password"
        placeholder="Enter your password..."
      />
      {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}

      <button className="loginButton" onClick= {isSubmitting} 
       disabled={!isValid || !dirty || isSubmitting}> 
       Login 
       </button>
    </Form>
    <button className="loginRegisterButton">Register</button>
  </div>
)} */
}
{
  /* {({isSubmitting, isValid, dirty, errors}) => (
              <Form className='ui form'>
                  <MyTextInput name='email' placeholder='Email Address' />
                  <MyTextInput name='password' placeholder='Password' type='password' />
                  {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                  <Button 
                      loading={isSubmitting}
                      disabled={!isValid || !dirty || isSubmitting}
                      type='submit'
                      fluid
                      size='large'
                      color='teal'
                      content='Login'
                  />
                  <Divider horizontal>Or</Divider>
                 
              </Form>
          )} */
}

// </Formik>
