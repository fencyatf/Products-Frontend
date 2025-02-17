import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products';
import Footer from './components/Footer';


const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to='/login' />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/products'>Products</Link>
            </li>
            <li className='nav-item'>
              {!isAuthenticated ? (
                <Link className='nav-link' to='/login'>Login</Link>
              ) : (
                <button onClick={handleLogout} className='nav-link btn btn-link'>Logout</button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/products' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Products />
          </ProtectedRoute>
        }/>
      </Routes>
      
      <Footer />
    </Router>
  );
};



export default App;
