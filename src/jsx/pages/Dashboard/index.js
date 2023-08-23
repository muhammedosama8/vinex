import React, { useState } from "react";
import { Dropdown, Nav, Tab } from "react-bootstrap";

const Home = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

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

          <div className="col-xl-4 col-xxl-12 col-lg-4">
            <div className="card">
              <div className="card-header align-items-start pb-0 border-0">
                <div>
                  <h4 className="fs-16 mb-0 text-black font-w600">
                    Increase 25%
                  </h4>
                  <span className="fs-12">Comparisson</span>
                </div>
                <div className="dropdown bootstrap-select form-control style-1 default-select">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      className="default-select style-1 btn filter-option"
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                      }}
                    >
                      {refreshToggle ? refreshToggle : "Daily"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className="dropdown-menu inner show"
                      style={{ borderRadius: "10px" }}
                    >
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#"
                        onClick={() => setRefreshToggle("Daily")}
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          margin: "0 auto",
                          paddingTop: "15px",
                        }}
                      >
                        Daily
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#"
                        onClick={() => setRefreshToggle("Monthly")}
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          margin: "0 auto",
                        }}
                      >
                        Monthly
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        href="#"
                        onClick={() => setRefreshToggle("Weekly")}
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          margin: "0 auto",
                        }}
                      >
                        Weekly
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="card-body pt-0">
                {/* <Increase /> */}
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <Tab.Container defaultActiveKey="monthly">
              <div className="card" id="sales-revenue">
                <div className="card-header pb-0 d-block d-sm-flex border-0">
                  <h3 className="fs-20 text-black mb-0">Sales Revenue</h3>
                  <div className="card-action revenue-tabs mt-3 mt-sm-0">
                    <Nav as="ul" className="nav nav-tabs" role="tablist">
                      <Nav.Item className="nav-item">
                        <Nav.Link
                          className="nav-link"
                          data-toggle="tab"
                          to="#monthly"
                          role="tabpanel"
                          eventKey="monthly"
                        >
                          Monthly
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="nav-item">
                        <Nav.Link
                          className="nav-link"
                          data-toggle="tab"
                          to="#weekly1"
                          role="tabpanel"
                          eventKey="weekly"
                        >
                          Weekly
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="nav-item">
                        <Nav.Link
                          className="nav-link"
                          data-toggle="tab"
                          to="#today1"
                          role="tabpanel"
                          eventKey="today"
                        >
                          Today
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
                <Tab.Content>
                  <div className="card-body">
                    <div className="tab-content">
                      <Tab.Pane eventKey="monthly">
                        <div className="tab-pane fade show" role="tabpanel">
                          {/* <SalesRevenue /> */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="weekly">
                        <div className="tab-pane fade show" role="tabpanel">
                          {/* <SalesRevenue2 /> */}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="today">
                        <div className="tab-pane fade show" role="tabpanel">
                          {/* <SalesRevenue3 /> */}
                        </div>
                      </Tab.Pane>
                    </div>
                  </div>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
  );
};

export default Home;
