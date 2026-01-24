import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Courses from './Pages/Courses';
import FAQs from './Pages/FAQs/FAQs';
import Home from './Pages/Home';
import Pricing from './Pages/Pricing/Pricing';
// import Modal from './Components/Modal';









import './App.css';
function App() {
  return (
    <Router>
      {/* Navbar will be present on all pages */}
      <Navbar />

      {/* Define routes for each page */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/faqs' element={<FAQs />} />
        {/* <Route path="/inputmodal" element={<Modal/>} /> */}
        {/* <Route path='/blogs' element={<Blogs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
