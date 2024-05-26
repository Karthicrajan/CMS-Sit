import React, { useEffect, useState } from "react";
import './AdminListPost.css';
import { Link } from "react-router-dom";
import { HidePostFunction, deletePostFunction } from "../../redux/postSlice";
export default function AdminListPost(items){
    const backEndUrl = 'http://localhost:5000/images/';
    const [blogStatus,setblogStatus] = useState(items.post.isDelete);
    console.log(items);
    useEffect(() =>{
        
    })
    const makeHidePost = () =>{
        HidePostFunction(!blogStatus,items.post._id);
        setblogStatus(!blogStatus);
        console.log(blogStatus);
    }
    const deletePostHandle = () =>{
        deletePostFunction(items.post._id);
    }
    return (
        <div className="AdminPostCard">
            <div className="AdminCardBody">
            <div className="AdminCardImg">
            <img className="AdminCardImage" src={backEndUrl+items.post.postBannerImage}></img>
            </div>
            <div className="AdminCardDetails">
            <h2>{items.post.postTitle}</h2>
            <div className="adminListBtnContiner">
               {!items.post.isCode && <Link to={`/admin/postedit/${items.post._id}`}><button className="adminListActinBtn">Edit</button></Link>}
              {items.post.isCode && <Link to={`/admin/importcodeedit/${items.post._id}`}><button className="adminListActinBtn">Edit code</button></Link>}
                {blogStatus && <button onClick={makeHidePost} className="adminListActinBtn">Make Visible</button>}
                {!blogStatus && <button onClick={makeHidePost} className="adminListActinBtn">Make hide</button>}
                <button onClick={deletePostHandle} className="adminListActinBtn">Delete</button>
            </div>
            </div>
            </div>
        </div>
    )
}