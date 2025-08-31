import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './ReduxtoolKit/Store/Store.js'
import Home from './components/Home/Home.jsx'
import Mobiles from './components/Mobiles/Mobiles.jsx'
import SingleMobile from './components/SingleMobile/SingleMobile.jsx'
import Cart from './components/Cart/Cart.jsx'
import Address from './components/Address/Address.jsx'
import PaymentPage from './components/PaymentPage/PaymentPage.jsx'
import OrderPlacedPage from './components/OrderPlacedPage/OrderPlacedPage.jsx'
import OrdersPage from './components/OrdersPage/OrdersPage.jsx'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import Layout from './Layout.jsx'
import LoginSignUp from './components/Login&SignUp/LoginSignUp.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<MainLayout />} >
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mobiles/:categoryName/:category' element={<Mobiles />} />
        <Route path='/mobile/:id' element={<SingleMobile />} />
        <Route path='/Wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
      </Route>

      <Route path='' element={<Layout />} >
        <Route path='/loginSignup' element={<LoginSignUp />} />
        <Route path='/address' element={<PrivateRoute><Address /></PrivateRoute>} />
        <Route path='/payment' element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path='/orderPlaced' element={<PrivateRoute><OrderPlacedPage /></PrivateRoute>} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
