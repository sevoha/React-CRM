import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Customers from './components/Customers';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddCustomer from './components/AddCustomer';
import UpdateCustomer from './components/UpdateCustomer';

function App() {
  return (
    <div className="App">
      <Router>
        <Logo />
        <Routes>
          <Route path='/' element={<Customers/>}></Route>
          <Route path='/add-customer' element={<AddCustomer/>}></Route>
          <Route path='/update-customer/:id' element={<UpdateCustomer/>}></Route>
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
