import React, { useState, useEffect } from "react";
import fire from "../../firebase/config";
//import { FirebaseContext } from "../../store/Context";
//import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ValidateEmail } from "../../helpers/EmailValidator";
import { passwordValidator } from "../../helpers/PasswordValidator";
import TextInput from "../../components/textinput/TextInput";
import { toast } from "react-toastify";  
import "./Register.css";


const Register = () => {
 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('')
  const [signUp,setSignup]=useState('no');

  const history = useNavigate(); 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ username, email, password});
  };

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        if (window.location.pathname === "/")
          history("/");
        history(window.location.pathname);
      } else {
        history("/register");
      }
    });
  }, [dispatch]);

  const registerUser = ({ username, email, password}) => {
    if (!username || !email || !password ) {
      return toast.warning("Please fill in all fields!!");
    }

      fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const currentUser = fire.auth().currentUser;
        currentUser.updateProfile({
          displayName: username,
        });
        dispatch({ type: "SET_USER", payload: currentUser });
        history("/");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.error("User already exists");
        }
      });
  };

  return (
    <div className="container">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
      {error  !== '' && 
				            <div className="alert alert-danger" role="alert">
							  {error}
							</div>
						}
        <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

        <button className="form-group">Register</button>
      </form>
      
    </div>
  );
};

export default Register;
