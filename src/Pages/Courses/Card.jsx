import React from "react";

const Card = ({
  title,
  description,
  icon,
  isActive,
  buttonText,
  onClick, // Accept the onClick function as a prop
}) => {
  return (
    <>
      <div className="relative flex flex-col justify-between h-full sm:px-5 px-5">
        {/* Icon Section */}
        <div className="flex items-center justify-center translate-y-12 z-20 relative">
          <img src={icon} alt={`${title} Icon`} className="w-100 h-100" />
        </div>

        {/* Card Content */}
        <div className="bg-white shadow-lg rounded-[30px_30px_0px_0px] p-5 flex-grow">
          <div className="flex justify-end items-start w-full">
            <img src="/Card-right.png" alt="" />
          </div>
          <div className="mt-2 text-center">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 mt-2 text-start">{description}</p>
          </div>
        </div>

        {/* Button Section with Green Hover */}
        <div
          className={`transition-transform transform hover:bg-[#1C8E5A] cursor-pointer p-2 z-10 ${
            isActive ? "bg-[#1C8E5A]" : "bg-[#E1E1E1]"
          }`}
          onClick={onClick} // Trigger modal toggle on click
        >
          <button className="px-4 py-2 text-white rounded-full flex items-center justify-center cursor-default">
            {buttonText}
            <span className="ml-2">&gt;&gt;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
