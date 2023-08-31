
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import Signup from './pages/Signup';
import { toast } from 'react-hot-toast';


function App() {

  const {setShoppingItems, setIsLoading}=useContext(AppContext);
  

  async function fetchItems(){
    setIsLoading(true);
    try{
      const response=await fetch('https://food-station-79bd3-default-rtdb.firebaseio.com/items.json');
      const data=await response.json();

      const loadedItems=[];

      for(const key in data)
      {
        loadedItems.push({
          id: key,
          title:data[key].title,
          price: data[key].price,
          imageUrl: data[key].imageUrl
        })
      }
      setShoppingItems(loadedItems);


    }
    catch(err)
    {
      toast.error(err);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchItems();
  }, [])

  return (
    <div className="app">
        
        

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          {/* <Route path='/checkout' element={<Checkout/>} /> */}

        </Routes>
    </div>
  );
}

export default App;
