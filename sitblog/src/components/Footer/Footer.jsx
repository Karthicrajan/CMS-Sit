import React from "react";
import './Footer.css'
import logo from "./SIT-logo-rectangle-recreated.png"
export default function Footer(){
    return(
        <div className="footerContiner">
            <div className="ftbady">
                <div class="grid-container">
                    <div class="grid-item">
                    <div class='ftLogobox'>
                     <img className="sitLogoFT" src={logo}/>
                     <span>Initiate. Ideate. Innovate.</span>
                    </div>
                    </div>
                    <div class="grid-item">
                        <div className="ftMenubox">
                            <ul className="ftmenuList">
                                <li>About Us</li>
                                <li>Contact Us</li>
                                <li>THEYN</li>
                            </ul>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div className="ftAddressbox">
                            <span>2201 Cooperative Way, Suite
                                600,Heardon,VA 20171,USA
                            </span>
                            <span>+91-788-6594</span>
                        </div>
                    </div>
                    <div class="grid-item">
                        <div className="ftAddressbox">
                            <span>1st floor,Cavinville,12,Cenotaph Rd,United Colony,Rathna Nagar,Alwarpet,Chennai,Tamil Nadu 600018,India</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cpContiner">
                <div className="cpbody">
                    <div>
                        <span>All rights reserved. Copyright © 2017, Salem Infotech Inc.</span>
                    </div>
                    <div>
                        <span>Powered by Salem Infotech SIT.</span>
                    </div>
                </div>
               
            </div>
        </div>
    )
}