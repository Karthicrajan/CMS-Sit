import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { insertPost, insertPostByCodeFunction, insertPostFunction } from '../../redux/postSlice';
import axios from 'axios';
export default function Importcode(){
    const backEndUrl = 'http://localhost:5000/images/';
    const editorRef = useRef(null);
    const [state, setState] = useState(null);
    const [profileDec,setProfileDec] = useState('');
    const [profileImg,setProfileImg] = useState('');
    const [bannerImage,setBannerImage] = useState('');
    const [postTitle,setPostTitle] = useState('');
    const [blogCode,setBlogCode] = useState('');
    const postData = useSelector((state) => state.createBlogPost.postData);
    const dispatch = useDispatch();
    
    
const onSave = () =>{
  try{
    
    let fndata = {postTitle:postTitle,author:profileDec,authorProfileImg:profileImg,postBannerImg:bannerImage,blogCodeData:blogCode,isCode:true}
    insertPostByCodeFunction(fndata);
  }catch(err){
console.log(err);
  }
}
    
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
                        <button className='PublishBtn' onClick={onSave}>Publish</button>
                    </div>
            <div className="writeContainer">
                <div className="postWriteArea">
                  <div className='writePostTitleCon'>
                  <input type='text' placeholder='Title' className='inputTitle' onChange={(event)=>{setPostTitle(event.target.value);}}></input>
                  </div>
                  <div className='bannerPreview'>
                  {selectedBannerImg && <img src={selectedBannerImg} className='uploadbannerImg' alt="Selected" />}
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
                      <div className='writeBox'>
                        <div className='codeTextBox'>
                        <textarea className='codeEditor' value={blogCode} onChange={(event)=>{setBlogCode(event.target.value);}}></textarea>
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
                                    {selectedImage && <img src={selectedImage} className='postProfileImg' alt="Selected" />}
                                </div>
                                <div className='dec'>
                                <textarea className='profileDec' placeholder='Eneter profile dec..' value={profileDec} onChange={(event)=>{setProfileDec(event.target.value);}}></textarea>
                                </div>
    
                            </div>
                            {/* <div className='postTagCard'>
                            <h2>Tags</h2>
                            <input type='text' className='inputTag' placeholder='Enter tags'></input>
                            </div> */}
                    </div>
                </div>
            </div>
            
        </div>
    )
}