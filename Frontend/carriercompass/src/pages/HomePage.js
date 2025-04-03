import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HomePage/HeroSection";
import HowToUse from "../components/HomePage/HowToUse";
import AiToolFeatures from "../components/HomePage/Features";
import BottomHeader from "../components/HomePage/BottomHeader";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
      const verifyToken = async () =>{
           const token = localStorage.getItem('token');
              console.log("Token from localStorage:",token)
          
              if (!token) {
                // If no token, redirect immediately
                navigate('/login');
                return;
              }
              
          try{
              const response = await fetch(`http://localhost:8000/user/verify-token/${token}`);
              console.log("a:", response)
              if(!response.ok){
                  throw new Error('Token verification failed');

              }
              
          }catch(error){
              localStorage.removeItem('token');
              navigate('/login');   
          }
      };
      verifyToken();
  }, [navigate]);

  return (
    <div>
      <HeroSection />
      <HowToUse />
      <AiToolFeatures />
      <BottomHeader />
    </div>
  );
};

export default HomePage;
