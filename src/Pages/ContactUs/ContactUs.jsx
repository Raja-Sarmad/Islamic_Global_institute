import React from 'react'
import ContactSection from './ConatctSection';
import FreeTrail from '../AboutUs/FreeTrail';
import Footer from '../../Components/Footer';
import Contactdetail from './Contactdetail';

function ContactUs() {
  return (
    <>
      <ContactSection />
      <Contactdetail/>
      <div className="px-4 md:px-10">
        <FreeTrail />
      </div>
      <Footer />
    </>
  );
}

export default ContactUs