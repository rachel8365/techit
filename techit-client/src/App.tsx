import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from "react-toastify"
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import Products from './components/Products';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Cart from './components/Cart';

function App() {
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) == null ? { email: false, isAdmin: false }
    : JSON.parse(sessionStorage.getItem("userInfo") as string));
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(sessionStorage.getItem("isLoggedIn") == "true" ? true : false)
  let [productsChanged, setProductsChanged] = useState<boolean>(false)
  return (
    <div className="App">

      <ToastContainer theme='dark' />

      <Router>
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
        {/* {userInfo.email} */}
        <Routes>
          <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register setUserInfo={setUserInfo} />} />
          <Route path='/products' element={<Products userInfo={userInfo} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addProduct' element={<AddProduct productsChanged={productsChanged} setProductsChanged={setProductsChanged} />} />
          <Route path='/products/update/:id' element={<UpdateProduct />} />
          <Route path='/cart' element={<Cart />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
