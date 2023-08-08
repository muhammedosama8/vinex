import React,{ useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// image
import logo2 from "../../../images/logo-full.png";
import login from "../../../images/reg-bg.jpg";
import { loadingToggleAction, loginVerifiedAction } from "../../../store/actions/AuthActions";

function Verified(props) {
    const Auth = useSelector(state => state.auth)
	const navigate = useNavigate()
	const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const phone = Auth.phone
    const country_code = Auth.country_code
	
    useEffect(()=>{
        if(!country_code && !phone) navigate('/login')
    },[country_code, navigate, phone])

    function verifiedAcc(e) {
        e.preventDefault();
        if (code === '') {
			return;
		}        
		dispatch(loadingToggleAction(true));
        dispatch(loginVerifiedAction(country_code, phone,code, navigate));
    }

  return (
		<div className="login-wrapper">
			<div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
				<div className="login-logo">
					<img src={logo2} alt="logo" />
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
							  <h2 className="text-primary">Verify your Account</h2>
							</div>
                            
							<form onSubmit={verifiedAcc}>
                                <div className="form-group">
									<label className="mb-2 ">
									  <strong>Code</strong>
									</label>
									<input 
										type="number" 
										className="form-control"
										value={code}
										placeholder='Code'
										onChange={(e) => setCode(e.target.value)}
                                        required
									/>
								</div>
							  <div className="text-center">
								<button
								  type="submit"
								  className="btn btn-primary btn-block"
								  disabled={Auth?.showLoading}
								>
								  Verify
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
export default connect(mapStateToProps)(Verified);
