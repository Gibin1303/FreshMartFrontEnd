import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import {Toaster} from "react-hot-toast"
import Footer from './components/Fotter'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCtegory from './pages/ProductCtegory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart.jsx'
import AddAddress from './pages/AddAddress.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SellerLogin from './components/seller/SellerLogin.jsx'
import SellerLayout from './pages/seller/SellerLayout.jsx'
import AddProduct from './pages/seller/AddProduct.jsx'
import ProductList from './pages/seller/ProductList.jsx'
import Order from './pages/seller/Order.jsx'
import Loading from './components/Loading.jsx'






const App = () => {
 
  const sellerPath = useLocation().pathname.includes("seller")
  const{showUserLogin,isSeller} = useAppContext()

  return (      
   <div className='text-default min-h-screen text-gray-700 bg-white'>

      {sellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/>: null}
      <Toaster/>
      
      
    <div className={`${sellerPath?"":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/products' element={<AllProducts/>}/>
           <Route path='/products/:category' element={<ProductCtegory/>}/>
           <Route path='products/:category/:id' element={<ProductDetails/>}/>
           <Route path='/cart' element={<Cart/>}/>
           <Route path='/add-address' element={<AddAddress/>}/>
           <Route path='/my-orders' element={<MyOrders/>}/>  
             <Route path='loader' element={<Loading/>}/>
            <Route path='/seller' element={isSeller?<SellerLayout/>:<SellerLogin/>}>
            <Route index element={isSeller?<AddProduct/>:null}/>
            <Route path="product-list" element={<ProductList/>}/>
            <Route path="orders" element={<Order/>}/>
            </Route>   


        </Routes>
    </div>
    {!sellerPath && <Footer/>}
   </div>
  )
}

export default App