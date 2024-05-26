import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch} from "react-redux";
const initialState = {
    postDatas : [],
    postActiveData:[],
    singlePostData:[]
}
export const getBlogPost = createAsyncThunk('get/blogPosts',async()=>{
    return axios.get("http://localhost:5000/api/blogPosts/getAllBlogs").then(res => {
        return res.data;
    });
})
export const getActivePost = createAsyncThunk('get/blogActivePosts',async()=>{
    return axios.get("http://localhost:5000/api/blogPosts/getActiveBlogs").then(res => {
        return res.data;
        
    });
})
export const getSinglePost = createAsyncThunk('get/SinglePosts',async(id)=>{
    return axios.get(`http://localhost:5000/api/blogPosts/getSingle/${id}`).then(res => {
        return res.data;
        
    });
})

export const fetchPostData = createSlice({
name:'fetchblogposts',
initialState,
reducers:{
    fetchDatas:(state,action) =>{
        state.postDatas = action.payload;
    },
},
extraReducers: (builder) => {
    builder
      .addCase(getBlogPost.fulfilled, (state, action) => {
        state.postDatas = action.payload;
      });
      builder
      .addCase(getActivePost.fulfilled, (state, action) => {
        state.postActiveData = action.payload;
      });
      builder
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.singlePostData = action.payload;
      });
  },
});

// export const fetchBlogPostFn = async() =>{
//     // const dispatch = useDispatch();
//         try{
//             const res = await axios.get("http://localhost:5000/api/blogPosts/getAllBlogs");
//             // console.log(res.data);
//             // dispatch(fetchDatas(res));
//             // dispatch(fetchPostData.actions.fetchDatas(res.data)); 
//         }catch(err){
//             console.log(err);
//         }
  
// }
export const {fetchPostDatas} = fetchPostData.actions
export default fetchPostData.reducer