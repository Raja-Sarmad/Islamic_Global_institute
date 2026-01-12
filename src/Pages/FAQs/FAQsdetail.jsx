import React, { useState } from "react";

function FAQsdetail() {
  const faqs = [
    {
      title: "How can I enroll?",
      content:
        "To get started, simply click the “Enroll Now” button to fill out the online registration form. Provide your basic details, including your name, email address, and phone number, then select the course you wish to enroll now. Once you submit this information, your registration will be processed. After receiving your request, we will reach out to arrange a time for your free trial class. Additionally, we’ll guide you through our Quran teaching methods and share more about our organization.",
    },
    {
      title: "Do you offer a free trial?",
      content:
        "Yes, Learning Quran Institute offers a complimentary trial period. After enrollment, new students can experience our online teaching methods and services firsthand through our free trial classes. This trial is entirely free of charge.",
    },
    {
      title: "How can I learn Quran at home?",
      content:
        "Our business model revolves around online education. All you need is a stable internet connection and a compatible device such as an Android or iPhone, tablet, laptop, or computer (Windows or Mac). Learning online is simple and convenient via platforms like Skype, Google Meet, or Zoom. Once you or your child is registered and selects a specific class time, you just need to be online at that scheduled time to connect with our instructor. It’s a straightforward and accessible way to learn.",
    },
    {
      title:
        "How long will it take to learn to memorize Quran, read Quran, and Tajweed Quran?",
      content:
        "To excel in Quran reading and recitation, enroll in our Tajweed course, which spans 60 days. This course covers essential grammatical rules for pronouncing both heavy and light letters, as well as the correct sounds, articulation, and characteristics necessary for Quran reading. You will learn about Noon Saakin, Tanween, Meem Saakin, Qalqala, Laam, Raa, Madd, and how to properly stop at the end of words. The main objective of the Tajweed course is to deepen your understanding of the Quran, enabling you to grasp the teachings and meanings of the verses. Additionally, Tajweed clarifies Quranic rules and provides the foundational knowledge needed for accurate recitation. Your memorization speed will guide you in continuing with Hifz, which may take two years or more to achieve mastery.",
    },
    {
      title: "What happens if I couldn’t attend a lesson?",
      content:
        "If you are unable to attend a class due to unforeseen circumstances, please inform us at least 30 minutes before the class starts. Once regular classes conclude, our instructors will offer makeup sessions. Depending on availability, a different instructor may conduct your makeup class.",
    },
    {
      title: "Does “Learning Quran Institute” offer any discount?",
      content:
        "Yes, we offer a family discount if two or more members from the same household register with LQI. Additionally, special packages are available for new members to enhance their learning experience.",
    },
    {
      title: "At what age we can start?",
      content:
        "There is no specific age requirement for children to start learning the Holy Quran or enrolling in online Quran classes. Each child's cognitive development and the teaching methods employed can vary, allowing for flexibility in when they begin their Quranic education.",
    },
    {
      title: "How much will it cost to join Learning Quran Institute?",
      content:
        "Learning Quran Institute offers a more affordable alternative to traditional online education. Our Quran classes require payment only for the sessions you enroll in. The course fees cover all necessary materials and customer support, ensuring there are no hidden costs.",
    },
    // Add other FAQ items here
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 md:px-20  md:mt-16 mt-6">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div className="px-4 gap-4 md:px-10 bg-[#F6F6F6] rounded-md flex justify-between items-center">
            <div className="flex p-4 justify-between items-center w-full">
              <h1
                className={`font-normal text-base md:text-lg ${
                  openIndex === index ? "text-green-600" : "text-[#252525]"
                }`}
              >
                {faq.title}
              </h1>

              <img
                src="/icon-park-outline_down.svg"
                alt="icon-down"
                className="cursor-pointer transition-transform duration-300"
                onClick={() => toggleContent(index)}
                style={{
                  transform:
                    openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          </div>
          <hr className=" border border-[#000000] mt-4" />

          {openIndex === index && (
            <div className="px-12 py-4 mt-2 bg-gray-100 rounded-md">
              <p className="text-base md:text-lg text-[#333333]">
                {faq.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default FAQsdetail;
