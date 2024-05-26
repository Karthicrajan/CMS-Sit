import React, { useEffect, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useLocation, useParams } from 'react-router-dom';
import './BlogDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../redux/fetchPostSlice";
export default function BlogDetalis(){
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
            if(fetchedSinglePostDatas.isCode == false){
                setSingleData(JSON.parse(fetchedSinglePostDatas.postData))
            }
         
        //   console.log(singleData);
        }
      }, [fetchedSinglePostDatas]);
      console.log(singleData);
      singleData.map((item)=>{
        console.log(item)
      })

        const[blogData,SetBlogData] = useState([{id:'888888',type:'header',data:{text:"Understanding Server Components in React 18 and Next.js 13"}},
        {id:'888887',type:'paragraph',data:{text:"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}},
        {id:'888888',type:'header',data:{text:"Understanding Server Components in React 18 and Next.js 13"}},
        {id:'888888',type:'code',data:{code:`<div className="blogDetailsInnerContiner">
        <div className="blogContent">
            <div className="BlogData">
                {blogData.map((e,i) =>{
                    console.log(i);
                    return (
                        <div>
                        {(i === 0 && e.type == 'header') ? <h1>{e.data.text}</h1> : null}
                        {(i != 0 && e.type == 'header') ? <h2>{e.data.text}</h2> : null}
                        {/* {i != 0 && e.type == 'header' && <h2>{e.data.text}</h2>} */}
                       {e.type == 'paragraph' && <p>{e.data.text}</p> }
                        </div>
                    );
                })}
               
            </div>
          
        </div>`}}]);
    return(
        <div className="blogDetailsContainers">
            <div className="blogDetailsBanner">
            <img className="blogDetailsBannerImg" src={`${backEndUrl}${fetchedSinglePostDatas.postBannerImage}`}></img>
            </div>
            <div className="blogDetailsInnerContiner">
                <div className="blogContent">
                    <div className="BlogData">
                        <h1>{fetchedSinglePostDatas.postTitle}</h1>
                        {singleData.map((e,i) =>{
                            console.log(i);
                            return (
                                <div key={i}>
                                {(i === 0 && e.type == 'header') ? <h1 className="BlogMainHeading">{e.data.text}</h1> : null}
                                {(i !== 0 && e.type == 'header') ? <h2 className="BlogSubHeading">{e.data.text}</h2> : null}
                                {e.type == 'image' && <img src={e.data.file.url} className="blogInnerImage"></img>}
                                {(e.type == 'list' && e.data.style == 'ordered') ? <ol>{e.data.items.map((liData,index)=> {<li key={index}>{liData}</li>})}</ol> : null}
                                {/* {i != 0 && e.type == 'header' && <h2>{  e.data.text}</h2>} */}
                                {e.type === 'list' && e.data.style === 'ordered' ? (
                                    <ol>
                                        {e.data.items.map((liData, index) => (
                                        <li key={index}dangerouslySetInnerHTML={{ __html: liData }}></li>
                                        ))}
                                    </ol>
                                    ) : e.type === 'list' && e.data.style === 'unordered' ? (
                                    <ul>
                                        {e.data.items.map((liData, index) => (
                                        <li key={index} dangerouslySetInnerHTML={{ __html: liData }}></li>
                                        ))}
                                    </ul>
                                    ) : null}
                               {e.type == 'paragraph' && <p dangerouslySetInnerHTML={{ __html: e.data.text }}></p>}
                               
                       {e.type == 'code' && <SyntaxHighlighter language="" style={darcula}>
                        {e.data.code}
                        </SyntaxHighlighter>}
                                </div>
                            );
                        })}
                       
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