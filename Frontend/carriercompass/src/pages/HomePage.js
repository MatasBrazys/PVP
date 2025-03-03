import React from "react";
import HeroSection from "../components/HeroSection";
import HowToUse from "../components/HowToUse";
import AiToolFeatures from "../components/Features";
import BottomHeader from "../components/BottomHeader";

const HomePage = () => {
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
