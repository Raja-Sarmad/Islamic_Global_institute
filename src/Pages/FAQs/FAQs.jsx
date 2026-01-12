import React from 'react'
import FAQsSection from './FAQsSection'
import FreeTrail from '../AboutUs/FreeTrail';
import Footer from '../../Components/Footer';
import FAQsdetail from './FAQsdetail';

function FAQs() {
  return (
    <>
      <FAQsSection />
      <FAQsdetail/>
      <div className="px-4 md:px-10">
        <FreeTrail/>
      </div>
      <Footer/>
    </>
  );
}

export default FAQs