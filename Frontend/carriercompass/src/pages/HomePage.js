import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import HowToUse from "../components/HomePage/HowToUse";
import AiToolFeatures from "../components/HomePage/Features";
import BottomHeader from "../components/HomePage/BottomHeader";
import ProfilePage from "./ProfilePage";

const HomePage = () => {

  return (
    <div>
      <HeroSection />
      <HowToUse />
      <AiToolFeatures />
      <BottomHeader />
      <ProfilePage />
    </div>
  );
};

export default HomePage;
