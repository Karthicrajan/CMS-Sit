import React, { useEffect } from "react";
import './BlogHome.css';
import BlogCard from "../BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getActivePost } from "../../redux/fetchPostSlice";
export default function BlogHome(){
    const dispatch = useDispatch();
    const { postActiveData: fetchedActivePostData } = useSelector(
      (state) => state.fetchblogpost
    );
  
    useEffect(() => {
      dispatch(getActivePost());
      console.log(fetchedActivePostData);
    }, []);
    console.log(fetchedActivePostData);
    return(
        <div className="blogBody">
            <div className="headerCard"></div>
            <div className="BlogInnerBodyHeader">
                <h1>Our Blogs</h1>
            </div>
            <div className="blogInnerContiner">
                {fetchedActivePostData.length > 0 && fetchedActivePostData.map((item,index) =>(
                    <BlogCard key={index} postsData={item}/>
                ))}
                
                {/* <BlogCard/>
                <BlogCard/>
                <BlogCard/> */}
            </div>
        </div>
    );
}