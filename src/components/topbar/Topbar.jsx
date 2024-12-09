import React,{useContext} from "react";
import fire from "../../firebase/config";
//import { AuthContext } from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
       
      </div>
      <div className="topCenter">
        <ul className="topList">
          
          <NavLink className = "topListItem"exact to="/">HOME</NavLink>
         
           {user && <NavLink className="topListItem" to="/dashboard">DASHBOARD</NavLink> }
       
           {user && <NavLink className= "topListItem" to = "/write"> ADD POST </NavLink> }

           {user && <li className="topListItem" onClick={()=> {
            logoutUser();
          
          }}>LOGOUT</li>}
          
        </ul>
      </div>
      <div className="topRight">
      {/* <span> {user ? `Welcome ${user.displayName}`: (  <ul> <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN 
              </Link>   
              </li> 
              <li> <Link className="link" to="/register">
                REGISTER
              </Link>
              </li> 
              </ul> 
           )}</span> */}
      
           
           
        {user ? (
          <div className="link" to="/settings">
            `Welcome {user.displayName}`  
          </div>
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
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
