import React, { useState } from "react";
import Card from "./Card"; // Import the Card component
import Modal from "../../Components/Modal"; // Import the Modal component

const Courses = () => {
  // Set the first card as active by default (index 0)
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle card click to set active card and open modal
  const handleCardClick = (index) => {
    setActiveCardIndex(index);
    setIsModalOpen(true);
  };

  const courses = [
    {
      title: "Qaida with Tajweed",
      description:
        "This course is a great starting point for children learning the Quran. By the end, students will recognize and pronounce Arabic letters, grasp basic rules, and connect letters accurately, building a strong foundation for reading with correct pronunciation.",
      buttonText: "Enroll Now",
      icon: "/card-logo-Quran.svg",
    },
    {
      title: "Quran With Tajweed",
      description:
        "Learn to read the Quran online with personalized lessons, guided by experienced tutors. Our interactive platform helps you or your child build Quran reading skills with proper pronunciation and fluency from the comfort of home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153732.svg",
    },
    {
      title: "Quran Memorization (HIFZ) Online",
      description:
        "Explore Quran reading with Tafseer to deepen your understanding of the verses. Our online sessions provide clear explanations and insights, helping you connect with the teachings and wisdom of the Quran.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153733.svg",
    },
    {
      title: "Quran English Translation",
      description:
        "Discover the essence of Islamic teachings through our online courses. We offer a comprehensive platform to explore fundamental principles, values, and practices of Islam, fostering a deeper connection to your faith.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153734.svg",
    },
    {
      title: "Taleem ul Islam in English",
      description:
        "Learn to read the Quran online with personalized lessons, guided by experienced tutors. Our interactive platform helps you or your child build Quran reading skills with proper pronunciation and fluency from the comfort of home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153735.svg",
    },
    {
      title: "Quran Urdu Tafseer",
      description:
        "Master Quran reading with Tajweed through our online classes, designed to teach precise pronunciation and proper recitation techniques. Learn from expert tutors and enhance your understanding and fluency with ease from home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Ghusl Wudhu Salah in English",
      description:
        "Master Quran reading with Tajweed through our online classes, designed to teach precise pronunciation and proper recitation techniques. Learn from expert tutors and enhance your understanding and fluency with ease from home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "40 Hadiths in English for Kids with stories",
      description:
        "Master Quran reading with Tajweed through our online classes, designed to teach precise pronunciation and proper recitation techniques. Learn from expert tutors and enhance your understanding and fluency with ease from home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Respectful children in Islam",
      description:
        "Master Quran reading with Tajweed through our online classes, designed to teach precise pronunciation and proper recitation techniques. Learn from expert tutors and enhance your understanding and fluency with ease from home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Essential Dua`s for kids",
      description:
        "Master Quran reading with Tajweed through our online classes, designed to teach precise pronunciation and proper recitation techniques. Learn from expert tutors and enhance your understanding and fluency with ease from home.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
  ];

  return (
    <>
      <section>
        <div className="relative">
          <img
            src="/Group 12.png"
            alt="About-Us"
            className="max-w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-start px-4 md:px-16 mb-6 md:mb-0">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-7xl text-[#1A1A1A]">
              Courses
            </h1>
            <p className="text-[#1A1A1A] text-2xl md:text-4xl font-medium mt-4">
              What We Offer
            </p>
          </div>
        </div>

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-full">
          {courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={course.description}
              icon={course.icon}
              isActive={activeCardIndex === index} // Set active state based on the activeCardIndex
              onClick={() => handleCardClick(index)} // Update active card and open modal on click
              buttonText={course.buttonText}
            />
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        )}
      </section>
    </>
  );
};

export default Courses;
