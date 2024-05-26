import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavBar.css';
import logo from "./SIT-logo-rectangle-recreated.png"
// import { faAddressCard, faAirFreshener } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function NavBar(){
    const[navView, setNavView] = useState(false);
   const handleNavBar = () =>{
    setNavView(!navView);
   }
    return(
        <div >
            <div className="NavBarContainer">
                <div className="MenuBarbox">
                    <img className="sitLogo" src={logo}/>
                    <div className="MenuBardiv">
                        {/* <i className="fas fa-bars menuIcon"></i> */}
                        {!navView && <button className="fas fa-bars menuIcon" onClick={handleNavBar}></button>}
                    </div>
                </div>
                {navView && <div className="NavBarBody">
                    <div className="NavInnerContainer">
                    {navView && <button className="fas fa-times menuIcon" onClick={handleNavBar}></button>}
                        <ul className="NavMenuHeadingList">
                            <li className="NavMenuHeading" onClick={handleNavBar}><Link to="/blog" className="NavBarLink">ABOUT US</Link></li>
                            <li className="NavMenuHeading" onClick={handleNavBar}><Link to="/blog" className="NavBarLink">PRODUCTS</Link></li>
                            <li className="NavMenuHeading" onClick={handleNavBar}><Link to="/blog" className="NavBarLink">CAREERS</Link></li>
                            <li className="NavMenuHeading" onClick={handleNavBar}><Link to="/blog" className="NavBarLink">BLOG</Link></li>
                            <li className="NavMenuHeading" onClick={handleNavBar}><Link to="/blog" className="NavBarLink">CONTACT US</Link></li>
                        </ul>
                        {/* <marquee class="css4" >
                        <img className="sitLogo" src={logo}/>
                        <img className="sitLogo" src={logo}/>
                        <img className="sitLogo" src={logo}/>
                        </marquee> */}
                    </div>
                    
                        
                    
                </div>}
            </div>
            <div className="page-body">
            </div>
        </div>
    )
}