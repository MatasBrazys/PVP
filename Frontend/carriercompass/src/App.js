import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/General/Header";
import Footer from "./components/General/footer";
import Copyright from "./components/General/copyright";
import Home from "./pages/HomePage";
import CVDraganddrop from "./pages/dragAndDropPage";
import ToolPlans from "./pages/PlanPage";
import ResultPageLayout from "./pages/LayoutPages/ResultsPage";
import CVRecommendationsPage from "./pages/ToolPages/CVRecommendationsPage";
import JobsPage from "./pages/ToolPages/JobsPage";
import Courses from "./pages/ToolPages/CoursesPage";
import Login from "./components/Login/LoginPage";
import Reg from "./components/Register/RegisterPage";

function Layout() {
  const location = useLocation();
  const isResultsPage = location.pathname.startsWith("/results");
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
    <div className={`App ${isResultsPage ? "with-sidebar" : ""}`}>
      <Header />
      <div className={`layout ${isResultsPage ? "with-sidebar-layout" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragAndDrop" element={<CVDraganddrop />} />
          <Route path="/Plan" element={<ToolPlans />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />
          {isResultsPage ? (
            <Route path="/results" element={<ResultPageLayout />}>
              <Route index element={<CVRecommendationsPage />} />
              <Route path="CVRecommendationsPage" element={<CVRecommendationsPage />} />
              <Route path="JobsPage" element={<JobsPage />} />
              <Route path="Courses" element={<Courses />} />
            </Route>
          ) : null}
        </Routes>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider> {/* Move LanguageProvider outside of Router */}
      <Router>
        <Layout />
      </Router>
    </LanguageProvider>
  );
}

export default App;
