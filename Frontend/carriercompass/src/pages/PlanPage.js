import React, { useEffect } from "react";
import PlansHeroSection from "../components/PlansPage/Plans";
import PlansTable from "../components/PlansPage/PlanTable";
import { useNavigate } from "react-router-dom";

const PlanPage = () => {  
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
      <PlansHeroSection />
      <PlansTable />
    </div>
  );
};

export default PlanPage;
