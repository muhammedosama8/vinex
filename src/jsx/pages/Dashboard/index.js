import React from "react";

const Home = () => {
  return (
        <div className="row">
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="fs-14 mb-1">Total Users</p>
                    <span className="fs-35 text-black font-w600">
                      93
                    </span>
                  </div>
                  <i className='la la-users' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Categories</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-cubes' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Sub categories</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-cube' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Brands</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-file-text' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Admin</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-user-shield' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Orders </p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-truck' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Orders (<span className="text-primary">on the way</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-truck text-primary' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Orders (<span className="text-danger">cancelled</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-times text-danger' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Orders (<span className="text-success">Delivered</span>)</p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  
                  <i className='la la-check-circle text-success' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Total Sales </p>
                    <span className="fs-35 text-black font-w600">
                      856
                    </span>
                  </div>
                  <i className='la la-dollar' style={{fontSize: '3rem'}}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-14 mb-1">Sales (Daily)</p>
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
