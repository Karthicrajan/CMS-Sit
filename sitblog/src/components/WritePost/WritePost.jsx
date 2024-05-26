import React, { useEffect, useRef, useState } from 'react';
import './WritePost.css';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminMenu from "../AdminMenu/AdminMenu";
import {useDispatch, useSelector} from 'react-redux';
import { insertPost, insertPostFunction } from '../../redux/postSlice';
import axios from 'axios';
export default function WritePost(){
  const backEndUrl = 'http://localhost:5000/images/';

    const editorRef = useRef(null);
    const [state, setState] = useState(null);
    const [profileDec,setProfileDec] = useState('');
    const [profileImg,setProfileImg] = useState('');
    const [bannerImage,setBannerImage] = useState('');
    const [postTitle,setPostTitle] = useState('');
    const postData = useSelector((state) => state.createBlogPost.postData);
    const dispatch = useDispatch();
    
    // const handleProfileDec = () =>{
    //   setProfileDec()
    // }
    useEffect(() => {
        const editorInstance = new EditorJS({
          holder: 'editorjs',
          tools: {
            header: {
                class: Header,
                inlineToolbar: true,
              },
              list: {
                class: List,
                inlineToolbar: true,
              },
              paragraph: {
                class: Paragraph,
                inlineToolbar: true,
              
              },
           
            // image: {
            //   class: ImageTool,
            //   config: {
            //     endpoints: {
            //       byFile: 'http://localhost:5000/api/blogimage/imageupload',
            //       byUrl: 'your-image-by-url-endpoint',
            //     },
            //   },
            // },
            image: {
              class: ImageTool,
              config: {
                uploader: {
                  uploadByFile(file) {
                    return new Promise((resolve, reject) => {
                      const formData = new FormData();
                      formData.append('file', file);
                      fetch('http://localhost:5000/api/blogimage/imageupload', {
                        method: 'POST',
                        body: formData,
                      })
                        .then(response => response.json())
                        .then(data => {
                          if (data.success) {
                            console.log(data);
                            const imgURL = `${backEndUrl}${data.imageUrl}`;
                            resolve({ success: 1, file: { url: imgURL } });
                          } else {
                            console.log(data);
                            reject(new Error('Failed to upload image'));
                          }
                        })
                        .catch(error => {
                          reject(error);
                        });
                    });
                  },
                },
              },
            },
            code: {
              class: CodeTool,
              config: {
                languages: [
                  { name: 'JavaScript', value: 'javascript' },
                  { name: 'HTML', value: 'html' },
                  { name: 'CSS', value: 'css' },
                ],
              },
            },
          },
          
          data: {
            blocks: [

            ],
          },
          onChange: () => {
            // Handle changes in the editor here
          },
        });
    
        editorRef.current = editorInstance;
        return () => {
            if (editorInstance) {
                // editorInstance.destroy();
            }
          };
      }, []);

      const onSave = () => {
        if (editorRef.current) {
          editorRef.current.save().then((outputData) => {
              console.log('output data', outputData.blocks);
              const postDataJson = JSON.stringify(outputData.blocks);
              console.log(postDataJson);
              let fndata = {postData:postDataJson,postTitle:postTitle,author:profileDec,authorProfileImg:profileImg,postBannerImg:bannerImage}
              insertPostFunction(fndata);
              // dispatch(insertPost(postDataJson));
            })
            .catch((error) => {
              console.log(error);
            });
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
                      <div id="editorjs"></div>
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