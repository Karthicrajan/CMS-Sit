import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import AdminListPost from "../AdminListPost/AdminListPost";
import { Link } from "react-router-dom";
import { fetchBlogPostFn } from "../../redux/fetchPostSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPost } from "../../redux/fetchPostSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [postDatas, setPostDatas] = useState([]);
  const { postDatas: fetchedPostDatas } = useSelector(
    (state) => state.fetchblogpost
  );

  useEffect(() => {
    dispatch(getBlogPost());
  }, []);
 const handleLogout = () =>{
  window.location.reload();
  localStorage.clear();
 }

//   useEffect(() => {   
//     if (fetchedPostDatas.length > 0) {
//       console.log(fetchedPostDatas);
//       setPostDatas(fetchedPostDatas);
//     }
//   }, [fetchedPostDatas]);

  return (
    <div className="dashboardContainer">
      <div className="dashHeader">
        <Link to="/admin/write" className="link">
          <button className="writePostBtn">Write Post</button>
        </Link>
        <Link to="/admin/importcode" className="link">
          <button className="writePostBtn">Import Code</button>
        </Link>
        <button className="writePostBtn" onClick={handleLogout}>logOut</button>
      </div>
      <div className="DashBoardBody">
        <h2>All Posts</h2>
        {fetchedPostDatas.length > 0 &&
          fetchedPostDatas.map((item) => (
            <AdminListPost key={item._id} post={item} />
          ))}
      </div>
    </div>
  );
}
