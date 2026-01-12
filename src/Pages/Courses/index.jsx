import React from "react";
import Courses from "./Courses";
import FreeTrail from "../AboutUs/FreeTrail";
import Footer from "../../Components/Footer";

function index() {
  return (
    <>
      <div>
        <Courses />
        <div className="px-4 md:px-10">
          <FreeTrail />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default index;
