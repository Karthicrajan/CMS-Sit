import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
// import './BlogDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../redux/fetchPostSlice";
export default function BlogDetalisCode(){
    const backEndUrl = 'http://localhost:5000/images/';
   const dispatch = useDispatch();
    const {postId} = useParams();
    const [singleData, setSingleData] = useState([]);
    const { singlePostData: fetchedSinglePostDatas } = useSelector(
        (state) => state.fetchblogpost
      );
    useEffect(()=>{
        dispatch(getSinglePost(postId))
    },[postId,dispatch])

    useEffect(() => {
        if (fetchedSinglePostDatas != '') {
            // console.log(fetchedSinglePostDatas.postData !== '');
            console.log(fetchedSinglePostDatas)
            // setSingleData(JSON.parse(fetchedSinglePostDatas.postData))
        //   console.log(singleData);
        }
      }, [fetchedSinglePostDatas]);
    //   console.log(singleData);
    //   singleData.map((item)=>{
    //     console.log(item)
    //   })

        
    return(
        <div className="blogDetailsContainers">
            <div className="blogDetailsBanner">
            <img className="blogDetailsBannerImg" src={`${backEndUrl}${fetchedSinglePostDatas.postBannerImage}`}></img>
            </div>
            <div className="blogDetailsInnerContiner">
                <div className="blogContent">
                    <div className="BlogData">
                        <h1>{fetchedSinglePostDatas.postTitle}</h1>
                        <div dangerouslySetInnerHTML={{ __html: fetchedSinglePostDatas.blogCodeData }}></div>
                       
                    </div>
                  
                </div>
                <div className="blogAuthor">
                    <div className="blogProfileDetails">
                        <h2>Author</h2>
                    <img className="profile" src={`${backEndUrl}${fetchedSinglePostDatas.authorProfile}`}></img>
                    <div className="pfDec">
                    <span>{fetchedSinglePostDatas.authorDetails}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}