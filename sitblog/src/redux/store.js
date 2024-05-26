import { configureStore } from '@reduxjs/toolkit'
import createPostReducer from './postSlice';
import fetchblogpostReducer from './fetchPostSlice';
import authReducer from './authSlice';
import thunk from 'redux-thunk';
export default configureStore({
    reducer:{
        createBlogPost: createPostReducer,
        fetchblogpost: fetchblogpostReducer,
        auth:authReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});