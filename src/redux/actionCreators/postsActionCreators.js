import { toast } from "react-toastify";
import fire from "../../firebase/config";


const setPostsLoading = (message) => ({
    type: "SET_POSTS_LOADING",
    payload: message,
  });
  const setPosts = (data) => ({
    type: "SET_POSTS",
    payload: data,
  });
  
  export const getPosts = () => async (dispatch) => {
    dispatch(setPostsLoading(true));
  
    const posts = await fire.firestore().collection("posts").get();
  
    const allPosts = [];
  
    posts.forEach((post) => {
      if (post.id !== "27g9Q1JzQmEZbQ8AxaBg") {
        allPosts.push({ post: post.data(), postId: post.id });
      }
    });
  
    dispatch (setPostsLoading(false));
    dispatch (setPosts(allPosts));
  };

  // export const filterPosts = (posts,category) => async (dispatch) => {
  //   dispatch(setPostsLoading(true));
  
  //   const posts = await fire.firestore().collection("posts").get();
  
  //   const allPosts = [];
  
  //   posts.forEach((post) => {
  //     if (post.id !== "27g9Q1JzQmEZbQ8AxaBg") {
  //       allPosts.push({ post: post.data(), postId: post.id });
  //     }
  //   });
  
  //   dispatch (setPostsLoading(false));
  //   dispatch (setPosts(allPosts));
  // };
  
  const addPost = (post) => ({
    type: "ADD_POST",
    payload: post,
  });
  
  export const newPost =
    (data, author, nameAuthor, setProgress) => (dispatch) => {
      fire
        .firestore()
        .collection("posts")
        .add({
          title: data.title,
          category: data.category,
          description: data.description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          image: null,
          author,
          postedBy: nameAuthor,
        })
        .then((doc) => {
          const fileUpload = fire
            .storage()
            .ref(`posts/${doc.id}`)
            .put(data.image);
  
          fileUpload.on(
            "state_changed",
            (snapshot) => {
              const progress =
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              return toast.error(error.message);
            },
            () => {
              fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                fire
                  .firestore()
                  .collection("posts")
                  .doc(doc.id)
                  .update({
                    image: downloadURL,
                  })
                  .then(async (post) => {
                    const docum = await doc.get();
                    const docData = docum.data();
                    docData.image = downloadURL;
                    dispatch(addPost({ data: docData, postId: doc.id }));
                  });
              });
            }
          );
        });
    };
  
  const deletePost = (postId) => ({
    type: "DELETE_POST",
    payload: postId,
  });
  
  export const postDel = (postId) => (dispatch) => {
    fire
      .storage()
      .ref(`posts/${postId}`)
      .delete()
      .then(() => {
        fire
          .firestore()
          .collection("posts")
          .doc(postId)
          .delete()
          .then(() => {
            dispatch(deletePost(postId));
          });
      });
  };

  // const filteredPosts = (data) => ({
  //     type: "FILTERED_POST",
  //     payload: data,
  // });
  // export const filteredPost = (data, category ) = (dispatch) => {
  //   dispatch(setPostsLoading(true));
  
  //   const posts = await fire.firestore().collection("posts").get();
     
  //   const allBlogs = [];
  //   allBlogs.filter((post) =>{const filteredPost = post.category.toLowerCase().includes(searchKey.toLowerCase()) }
  //   );
  //   dispatch (setBlogs(filteredPosts));
  // }
  
 
  const updatePost = (data) => ({
    type: "UPDATE_POST",
    payload: data,
  });

  export const postUpdate = (postId, data) => (dispatch) => {
    fire
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        title: data.title,
        category: data.category,
        description: data.description,
        image:data.image,
      })
      // .then((doc) => {
      //   const fileUpload = fire
      //     .storage()
      //     .ref(`posts/${doc.id}`)
      //     .put(data.image);

      //   fileUpload.on(
      //     "state_changed",
      //     (snapshot) => {
      //       const progress =
      //         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //       setProgress(progress);
      //     },
      //     (error) => {
      //       return toast.error(error.message);
      //     },
      //     () => {
      //       fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //         fire
      //           .firestore()
      //           .collection("posts")
      //           .doc(doc.id)
      //           .update({
      //             image: downloadURL,
      //           })
      
      .then(() => {
        dispatch(updatePost({ postId,data }));
      });
      // .then((doc) => {
      //   const fileUpload = fire
      //     .storage()
      //     .ref(`posts/${doc.id}`)
      //     .put(data.image);

      //   fileUpload.on(
      //     "state_changed",
      //     // (snapshot) => {
      //     //   const progress =
      //     //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     //   setProgress(progress);
      //     // },
      //     // (error) => {
      //     //   return toast.error(error.message);
      //     // },
      //     () => {
      //       fileUpload.snapshot.ref.getDownloadURL().then((downloadURL) => {
      //         fire
      //           .firestore()
      //           .collection("posts")
      //           .doc(doc.id)
      //           .update({
      //             image: downloadURL,
      //           })
      //           .then(async (post) => {
      //             const docum = await doc.get();
      //             const docData = docum.data();
      //             docData.image = downloadURL;
      //             dispatch(updatePost({ postId, data }));
      //           });
      //       });
      //     }
      //  );
      // });
  };