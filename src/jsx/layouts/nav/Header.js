import React from "react";

import { Link } from "react-router-dom";
/// Image
// import profile from "../../../images/1.jpg";
import { Dropdown } from "react-bootstrap";
import Logout from '../../pages/Authintication/Logout';
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../../store/actions/AuthActions";
import { Translate } from "../../Enums/Tranlate";

const Header = ({ onNote }) => {
   const dispatch = useDispatch()
   const lang = useSelector(state=> state.auth.lang)
   var path = window.location.pathname.split("/");
   var name = path[path.length - 1].split("-");
   var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
   var finalName = filterName.includes("app")
      ? filterName.filter((f) => f !== "app")
      : filterName.includes("ui")
      ? filterName.filter((f) => f !== "ui")
      : filterName.includes("uc")
      ? filterName.filter((f) => f !== "uc")
      : filterName.includes("basic")
      ? filterName.filter((f) => f !== "basic")
      : filterName.includes("jquery")
      ? filterName.filter((f) => f !== "jquery")
      : filterName.includes("table")
      ? filterName.filter((f) => f !== "table")
      : filterName.includes("page")
      ? filterName.filter((f) => f !== "page")
      : filterName.includes("email")
      ? filterName.filter((f) => f !== "email")
      : filterName.includes("ecom")
      ? filterName.filter((f) => f !== "ecom")
      : filterName.includes("chart")
      ? filterName.filter((f) => f !== "chart")
      : filterName.includes("editor")
      ? filterName.filter((f) => f !== "editor")
      : filterName;
   return (
      <div className="header">
         <div className="header-content">
            <nav className="navbar navbar-expand">
               <div className="collapse navbar-collapse justify-content-between">
                  <div className="header-left">
                     <div
                        className="dashboard_bar"
                        style={{ textTransform: "capitalize" }}
                     >
                        {/* {finalName.join(" ").length === 0
                           ? "Dashboard"
                           : finalName.join(" ")} */}
                        {finalName.join(" ").length === 0
                           ? Translate[lang].dashboard
                           : Translate[lang][finalName.join(" ")]}
                     </div>
                  </div>
                  <ul className="navbar-nav header-right p-0">
                     <Dropdown
                        as="li"
                        className="nav-item dropdown notification_dropdown "
                     >
                        <Dropdown.Toggle
                           variant=""
                           className="nav-link  ai-icon i-false"
                           href="#"
                           role="button"
                           data-toggle="dropdown"
                        >
                           <i className="la la-language"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="right" className="mt-2">
                              <ul className="timeline text-center">
                                 <li 
                                    className="py-2" 
                                    style={{backgroundColor: lang === 'en' ? 'var(--bg-primary)' : '#fff', cursor: 'pointer'}} 
                                    onClick={()=> dispatch(setLang('en')) }>
                                    English
                                 </li>
                                 <li 
                                    className="py-2" 
                                    style={{backgroundColor: lang === 'ar' ? 'var(--bg-primary)' : '#fff', cursor: 'pointer'}} 
                                    onClick={()=> dispatch(setLang('ar'))}>
                                    اللغه العربيه
                                 </li>
                              </ul>
                        </Dropdown.Menu>
                     </Dropdown>

                     <Dropdown
                        as="li"
                        className="nav-item dropdown header-profile"
                     >
                        <Dropdown.Toggle
                           variant=""
                           as="a"
                           className="nav-link i-false"
                           style={{border: '1px solid var(--primary)', padding: '4px', borderRadius: '50%'}}
                        >
                           {/* <img src={profile} width={20} alt="profile" /> */}
                           <i className="la la-user" style={{fontSize: '40px', color: 'var(--primary)'}}></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="right" className="mt-2 ">
                           <Link
                              to="/profile"
                              className="dropdown-item ai-icon"
                           >
                              <svg
                                 id="icon-user1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="text-primary"
                                 width={18}
                                 height={18}
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth={2}
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              >
                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                 <circle cx={12} cy={7} r={4} />
                              </svg>
                              <span className={lang ==='en' ? "ml-2" : "mr-2"}>{Translate[lang].profile} </span>
                           </Link>
                           <Logout />
                        </Dropdown.Menu>
                     </Dropdown>
                  </ul>
               </div>
            </nav>
         </div>
      </div>
   );
};

export default Header;
