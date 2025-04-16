import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/General/Header";
import Footer from "./components/General/footer";
import Copyright from "./components/General/copyright";
import Home from "./pages/HomePage";
import CVDraganddrop from "./pages/dragAndDropPage";
import ToolPlans from "./pages/PlanPage";
import ResultPageLayout from "./pages/PagesWithNavigationMenu/ResultsPageLayout";
import CVRecommendationsPage from "./pages/ToolPages/CVRecommendationsPage";
import JobsPage from "./pages/ToolPages/JobsPage";
import Courses from "./pages/ToolPages/CoursesPage";
import Login from "./components/Login/LoginPage";
import Reg from "./components/Register/RegisterPage";
import JobListing from "./components/ResultPage/JobListingPage";
import ProfileLayout from "./pages/PagesWithNavigationMenu/ProfilePageLayout";
import ProfileDataPage from "./pages/ProfileRoutePages/ProfileDataPage";
import ProfileEditPage from "./pages/ProfileRoutePages/ProfileEditPage";


function Layout() {
  const location = useLocation();
  const isResultsPage = location.pathname.startsWith("/results");

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
          

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfileDataPage />} />
            <Route path="user-data" element={<ProfileDataPage />} />
            <Route path="edit-profile" element={<ProfileEditPage />} />
            {/* <Route path="billing" element={<BillingPage />} /> */}
          </Route>

          {isResultsPage ? (
            <Route path="/results" element={<ResultPageLayout />}>
              <Route index element={<CVRecommendationsPage />} />
              <Route path="CVRecommendationsPage" element={<CVRecommendationsPage />} />
              <Route path="JobsPage" element={<JobsPage />} />
              <Route path="Courses" element={<Courses />} />
              <Route path="jobs/:id_Jobs" element={<JobListing />} />
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
