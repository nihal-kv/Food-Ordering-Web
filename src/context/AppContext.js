import { createContext, useState, useReducer} from "react";


export const AppContext=createContext();

const defaultState={
    items:[],
    totalAmount:0
}

const cartReducer=(state, action)=>{
    if(action.type==='ADD')
    {
        
        const newAmount=state.totalAmount + action.item.price;

        const existingItemIndex=state.items.findIndex((item)=> item.id===action.item.id);
        const existingItem=state.items[existingItemIndex];

        let updatedItems;

        if(existingItem)
        {
            const updatedItem={
                ...existingItem,
                amount:existingItem.amount+action.item.amount
            }
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else
        {
            updatedItems=state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newAmount
        }
    }
    if(action.type==='REMOVE')
    {
        const existingItemIndex=state.items.findIndex((item)=> item.id===action.id);
        const existingItem=state.items[existingItemIndex];
        const newAmount=state.totalAmount-existingItem.price;

        let updatedItems;
        if(existingItem.amount===1)
        {
            updatedItems=state.items.filter((item)=> item.id!==action.id);
        }
        else
        {
            const updatedItem={...existingItem, amount: existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }

        return{
            items: updatedItems,
            totalAmount: newAmount
        }
    }
    if(action.type==='CLEAR')
    {
        return defaultState;
    }
    return defaultState;
}

export default function AppContextProvider({children}){

    const [cartState, dispatchCartAction]= useReducer(cartReducer, defaultState);
    const [shoppingItems, setShoppingItems]=useState([]);
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const [isLoggingIn, setIsLoggingIn]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [currentUserName, setCurrentUserName]=useState("");
    const [currentUserUID, setCurrentUserUID]= useState("");
    const [isSigningUp, setIsSigningUp]=useState(false);


    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type: "ADD", item: item});
    };

    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type: "REMOVE", id: id});
    }

    const clearCartHandler=()=>{
        dispatchCartAction({type:'CLEAR'});
    }

    let items= cartState.items;
    let totalAmount= cartState.totalAmount;
    const addItem= addItemToCartHandler;
    const removeItem=removeItemFromCartHandler;

    const value={
        items, 
        shoppingItems,
        setShoppingItems,
        isLoggedIn,
        setIsLoggedIn,
        totalAmount,
        addItem,
        removeItem,
        clearCartHandler, 
        isLoading,
        setIsLoading,
        currentUserName,
        setCurrentUserName,
        currentUserUID,
        setCurrentUserUID,
        isLoggingIn,
        setIsLoggingIn,
        isSigningUp,
        setIsSigningUp
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}