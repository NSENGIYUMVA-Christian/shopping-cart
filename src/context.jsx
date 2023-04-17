import { useReducer, useContext, useEffect, createContext  } from "react"
import reducer from "./reducer"
import {CLEAR_CART,DECREASE,DISPLAY_ITEMS,INCREASE,LOADING,REMOVE} from "./action"
import cartItems from "./data"
import { getTotals } from "./utils"
const url = 'https://www.course-api.com/react-useReducer-cart-project';


const appContext = createContext()


// initial state
const initialState = {
    loading: false,
    cart: new Map()
}

export const AppProvider = ({children})=>{
  // useReducer set up
  const [state, dispatch] = useReducer(reducer, initialState)
  // invoking totals function
const {totalAmount, totalCost} = getTotals(state.cart)

  // clear all function
  const clearCart = () =>{
    dispatch({type: CLEAR_CART})
  }
// remove item functionality
const remove = (id)=>{
    dispatch({type:REMOVE, payload:{id}})
}
// increase item functionality
const increase = (id)=>{
    dispatch({type:INCREASE, payload:{id}})
}
// decrease item functionality
const decrease = (id)=>{
    dispatch({type:DECREASE, payload:{id}})
}

// getData function
const fetchData = async() =>
{
        dispatch({type:LOADING})
        const response = await fetch(url)
        const cart = await response.json()
        dispatch({type: DISPLAY_ITEMS, payload:{cart}})
   
}

// fetching api data
useEffect(()=>{
   fetchData()
} , [])

    return <appContext.Provider value={{...state, clearCart, remove,increase, decrease,totalAmount, totalCost}} >
        {children}
    </appContext.Provider>
}

export const useGlobalContext = ()=> useContext(appContext)