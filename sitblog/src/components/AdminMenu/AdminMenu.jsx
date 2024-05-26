import React from "react";
import './AdminMenu.css';
import { Link } from "react-router-dom";
export default function AdminMenu(){
    return(
        <div className="sideBar">
            <div>
                <ul className="SideBarList">
                    <li><Link to="/admin/write" className="SideBarMenu">Write</Link></li>
                    <li>Manage</li>
                </ul>
            </div>
        </div>
    )
}