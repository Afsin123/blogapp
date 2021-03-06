import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch , shallowEqual} from 'react-redux';
import { getPosts, postDel } from '../redux/actionCreators/postsActionCreators';
import { toast } from 'react-toastify';
import moment from 'moment';


const SeePost = ({post}) => {
    const {id} = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const history = useNavigate();
    
    const { posts, postsLoading, isLoggedIn, user, userId } = useSelector(
        (state) => ({
          posts: state.posts.posts,
          postsLoading: state.posts.postsLoading,
          isLoggedIn: state.auth.isLoggedIn,
          user: state.auth.user,
          userId: state.auth.userId,
        }),
        shallowEqual
      );
     
      const dispatch = useDispatch();
      
      const currentPost = posts.find((post) => post.postId === id && post); 
      
    

      // const postDelete = () => {
      //   dispatch (postDel(post.postId));
      //   toast.success("Post deleted successfully");
      //  };
 

      useEffect(()=>{
          if(postsLoading){
              dispatch(getPosts);
          }
      }, [dispatch]); 

  return (
     <div className="container-fluid">
    {postsLoading ? (
      <h1 className="text-center">Post Loading...</h1>
    ) : currentPost ? (
      <div className="row">
        <div className="col-md-12" style={{ height: "600px" }}>
          <img
            className="h-100 w-100"
            style={{ objectFit: "cover", objectPosition: "top" }}
            src={currentPost.post.image}
            alt={currentPost.post.title}
          />
        </div>
        <div className="col-md-12 p-5 mb-3">
          <div className="d-flex align-items-center justify-content-between">
         
            <h1 className="display-3 text-capitalize">
              {currentPost.post.title}
            </h1>
           
            <div className="d-flex col-md-4 align-items-center justify-content-end">
            
              {currentPost.post.category.split(",").map((category, id) => (
                <p key={id} className="bg-primary mx-2 px-2 py-1 text-white">
                  {category.trim()}
                </p>
              ))}
            </div>
          </div>
          <div className="d-flex">
          <p className='blog-date'>Published {currentPost.post.createdAt}</p> 
            <p className="card-text py-5 w-50 text-justify">
              {currentPost.post.description}
            </p>
            </div>
           
            <button
                  type="button"
                  className="btn btn-danger w-40"
                  onClick={() => history("/dashboard")}
                >
                  Go Back
         </button>
         {/* <button
            type="button"
            onClick={postDelete}
            className="btn btn-danger my-2ss"
          >
            <i className="fa fa-trash-o"></i> Delete Post
          </button> */}
          </div>
        </div>
        
      ) : (
        <h1 className="text-center">
          Post with id <span className="text-primary">{id}</span> does not
          exists
        </h1>
      )}{" "}

        
    </div>
 
  );
};

export default SeePost