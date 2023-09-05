import React from "react";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const Home = () => {
  const lang = useSelector(state=> state.auth.lang)
  return (
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_users}</p>
                    <span className="fs-35 text-black font-w600">
                      93
                    </span>
                  </div>
                  <i className='la la-users' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_categories}</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-cubes' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_sub_categories}</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-cube' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_brands}</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-file-text' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_admins}</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-user-shield' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_orders}</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-truck' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.orders} (<span className="text-primary">{Translate[lang]?.on_the_way}</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-truck text-primary' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.orders} (<span className="text-danger">{Translate[lang]?.canceled}</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-times text-danger' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.orders} (<span className="text-success">{Translate[lang]?.delivered}</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  
                  <i className='la la-check-circle text-success' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.total_sales} </p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-dollar' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ textAlign: lang=== 'ar' ? 'right' : 'left'}}>
                    <p className="fs-14 mb-1">{Translate[lang]?.sales} ({Translate[lang]?.daily})</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-dollar' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>

        </div>
  );
};

export default Home;
