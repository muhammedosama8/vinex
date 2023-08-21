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
import Categories from './pages/Categories'
import SubCategories from './pages/SubCategories'
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
import AdScreen from './pages/AdScreen'
import SocialMedia from './pages/Setting/SocialMedia'
import Permission from './pages/Rules'
import Reports from './pages/Reports'
import Notification from './pages/Notification'
import Profile from './pages/Profile'
import Control from './pages/Control'
import Brands from './pages/Brand'
import DynamicVariant from './pages/DynamicVariant'
import AddDynamicVariant from './pages/DynamicVariant/AddVariant'
import UserProfile from './pages/Users/Profile'
import Currency from './pages/Setting/Currency'
import StaticPages from './pages/Setting/StaticPages'
import FAQs from './pages/Setting/StaticPages/FAQs'
import Privacy from './pages/Setting/StaticPages/Privacy'
import About from './pages/Setting/StaticPages/About'
import AddNotification from './pages/Notification/AddNotification'
import TimeSlot from './pages/TimeSlot'

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
    { url: 'users/profile', component: <UserProfile /> },

    // Rules
    { url: 'rules', component: <Permission /> },
    { url: 'rules/:id', component: <Permission /> },

    // Promo Codes
    { url: 'promo-codes', component: <PromCodes /> },
    { url: 'promo-codes/add-promo-codes', component: <AddPromoCodes /> },
    { url: 'promo-codes/edit-promo-codes', component: <AddPromoCodes /> },

    // Banners
    { url: 'banners', component: <Banners /> },

    // Time Slot
    { url: 'time-slot', component: <TimeSlot /> },

    // Ad Screen
    { url: 'ad-screen', component: <AdScreen /> },

    // Orders
    { url: 'orders', component: <Orders /> },

    // Reports
    { url: 'reports', component: <Reports /> },

    // Notification
    { url: 'notification', component: <Notification /> },
    { url: 'notification/add-notification', component: <AddNotification /> },

    // Products
    { url: 'products', component: <Products /> },
    { url: 'products/add-products', component: <AddProducts /> },
    { url: 'products/add-products/:id', component: <AddProducts /> },

    // Variant
    { url: 'variant', component: <Variant /> },
    { url: 'variant/add-variant', component: <AddVariant /> },
    { url: 'variant/add-variant/:id', component: <AddVariant /> },

    // DynamicVariant
    { url: 'dynamic-variant', component: <DynamicVariant /> },
    { url: 'dynamic-variant/add-dynamic-variant', component: <AddDynamicVariant /> },
    { url: 'dynamic-variant/edit-dynamic-variant/:id', component: <AddDynamicVariant /> },

    // Categories
    {url: 'categories', component: <Categories />},
    {url: 'sub-categories', component: <SubCategories />},
    {url: 'brands', component: <Brands />},

    //Setting
    {url: 'social', component: <SocialMedia />},
    {url: 'control', component: <Control />},
    {url: 'currency', component: <Currency />},
    {url: 'pages', component: <StaticPages />},
    {url: 'pages/about', component: <About />},
    {url: 'pages/privacy', component: <Privacy />},
    {url: 'pages/faqs', component: <FAQs />},

    //Profile
    {url: 'profile', component: <Profile />},

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
