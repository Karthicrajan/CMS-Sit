import React, { useEffect, useRef, useState } from "react";
import _isEqual from 'lodash/isEqual';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminMenu from "../AdminMenu/AdminMenu";
import './ImportcodeEdit.css'
import {useDispatch, useSelector} from 'react-redux';
import { UpdatePostFunction, insertPost, insertPostFunction } from '../../redux/postSlice';
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { getSinglePost } from "../../redux/fetchPostSlice";
export default function BlogEdit(){
    const backEndUrl = 'http://localhost:5000/images/';
    const backend = `${backEndUrl}`
    // console.log('ffghhfhg');
    const editorRef = useRef(null);
    const [state, setState] = useState(null);
    const [profileDec,setProfileDec] = useState('');
    const [profileImg,setProfileImg] = useState('');
    const [bannerImage,setBannerImage] = useState('');
    const [postTitle,setPostTitle] = useState('');
    const [postCodeData,setPostCodeData] = useState('');
    const dispatch = useDispatch();
    const {postId} = useParams();
    const [singleData, setSingleData] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const { singlePostData: fetchedSinglePostDatas } = useSelector(
        (state) => state.fetchblogpost
      );
      
      useEffect(() => {
        dispatch(getSinglePost(postId))
          .then(() => {
            console.log(fetchedSinglePostDatas);
            setIsDataFetched(true);
          });
      }, [postId, dispatch]);

      useEffect(() => {
        if (isDataFetched && fetchedSinglePostDatas !== '') {

          if (!_isEqual(singleData)) {
            setPostTitle(fetchedSinglePostDatas.postTitle);
            setBannerImage(fetchedSinglePostDatas.postBannerImage);
            setProfileImg(fetchedSinglePostDatas.authorProfile);
            setProfileDec(fetchedSinglePostDatas.authorDetails);
            setPostCodeData(fetchedSinglePostDatas.blogCodeData);
            console.log(fetchedSinglePostDatas);
            // console.log(backend+fetchedSinglePostDatas.pr)
            // setSingleData(parsedData);
          }
        }
      }, [isDataFetched, fetchedSinglePostDatas]);
      console.log(singleData);
    //   singleData.map((item)=>{
    //     console.log(item)
    //   })
      const onSave = () => {
        try{
          let fndata = {postTitle:postTitle,author:profileDec,authorProfileImg:profileImg,postBannerImg:bannerImage,blogCodeData:postCodeData}
          UpdatePostFunction(fndata,postId);
        }catch(err){
          console.log(err);
        }
      
      };
      const [selectedImage, setSelectedImage] = useState(null);
      const [selectedBannerImg, setSelectedBannerImg] = useState(null);
      const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          setSelectedImage(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
          const formData = new FormData();
          const filename = Date.now() + file.name;
          formData.append('file', file);
          formData.append('name',filename)
          try{
           const res = await axios.post("http://localhost:5000/api/blogAuthorimage/profileImage",formData);
           setProfileImg(res.data.storedFilename);
          }catch(err){
            console.log(err);
          }
        }
      };
      const BannerInputRef = useRef(null);
      const fileInputRef = useRef(null);
      const handleIconClick = () => {
        fileInputRef.current.click();
      };
      const handleBannerClick = () => {
        BannerInputRef.current.click();
      };
    
      const handleBannerSelect = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedBannerImg(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
          const formData = new FormData();
          const filename = Date.now() + file.name;
          formData.append('file', file);
          formData.append('name',filename)
          try{
           const res = await axios.post("http://localhost:5000/api/blogAuthorimage/profileImage",formData);
           setBannerImage(res.data.storedFilename);
           console.log(res);
          }catch(err){
            console.log(err);
          }
        }
        reader.readAsDataURL(file);
      };
    return(
        <div>
            <div className='writeAreaHeader'>
                        <button className='PublishBtn' onClick={onSave}>Update</button>
                    </div>
            <div className="writeContainer">
                <div className="postWriteArea">
                  <div className='writePostTitleCon'>
                  <input type='text' placeholder='Title' className='inputTitle' value={postTitle} onChange={(event)=>{setPostTitle(event.target.value);}}></input>
                  </div>
                  <div className='bannerPreview'>
                  {bannerImage && <img src={backend+bannerImage} className='uploadbannerImg' alt="Selected" />}
                  </div>
                  <div className='Uploadbanner' onClick={handleBannerClick}>
                    <div className='bannerSelect'>
                      <span>Select Banner Image</span>
                          <input
                          type="file"
                          onChange={handleBannerSelect}
                          accept="image/*"
                          ref={BannerInputRef}
                          style={{ display: 'none' }}
                          />
                      </div>
                      </div>
                      <div className="writeBox">
                      <div className='codeTextBox'>
                      <textarea className='codeEditor' value={postCodeData} onChange={(event)=>{setPostCodeData(event.target.value);}}></textarea>
                      </div>
                      </div>
                     
                </div>
                <div className="postDetailsArea">
                    <div className='postDetails'>
                            <div className='postDetailsInnerCard'>
                                <div className='UploadProfile' onClick={handleIconClick}>
                                    <input
                                    type="file"
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    />
                                    {/* <button className='uploadBtn' onClick={handleIconClick}>+</button> */}
                                    {profileImg && <img src={backend+profileImg} className='postProfileImg' alt="Selected" />}
                                </div>
                                <div className='dec'>
                                <textarea className='profileDec' placeholder='Eneter profile dec..' value={profileDec} onChange={(event)=>{setProfileDec(event.target.value);}}></textarea>
                                </div>
    
                            </div>
                           
                    </div>
                </div>
            </div>
            
        </div>
    )
}