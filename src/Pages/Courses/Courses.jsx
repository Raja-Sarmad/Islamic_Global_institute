import React, { useState } from "react";
import Card from "./Card";
import Modal from "../../Components/Modal";

const Courses = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const courses = [
    {
      title: "Qaida with Tajweed",
      description:
        "This course is a great starting point for children learning the Quran. By the end, students will recognize and pronounce Arabic letters, grasp basic rules, and connect letters accurately.",
      buttonText: "Enroll Now",
      icon: "/card-logo-Quran.svg",
    },
    {
      title: "Quran With Tajweed",
      description:
        "Learn to read the Quran online with personalized lessons, guided by experienced tutors.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153732.svg",
    },
    {
      title: "Quran Memorization (HIFZ) Online",
      description:
        "Explore Quran reading with Tafseer to deepen your understanding of the verses.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153733.svg",
    },
    {
      title: "Quran English Translation",
      description:
        "Discover the essence of Islamic teachings through our online courses.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153734.svg",
    },
    {
      title: "Taleem ul Islam in English",
      description:
        "Learn to read the Quran online with personalized lessons.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153735.svg",
    },
    {
      title: "Taleem ul Islam in Urdu",
      description:
        "Learn to read the Quran online with personalized lessons.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153735.svg",
    },
    {
      title: "Quran Urdu Tafseer",
      description:
        "Master Quran reading with Tajweed through our online classes.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Ghusl Wudhu Salah in English",
      description:
        "Learn essential Islamic practices in an easy and engaging way.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "40 Hadiths for Kids",
      description:
        "Stories based learning for kids to understand Hadiths.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Respectful Children in Islam",
      description:
        "Teach children Islamic manners and values.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
    {
      title: "Essential Duas for Kids",
      description:
        "Daily Duas explained simply for kids.",
      buttonText: "Enroll Now",
      icon: "/Frame 1261153736.svg",
    },
  ];

  // Open modal
  const handleCardClick = (index) => {
    setActiveCardIndex(index);
    setIsModalOpen(true);
  };

  // Close modal (single source of truth)
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveCardIndex(null);
  };

  return (
    <>
      <section>
        {/* Hero */}
        <div className="relative">
          <img src="/Group 12.png" alt="Courses" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
            <h1 className="font-semibold text-4xl md:text-6xl text-[#1A1A1A]">
              Courses
            </h1>
            <p className="text-[#1A1A1A] text-2xl md:text-4xl font-medium mt-2">
              What We Offer
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={course.description}
              icon={course.icon}
              buttonText={course.buttonText}
              isActive={activeCardIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          course={courses[activeCardIndex]}
        />
      </section>
    </>
  );
};

export default Courses;
