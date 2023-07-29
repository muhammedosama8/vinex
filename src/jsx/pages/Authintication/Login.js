import React,{ useState } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// image
import logo2 from "../../../images/logo-full.png";
import login from "../../../images/reg-bg.jpg";
import { loadingToggleAction, loginAction } from "../../../store/actions/AuthActions";

function Login(props) {
	const navigate = useNavigate()
	const [email, setEmail] = useState('tatasamy1998@gmail.com');
	const [password, setPassword] = useState('Admin!123456');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const dispatch = useDispatch();
	const Auth = useSelector(state=> state.auth)

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return;
		}      
		dispatch(loadingToggleAction(true));
        dispatch(loginAction(email, password, navigate));
    }

  return (
		<div className="login-wrapper">
			<div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
				<div className="login-logo">
					<img src={logo2} alt="logo" />
				  </div>
				<div className="login-description">
					<h2 className="text-white mb-4">Check the Status</h2>
					<p className="fs-12">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>

					<div className="mt-5">
						<a href='/' className="text-white">© 2023 Muhammed Osama</a>
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
							  <h2 className="text-primary">Welcome to Vinex</h2>
							</div>
							<h4 className=" mb-4 ">Sign in by entering information below</h4>
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
							<form onSubmit={onLogin}>
                                <div className="form-group">
									<label className="mb-2 ">
									  <strong>Email</strong>
									</label>
									<input 
										type="email" 
										className="form-control"
										value={email}
										placeholder='demo@demo.com'
										onChange={(e) => setEmail(e.target.value)}
                                       //defaultValue="abcd@gmail.com"
									/>
								  {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
								</div>
								<div className="form-group">
									<label className="mb-2 "><strong>Password</strong></label>
									<input
									  type="password"
									  className="form-control"
									  placeholder='*********'
									  value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
								</div>
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
								  Sign In
								</button>
							  </div>
							</form>
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
