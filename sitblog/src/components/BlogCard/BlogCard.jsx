import React from "react";
import './BlogCard.css';
import { Link } from "react-router-dom";
export default function BlogCard(props){
    console.log(props.postsData.isCode);
    const MAX_WORDS = 100; // Maximum number of words to display
    const backEndUrl = 'http://localhost:5000/images/';
function truncateText(text, maxWords) {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}

// Inside your component

    return (
        <div className="blogCard">
            <div>
            <img className="cardImage" src={`${backEndUrl}${props.postsData.postBannerImage}`}></img>
            </div>
           <div className="cardBody">
                {/* <h1>{props.postsData.postTitle}</h1> */}
                <h1>{truncateText(props.postsData.postTitle, MAX_WORDS)}</h1>
                {!props.postsData.isCode && <span><Link to={`/blogDetails/${props.postsData._id}`} className="ReadMoreLink">ReadMore</Link></span>}
                {props.postsData.isCode && <span><Link to={`/blogDetailsCode/${props.postsData._id}`} className="ReadMoreLink">ReadMore</Link></span>}
           </div>
            
        </div>
    )
}