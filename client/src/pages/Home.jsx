import React, { useEffect } from 'react'
import Navbar from './Navbar';
import TopFilters from './TopFilters';
import MainPage from './MainPage';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const token =  localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
    if(token == 'undefined'){
        navigate('/login')
    }
    },[])
  return (
    <div>
         <Navbar />
          <TopFilters/>
          <MainPage/>
    </div>
  )
}

export default Home