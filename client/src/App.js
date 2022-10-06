import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Product from './molecules/productPage/Product'
import Navbar from './organisms/navbar/Navbar'
import Orders from './pages/admin/orders/Orders'
import Products from './pages/admin/products/Products'
import Users from './pages/admin/users/Users'
import Cart from './pages/cart/Cart'
import CategoryPage from './pages/category/CategoryPage'
import Checkout from './pages/checkout/Checkout'
import Home from './pages/home/Home'
import Myorders from './pages/orders/Myorders'
import Profile from './pages/profile/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { useSelector } from 'react-redux'

const Routing = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    if (user) {
      //dispatch actions
    } else {
      navigate('/')
    }
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={user ? <Navigate to='/' /> : <Signin />} />
      <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
      {/* <Route path='/cart' element={<Cart />} /> */}
      <Route path='/profile' element={<Profile />} />
      <Route path='/myorders' element={<Myorders />} />
      {/* <Route path='/users' element={<Users />} /> */}
      {/* <Route path='/orders' element={<Orders />} /> */}
      {/* <Route path='/products' element={<Products />} /> */}
      {/* <Route path='/checkout/cart/:price' element={<Checkout />} /> */}
      {/* <Route path='/checkout/single/:id' element={<Checkout />} /> */}
      {/* <Route path='/productlist/:category' element={<CategoryPage />} /> */}
      <Route path='/product/:id' element={<Product />} />
    </Routes>
  )
}

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routing />
    </Router>
  )
}

export default App