import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/header/Header";
//import SearchBar from '../../components/searchbar/SearchBar';
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../dashboard/Posts";
import SeePost from "../../dashboard/SeePost";
import fire from "../../firebase/config";

import { getPosts } from "../../redux/actionCreators/postsActionCreators";

const Homepage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  const { posts, postsLoading, isLoggedIn, userId } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      postsLoading: state.posts.postsLoading,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const latestPosts = posts;
  latestPosts
    .sort((a, b) => {
      const postA = new Date(a.post.createdAt);
      const postB = new Date(b.post.createdAt);

      if (postA < postB) return 1;
      if (postA > postB) return -1;
      return 0;
    })
    .slice(0, 5);

  const [blogs, setBlogs] = useState("posts");

  useEffect(() => {
    if (postsLoading) {
      dispatch(getPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!isLoggedIn) dispatch({ type: "SET_USER", payload: user });

        history("/");
      } else {
        history("/");
      }
    });
  }, [dispatch]);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = posts;
    const filteredPosts = allBlogs.filter((post) =>
      post.category.toLowerCase().includes(searchKey.toLowerCase())
    );
    setBlogs(filteredPosts);
  };
  // useEffect(() => {
  //   if(searchKey) {
  //     dispatch(filteredPosts);
  //   }
  // }, [ dispatch])

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(posts);
    setSearchKey("");
  };

  return (
    <div>
      <Header />

      <div className="searchBar-wrap">
        {/* <form onSubmit={handleSearchBar}>
      <input
        type='text'
        placeholder='Search By Category'
        value= {searchKey}
        onChange={(e)=> setSearchKey(e.target.value)}
      />
      {searchKey && <span onClick={handleClearSearch}>X</span>}
      <button>Go</button>
    </form> */}
      </div>
      {/* <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      /> */}

      <div className="container">
        <div className="home">
          <div className="row">
            <div className="col-md-8 py-5">
              <div className="latestPostsHeading border-bottom border-primary d-flex">
                <p className="bg-dark text-white col-md-3 d-flex align-items-center justify-content-center py-2 h5">
                  Latest Posts
                </p>
              </div>
              <div className="row">
                <div className="col-md-12 my-5">
                  {postsLoading
                    ? "Loading posts"
                    : latestPosts.map((post, id) => (
                        <div className="w-100 card mb-3" key={id}>
                          <img
                            src={post.post.image}
                            alt={post.post.title}
                            className="card-img-top border-bottom"
                          />
                          <div className="card-body px-5">
                            <h2 className="card-title text-capitalize">
                              {post.post.title}
                            </h2>
                            <p className="card-text text-heading text-*-justify">
                              {post.post.description
                                .substring(0, 1)
                                .toUpperCase() +
                                post.post.description.substring(1, 100)}
                              ...
                            </p>
                            <div className="d-flex">
                              {post.post.category.split(",").map((ctg, i) => (
                                <p
                                  className="small bg-dark mr-2 py-1 px-2 text-white"
                                  key={i}
                                >
                                  {ctg.trim()}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="card-footer d-flex align-items-center justify-content-between bg-white pb-3 px-5 border-0">
                            {isLoggedIn && post.post.author === userId ? (
                              <>
                                {/* <Link
                              to={`/post/${post.postId}/${post.post.title}`}
                              className="btn btn-primary"
                            >
                              <i className="fa fa-eye"></i> See Post
                            </Link> */}
                                <button
                                  className="btn btn-primary  my-2 btn-block"
                                  onClick={() =>
                                    history(`/post/${post.postId}`)
                                  }
                                >
                                  <i className="fa fa-eye"></i> See Post
                                </button>
                                <div className="btns">
                                  <Link
                                    to={`/homepage/post/${post.postId}/edit`}
                                    className="btn btn-outline-primary mr-2"
                                  >
                                    <i className="fa fa-pencil"></i> Manage Post
                                  </Link>
                                </div>
                              </>
                            ) : (
                              <Link
                                to={`/post/${post.postId}`}
                                className="btn btn-block btn-primary"
                              >
                                <i className="fa fa-eye"></i> See Post
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                  <Link to="/posts" className="btn btn-dark btn-block">
                    All Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
