import React from 'react'
import Nav from '../share/Nav'
import HeroSection from '../share/HeroSection'
import CategoryCarousel from '../share/CategoryCarousel'
import LatestJobs from '../share/LatestJobs'
import Footer from '../share/Footer'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  // console.log("home page");
const {user} = useSelector(store=>store.auth)
const navigate = useNavigate()
  useEffect(()=>{
   if(user?.role == "recruiter"){
    navigate("/admin/companies")
   }
  })
  
  return (
    <div>
         <Nav/>
         <HeroSection/>
         <CategoryCarousel/>
         <LatestJobs/>
         <Footer/>
         </div>
  )
}

export default Home