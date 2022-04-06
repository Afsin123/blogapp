import React, { useState, useEffect } from "react";
import fire from "../../firebase/config";
//import { FirebaseContext } from "../../store/Context";
//import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ValidateEmail } from "../../helpers/EmailValidator";
import { passwordValidator } from "../../helpers/PasswordValidator";
import TextInput from "../../components/textinput/TextInput";
//import { MessageList } from "semantic-ui-react";
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
        history.push(window.location.pathname);
      } else {
        history("/register");
      }
    });
  }, [dispatch]);

  const registerUser = ({ username, email, password}) => {
    if (!username || !email || !password ) {
      return toast.warning("Please fill in all fields!!");
    }

    // if (password !== confirmPassword) {
    //   return toast.warning("Passwords donot match!");
    // }

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

  // const authenticate =()=> {
  //   const emailError = ValidateEmail(email.value);
	//    const passwordError = passwordValidator(password.value); 
     // setLoader(true);

    //  if(emailError){
    //   setEmail({...email,error:emailError});	   
    //   // setLoader(false);
    // }
    // else if(passwordError){
    //   setPassword({...password,error:passwordError});	   
    //   //setLoader(false);
    // }
    // else if(signUp === 'yes'){
    //   signUpEmailPwd(email.value,password.value).then((userCredential) => {
    //           setError("Success");
    //           //setLoader(false);
    //    })
    //    .catch((error) => {
    //      const errorCode = error.code;
    //      //const result = FirebaseErrorHandler(errorCode);
    //        setError(result);
    //        //setLoader(false);

    //    });
    // }
    // else{

    //   // signInEmailPwd(email.value,password.value).then((userCredential) => {
    //   //    const user = userCredential.user;
    //   //   setError("Success.Please SignIn to Site");
    //      //setLoader(false);

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     //const result = FirebaseErrorHandler(errorCode);
    //      setError(result);
    //       //setLoader(false);

    //   });
   

  //} 
  //const {firebase} = useContext(FirebaseContext)
  // const handleSubmit = (e) => {
  //   e.preventDefault(); 
  //   let messages = [];
  //   if(username.value  === '' || username.value == null ){
  //     messages.push('Name is required')
  //   }

  //   fire.auth.createUserWithEmailAndPassword(email,password).then((result)=> {
  //     result.user.updateProfile({displayName: username}).then(()=> {
  //      fire.firestore().collection('users').add({
  //        id:result.user.uid,
  //        username: username
  //      }).then(()=> {
  //         history("/login");
  //      })
  //     })
  //   })
  
   
  // };
  return (
    <div className="container">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
      {error  !== '' && 
				            <div className="alert alert-danger" role="alert">
							  {error}
							</div>
						}
        {/* <label htmlFor="username">Username</label> */}
        {/* <input
          className="formGroup"
          type="text"
          value={username.value}
          onChange={(e) => setUsername({value:e.target.value,error:""})}
          placeholder="Enter your username..."
        /> */}
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

        {/* <label htmlFor="email">Email</label>
        <TextInput
          className="registerInput"
          type="text"
          value={email.value}
          error={!!email.error}
					  errorText={email.error}
          onChange={(e) => setEmail({value:e.target.value,error:""})}
          placeholder="Enter your email..."
          variant="filled" 
        />
        <label htmlFor="password">Password</label>
        <TextInput
          className="registerInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        /> */}

        <button className="form-group">Register</button>
      </form>
      {/* <button className="registerLoginButton">Login</button> */}
    </div>
  );
};

export default Register;
