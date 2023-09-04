import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoText from "../../../images/logo-full.png";
import ControlService from "../../../services/ControlServices";

export function  NavMenuToggle(){
	setTimeout(()=>{	
		let mainwrapper = document.querySelector("#main-wrapper");
		if(mainwrapper.classList.contains('menu-toggle')){
			mainwrapper.classList.remove("menu-toggle");
		}else{
			mainwrapper.classList.add("menu-toggle");
		}
	},200);
}

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   const [logo, setLogo] = useState('');
   const Auth = useSelector(state => state.auth)
   const controlService = new ControlService()
   
   useEffect(()=>{
      controlService.getDashboardLogo().then(res=>{
         setLogo(res.data.data.dashboard_logo)
      })
   },[Auth.logo])

   return (
      <div className="nav-header">
         <Link to="/dashboard" className="brand-logo">
            <img className="brand-title" src={logo} alt="logo" style={{height: '90%'}} />
         </Link>

         <div className="nav-control" 
            onClick={() => {
               setToggle(!toggle)
               NavMenuToggle()
            }
            }
         
         >
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
