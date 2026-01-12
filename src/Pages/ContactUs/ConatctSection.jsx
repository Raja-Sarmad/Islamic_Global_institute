import React from 'react'

function ContactSection() {
  return (
    <>
      <section className="relative bg-gray-100">
        <div className="">
          <div className="relative">
            <img
              src="/Frame 1261153746.png"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <h1 className="absolute inset-0 flex items-center justify-center font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-7xl text-[#1A1A1A] z-10">
          Contact US
        </h1>
      </section>
    </>
  );
}

export default ContactSection;