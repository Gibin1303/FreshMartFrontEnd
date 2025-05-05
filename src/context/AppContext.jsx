import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/greencart_assets/greencart_assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'


axios.defaults.withCredentials =true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [user,setUser]=useState(null)
    const [isSeller,setIseller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])

    const [cartItems,setCartItems]=useState({})
    const [searchQuery,setSearchQuery]=useState({})


    // fetch seller status

    const fetchSeller = async ()=>{
        try{
           const{data} = await axios.get('/api/seller/is-auth')
           if(data.success){
            setIseller(true)
           }else{
            setIseller(false)
           }
        }catch(error){
          setIseller(false)
        }
    }

    const fetchUser = async()=>{
        try{
          const {data}  = await axios.get('/api/user/is-auth')
          if(data.success){
            setUser(data.user)
            setCartItems(data.user.cartItems)
          }else{
            setUser(null)
          }
        }catch{

        }
    }

    // fetch all products

    const fetchProducts = async()=>{
       try{
         const {data} = await axios.get('/api/product/list')
         if(data.success){
            setProducts(data.products)
         }else{
            toast.error(data.message)
         }
         
       }catch(error){
        toast.error(error.message)

       }
    }

    

    // Add product to cart

    const addToCart =(itemId)=>{
        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            cartData[itemId] += 1
        }else{
            cartData[itemId] = 1
        }

        setCartItems(cartData)
        toast.success("Added to Cart")
    }

    // update cart item quanity

    const updateCratItem = (itemId,quanity)=>{
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quanity
        setCartItems(cartData)
        toast.success("cart updated")
    }


    // remove produvt from cart

    const removeCart = (itemId)=>{
        let cartData = structuredClone(cartItems)
        if(cartData[itemId]){
            cartData[itemId] -= 1
            if(cartData[itemId] === 0){
                delete cartData[itemId]
            }
    toast.success("removed from cart")
        setCartItems(cartData)
        }
       
    }




    // get cartItem Count

    const getCartCount = ()=>{
        let totalCount = 0
        for(const item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    // get cart total amount

    const getTotalAmount = ()=>{
        let totalAmount = 0
        for(const items in cartItems){
         let itemInfo = products.find((product)=>product._id===items)
         if(cartItems[items]>0){
             totalAmount += itemInfo.offerPrice*cartItems[items]
         }
        }
         return Math.floor(totalAmount*100)/100
    }



    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

    useEffect(()=>{
        const updateCart = async()=>{
            try{
               const { data } = await axios.post('/api/cart/update', {cartItems})
               if(!data.success){
                toast.error(data.message)
               }
            }catch(error){
              toast.error(error.message)
            }
        }

        if(user){
            updateCart()
        }
    },[cartItems])
     

    const value = {navigate,user,setUser,isSeller,setIseller,setShowUserLogin,showUserLogin,products,currency,addToCart,updateCratItem,removeCart,cartItems,searchQuery,setSearchQuery,getCartCount,getTotalAmount,axios,fetchProducts,setCartItems}


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}