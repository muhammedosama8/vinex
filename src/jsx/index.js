import React from 'react'
/// React router dom
import {Routes, Route, Outlet } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'


/// Pages
import Login from './pages/Authintication/Login'
import Error404 from './common/Error404'

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';
import Categories from './pages/Categories/Categories'
import SubCategories from './pages/Categories/SubCategories'
import Products from './pages/Products'
import AddProducts from './pages/Products/AddProducts'
import Variant from './pages/Variant'
import AddVariant from './pages/Variant/AddVariant'
import Admins from './pages/Admin'
import AddAdmin from './pages/Admin/AddAdmin'
import Banners from './pages/Banners'
import Users from './pages/Users'
import PromCodes from './pages/PromoCodes'
import AddPromoCodes from './pages/PromoCodes/AddPromoCodes'
import Orders from './pages/Orders'
import Home from './pages/Dashboard'
import Profile from './pages/Users/Profile'
import AdScreen from './pages/AdScreen'
import SocialMedia from './pages/Setting/SocialMedia'
import Permission from './pages/Rules'
import Reports from './pages/Reports'
import Notification from './pages/Notification'

const Markup = () => {
  // let path = window.location.pathname
  // path = path.split('/')
  // path = path[path.length - 1]
  // let pagePath = path.split('-').includes('page')
  // const [activeEvent, setActiveEvent] = useState(!path)

  const allroutes = [
    /// Dashboard
    { url: "", component: <Home/> },
    { url: "dashboard", component: <Home/> },
    

    /// pages
    { url: 'page-login', component: <Login/> },

    // Admins
    { url: 'admins', component: <Admins /> },
    { url: 'admins/add-admins', component: <AddAdmin /> },
    { url: 'admins/edit-admin/:id/:name', component: <AddAdmin /> },

    // Users
    { url: 'users', component: <Users /> },
    { url: 'users/:id/:name', component: <Profile /> },

    // Rules
    { url: 'rules', component: <Permission /> },
    { url: 'rules/:id', component: <Permission /> },

    // Promo Codes
    { url: 'promo-codes', component: <PromCodes /> },
    { url: 'promo-codes/add-promo-codes', component: <AddPromoCodes /> },

    // Banners
    { url: 'banners', component: <Banners /> },

    // Ad Screen
    { url: 'ad-screen', component: <AdScreen /> },

    // Orders
    { url: 'orders', component: <Orders /> },

    // Reports
    { url: 'reports', component: <Reports /> },

    // Notification
    { url: 'notification', component: <Notification /> },

    // Products
    { url: 'products', component: <Products /> },
    { url: 'products/add-products', component: <AddProducts /> },

    // Variant
    { url: 'variant', component: <Variant /> },
    { url: 'variant/add-variant', component: <AddVariant /> },

    // Categories
    {url: 'categories', component: <Categories />},
    {url: 'sub-categories', component: <SubCategories />},

    //Setting
    {url: 'social', component: <SocialMedia />},

    // Error
    {url: '*', component: <Error404 />},
  ]

  return (
       <> 
          <Routes>
            <Route path='page-error-404' element={<Error404/>} />
            <Route element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                      key={i}
                      exact
                      path={`${data.url}`}
                      element={data.component}
                    />
                ))}
            </Route>
          </Routes>
          <ScrollToTop />
       </>
  )
}

function MainLayout(){  
  return (
    <div id="main-wrapper" 
        className={`show `}
      >  
        <Nav />
        <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
          <div className="container-fluid">
            <Outlet />                
          </div>
        </div>
      <Footer />
    </div>
  )

};

export default Markup
