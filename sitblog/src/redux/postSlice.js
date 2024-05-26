import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    postData: 'THis is postdata',
}
export const postSlice = createSlice({
    name:'createPost',
    initialState,
    reducers:{
        insertPost:(state,action) =>{
            state.postData = action.payload
            console.log(state.postData);
        }
    }
})
export const  insertPostFunction = async (datas) =>{
    console.log(datas);
    try{
        const res = await axios.post("http://localhost:5000/api/blogpost/create",{
            postData:datas.postData,
            authorDetails:datas.author,
            authorProfile:datas.authorProfileImg,
            postTitle:datas.postTitle,
            postBannerImage:datas.postBannerImg,
            blogCodeData:datas.blogCodeData,
            isCode:datas.isCode
        });
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const  insertPostByCodeFunction = async (datas) =>{
    console.log(datas);
    try{
        const res = await axios.post("http://localhost:5000/api/blogpost/create",{
            authorDetails:datas.author,
            authorProfile:datas.authorProfileImg,
            postTitle:datas.postTitle,
            postBannerImage:datas.postBannerImg,
            blogCodeData:datas.blogCodeData,
            isCode:datas.isCode
        });
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const  UpdatePostFunction = async (datas,postId) =>{
    console.log(datas);
    try{
        const res = await axios.put(`http://localhost:5000/api/blogpost/update/${postId}`,{
            postData:datas.postData,
            authorDetails:datas.author,
            authorProfile:datas.authorProfileImg,
            postTitle:datas.postTitle,
            postBannerImage:datas.postBannerImg,
            blogCodeData:datas.blogCodeData
        });
        if(res){
            alert("Updated")
        }
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const  HidePostFunction = async (datas,postId) =>{
    console.log(datas);
    try{
        const res = await axios.put(`http://localhost:5000/api/blogpost/update/${postId}`,{
            isDelete:datas,
        });
        if(res){
        }
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const  deletePostFunction = async (postId) =>{
    try{
        const res = await axios.delete(`http://localhost:5000/api/blogpost/deletepost/${postId}`,{
        });
        if(res){
            window.location.reload();
        }
        console.log(res);
    }catch(err){
        console.log(err);
    }
}
export const {insertPost} = postSlice.actions
export default postSlice.reducer