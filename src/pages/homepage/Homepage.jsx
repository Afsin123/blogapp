import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header'; 
import Posts from '../../dashboard/Posts';
import SeePost from '../../dashboard/SeePost';
import fire from '../../firebase/config';

const Homepage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });
        
        history('/');
      } else {
        history("/login");
      }
    });
  }, [dispatch]);
  
  return (

    <div> 
        <Header/> 
        {/* <Posts />  */}
        
    </div>
  )
}

export default Homepage