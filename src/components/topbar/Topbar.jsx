import React,{useContext} from "react";
import fire from "../../firebase/config";
//import { AuthContext } from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";
//import { FirebaseContext } from "../../store/Context";
import { useSelector , useDispatch} from "react-redux";
import { toast } from "react-toastify";
import "./topbar.css";

export default function Topbar() {
  const user = useSelector((state) => state.auth.user);
  //const user = false;

  // const {user} = useContext(AuthContext);
  // const {firebase} = useContext(FirebaseContext);
  const history = useNavigate();
  const dispatch = useDispatch();
  const logoutUser = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "RESET_USER" });
        toast.success("You are successfully logged out");
        history("/login");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="top">
      <div className="topLeft">
        {/* <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i> */}
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li> 
          
          {user && <li className= "topListItem" onClick = {()=> {
            history("/dashboard")
          }}> DASHBOARD </li> }
          {/* <li className="topListItem">CONTACT</li> */}
          {user && <li className= "topListItem" onClick = {()=> {
            history("/write")
          }}> ADD POST </li> }
          {/* <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li> */}
          {user && <li className="topListItem" onClick={()=> {
            logoutUser();
           // history("/Login") 
          }}>LOGOUT</li>}
          
        </ul>
      </div>
      <div className="topRight">
      <span> {user ? `Welcome ${user.displayName}`: (  <ul> <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN 
              </Link>   
              </li> 
              <li> <Link className="link" to="/register">
                REGISTER
              </Link>
              </li> 
              </ul> 
           )}</span>
      
           
           
        {/* {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN 
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )} */}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
