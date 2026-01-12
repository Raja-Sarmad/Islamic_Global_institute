import React  from "react";
import FeesPlans from "./FeesPlans";
import FreeTrail from "../AboutUs/FreeTrail";
import Footer from "../../Components/Footer";

function Pricing() {

  return (
    <>
      <section className="relative bg-gray-100">
        <div className="flex justify-between">
          <div className="relative w-1/2">
            <img
              src="/image (2).png"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative w-1/2">
            <img
              src="/image (3).png"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <h1 className="absolute inset-0 flex items-center justify-center font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-7xl text-[#1A1A1A]">
          Pricing
        </h1>
      </section>
      <FeesPlans />
      <div className="px-4 md:px-10">
        <FreeTrail />
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
