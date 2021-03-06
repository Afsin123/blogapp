import { SET_POSTS, SET_POSTS_LOADING,
    RESET_POSTS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,FILTER_POSTS } from "../actions/postActions";

    const initialState = {
        postsLoading: true,
        posts : [],
    }

    export default function postReducer(state = initialState, action) {
        switch (action.type) {
          case SET_POSTS:
            state = { ...state, posts: action.payload };
            return state;
          case SET_POSTS_LOADING:
            state = { ...state, postsLoading: action.payload };
            return state;
          case ADD_POST:
            state = { ...state, posts: [...state.posts, action.payload] };
            return state;
          case DELETE_POST:
            const filterPosts = state.posts.filter(
              (post) => post.postId !== action.payload
            );
            state = { ...state, posts: filterPosts };
            return state;
          case RESET_POSTS:
            state = initialState;
            return state;
        
          case UPDATE_POST:
            const current = state.posts.find(
              (pst) => pst.postId === action.payload.postId
            );
            current.post.title = action.payload.data.title;
            current.post.category = action.payload.data.category;
            current.post.description = action.payload.data.description;
            state = {
              ...state,
              posts: state.posts.map((pst) =>
                pst.postId === action.payload.postId ? current : pst
              ),
            };
            return state;
          default:
            return state;
        }
      }