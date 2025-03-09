import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/General/Header';
import Footer from './components/General/footer';
import Copyright from './components/General/copyright';
import Home from './pages/HomePage';
import CVDraganddrop from './pages/dragAndDropPage';
import ToolPlans from './pages/PlanPage';


function App() {
  return (
    
    <Router>
      <div className="App">
        
        <Header />
        <div className="layout">
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dragAndDrop" element={<CVDraganddrop />} />
          <Route path="/Plan" element={<ToolPlans />} />
        </Routes>
        </div>
        </div>
        <Footer />
        <Copyright />
      </div>
    </Router>
    
  );
}

export default App;
