import React from 'react';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/footer';
import Copyright from './components/copyright';
import Home from './pages/Home';

function App() {
  return (
    
    <div className="App">
      <Header />
      <Home />
      <Footer />
      <Copyright />
      
    </div>
    
  );
}

export default App;
