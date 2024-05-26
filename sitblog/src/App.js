
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import BlogHome from "./components/BlogHome/BlogHome";
import BlogDetalis from "./components/BlogDetails/BlogDetails";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import { useEffect, useState } from "react";
import AdminMenu from "./components/AdminMenu/AdminMenu";
import WritePost from "./components/WritePost/WritePost";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogEdit from "./components/BlogEdit/BlogEdit";
import { useSelector } from "react-redux";
// import ImportCode from "./components/ImportCode/IMportCode";
import Importcode from "./components/Importcode/Importcode";
import BlogDetailsCode from "./components/BlogDetailsCode/BlogDetailsCode";
import ImportcodeEdit from "./components/ImportcodeEdit/ImportcodeEdit";
import Footer from "./components/Footer/Footer";

function App() {
  const [isAdminPath, setIsAdminPath] = useState();
  const token = localStorage.getItem('token');
  useEffect(() => {
    setIsAdminPath(window.location.pathname.includes('/admin'));
  }, []);
 
  return (
    <div className="App">
     <BrowserRouter>
     {!isAdminPath && <NavBar />} 
     {/* {isAdminPath && <AdminMenu />} */}
     <Routes>
      {/* <Route path="/" element={<NavBar/>}/> */}
      <Route path="blog" element={<BlogHome/>}/>
      <Route path="blogDetails/:postId" element={<BlogDetalis/>}/>
      <Route path="blogDetailsCode/:postId" element={<BlogDetailsCode/>}/>
      <Route path="admin/adminLogin" element={!token ? <AdminLogin/> : <Dashboard/>}/>
      <Route path="admin/write" element={token ? <WritePost/> : <AdminLogin/>}/>
      <Route path="admin/importcode" element={token ? <Importcode/> : <AdminLogin/>}/>
      <Route path="admin/importcodeedit/:postId" element={token ? <ImportcodeEdit/> : <AdminLogin/>}/>
      <Route path="admin/postedit/:postId" element={token ? <BlogEdit/> : <AdminLogin/>}/>
      <Route path="admin/Dashboard" element={token ? <Dashboard/> : <AdminLogin/>}/>
     </Routes>
     {!isAdminPath && <Footer/>} 
     </BrowserRouter>
    </div>
  );
}

export default App;
