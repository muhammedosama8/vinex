import React, { useEffect, useReducer, useState } from "react";
/// Scroll
// import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from 'react-bootstrap/Collapse';
/// Link
import { Link } from "react-router-dom";


import {MenuList} from '../../Enums/Menu';
import {useScrollPosition} from "@n8tb1t/use-scroll-position";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active : "",
  activeSubmenu : "",
}

const SideBar = (props) => {
  const [state, setState] = useReducer(reducer, initialState);	
  const lang = useSelector(state=> state.auth?.lang)
  const Auth = useSelector(state=> state.auth?.auth)
  const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

 //For scroll
 	const [hideOnScroll, setHideOnScroll] = useState(true)
	useScrollPosition(
		({ prevPos, currPos }) => {
		  const isShow = currPos.y > prevPos.y
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll]
	)
 
  const handleMenuActive = status => {
    setState({active : status});		
		if(state.active === status && MenuList.filter(res => res?.title === status)[0]?.hasOwnProperty('content')){			
      setState({active : ""});
    }
	}

	const handleSubmenuActive = (status) => {		
    setState({activeSubmenu : status})
		if(state.activeSubmenu === status){
      setState({activeSubmenu : ""})
			
		}
	}

	useEffect(() => {
    let page = window.location.pathname
    let filter = MenuList?.filter(res=> `${res.to}` === page?.split('/')[1])

    if(filter.length > 0) handleMenuActive(filter[0].title)
	}, [ window.location.pathname]);

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

    return (
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
                {MenuList.map((data, index)=>{
                  let menuClass = data.classsChange;
                    if(menuClass === "menu-title"){
                      return(
                          <li className={menuClass}  key={index} >{data.title}</li>
                      )
                    }else{
                      return(				
                        <li className={` ${ state.active === data.title ? 'mm-active' : ''}`}
                          key={index} 
                        >
                          
                          {data.content && data.content.length > 0 ?
                            <>
                                <Link to={"#"} 
                                  className="has-arrow"
                                  onClick={() => {handleMenuActive(data.title)}}
                                >								
                                    {data.iconStyle}
                                    <span className="nav-text">{Translate[lang][data.text]}</span>
                                </Link>
                                  <Collapse in={state.active === data.title ? true :false}>
                                    <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                      {data.content && data.content?.filter(res=> isExist(res.rule))?.map((data,index) => {		
                                        return(	
                                            <li key={index}
                                              className={`${ state.activeSubmenu === data.title ? "mm-active" : ""}`}                                    
                                            >
                                              {data.content && data.content.length > 0 ?
                                                  <>
                                                    <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                                      onClick={() => { handleSubmenuActive(data.title)}}
                                                    >
                                                      {Translate[lang][data.text]}
                                                    </Link>
                                                    <Collapse in={state.activeSubmenu === data.title ? true :false}>
                                                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                          {data.content && data.content.map((data,index) => {
                                                            return(	
                                                                <li key={index}>
                                                                  <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{Translate[lang][data.text]}</Link>
                                                                </li>
                                                            )
                                                          })}
                                                        </ul>
                                                    </Collapse>
                                                  </>
                                                :
                                                <Link to={data.to}>
                                                  {Translate[lang][data.text]}
                                                </Link>
                                              }
                                              
                                            </li>
                                          
                                        )
                                      })}
                                    </ul>
                                  </Collapse>
                            </>
                              
                          :
                            <Link to={data.to} onClick={() => handleMenuActive(data.title)}>
                                {data.iconStyle}
                                <span className="nav-text">
                                 {Translate[lang][data.text]}
                                </span>
                            </Link>
                          }
                        </li>	
                      )
                  }
                })}          
          </ul>
		    </div>
      </div>
    );
  
}

export default SideBar;
