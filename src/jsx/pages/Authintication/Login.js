import React,{ useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import login from "../../../images/reg-bg.jpg";
import {AvField, AvForm} from "availity-reactstrap-validation";
import { loadingToggleAction, loginAction } from "../../../store/actions/AuthActions";
import ControlService from "../../../services/ControlServices";
import { Translate } from "../../Enums/Tranlate";

function Login(props) {
	const navigate = useNavigate()
	const [email, setEmail] = useState('tatasamy1998@gmail.com');
	const [password, setPassword] = useState('Admin!123456');
	const [showPassword, setShowPassword] = useState(false);
	const [dashboardLogo, setDashboardLogo] = useState('');
    const dispatch = useDispatch();
	const Auth = useSelector(state=> state.auth)
	const lang = useSelector(state=> state.auth.lang)
	const controlService = new ControlService()

    function onLogin(e) {
        e.preventDefault();     
		dispatch(loadingToggleAction(true));
        dispatch(loginAction(email, password, navigate));
    }

	useEffect(()=>{
        controlService.getDashboardLogo().then(res=>{
            if(res){
                setDashboardLogo(res.data.data.dashboard_logo)
            }
        })
    }, [])

  return (
		<div className="login-wrapper">
			<div className="login-aside-left position-relative" style={{backgroundImage:"url("+ login +")"}}>
				<div className="login-logo position-absolute" style={{width: '22rem', left: '50%', top: '35%', transform: 'translate(-50%, -40%)'}}>
					<img src={dashboardLogo} alt="logo" className="w-100"/>
				  </div>
				<div className="login-description">
					<h3 className="text-white">{Translate[lang].text} ✌️</h3>

					<div className="mt-2">
						<a href='/' className="text-white">© 2023 Leap</a>
					</div>
				</div>
			</div>
			<div className="login-aside-right">
				<div className="row m-0 justify-content-center h-100 align-items-center">
				  <div className="col-xl-6 col-xxl-8">
					<div className="authincation-content">
					  <div className="row no-gutters">
						<div className="col-xl-12">
						  <div className="auth-form">
							<div className=" mb-3">
							  <h2 className="text-primary">{Translate[lang].welcome_back}</h2>
							</div>
							<h4 className=" mb-4 ">{Translate[lang].sign_text}</h4>
                            {props.errorMessage && (
                                <div className='text-danger'>
                                    {props.errorMessage}
                                </div>
                            )}
                            {props.successMessage && (
                                <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                    {props.successMessage}
                                </div>
                            )}
							<AvForm onValidSubmit={onLogin} className='login-form'>
								<Row>
									<Col md={12} className="form-group mb-2">
										<AvField
											label ={Translate[lang].email}
											name ='email'
											type="email" 
											value={email}
											errorMessage="Please Enter a Valid Value"
											validate={{
												required: {
													value:true,
													errorMessage: 'This Field is required'
												},
											}}
											placeholder={Translate[lang].email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col md={12} className="form-group position-relative">
										<AvField
											label ={Translate[lang].password}
											name ='password'
											type={showPassword ? 'text' : 'password'}
											value={password}
											errorMessage="Please enter a valid password"
											validate={{
												required: {
													value:true,
													errorMessage: 'This Field is required'
												},
											}}
											placeholder={Translate[lang].password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										{showPassword ? 
											<i className="la la-eye-slash position-absolute" style={{top: '50%',right: lang==='en' ? '8%' : 'auto',left: lang==='ar' ? '8%' : 'auto'}} onClick={()=>setShowPassword(false)}></i> : 
											<i className="la la-eye position-absolute" style={{top: '50%',right: lang==='en' ? '8%' : 'auto',left: lang==='ar' ? '8%' : 'auto'}} onClick={()=>setShowPassword(true)}></i>}
									</Col>
								</Row>
								
							  {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
								<div className="form-group">
								  <div className="custom-control custom-checkbox ml-1 ">
									<input
									  type="checkbox"
									  className="custom-control-input"
									  id="basic_checkbox_1"
									/>
									<label
									  className="custom-control-label"
									  htmlFor="basic_checkbox_1"
									>
									  Remember me
									</label>
								  </div>
								</div>
								
							  </div> */}
							  <div className="text-center">
								<button
								  type="submit"
								  className="btn btn-primary btn-block"
								  disabled={Auth?.showLoading}
								>
								  {Translate[lang].sign_in}
								</button>
							  </div>
							</AvForm>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			</div>
		</div>
  );
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);
