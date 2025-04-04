import React, { useEffect } from "react";
import PlansHeroSection from "../components/PlansPage/Plans";
import PlansTable from "../components/PlansPage/PlanTable";
import { useNavigate } from "react-router-dom";

const PlanPage = () => {  
  
  
  return (
    <div>
      <PlansHeroSection />
      <PlansTable />
    </div>
  );
};

export default PlanPage;
