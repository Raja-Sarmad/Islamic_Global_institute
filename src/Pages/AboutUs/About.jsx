import React from 'react';
import FreeTrail from './FreeTrail';

function About() {
  const details = [
    {
      image: '/Frame 1261153708.png',
      title: 'Free Trial Classes for All',
      description:
        'We offer years of expertise in teaching the Quran online for the sake of Allah. Try a free class anytime—register for Skype lessons or contact us for a consultation!',
    },
    {
      image: '/Frame 1261153708.png',
      title: 'Flexible Schedule',
      description:
        'Quran Online Academy offers high-quality Quran classes in an engaging digital setting, allowing you and your family to learn from home. Our tutors are available 24/7 to support your journey.',
    },
    {
      image: '/Frame 1261153708.png',
      title: 'One-to-One Classes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: '/Frame 1261153708.png',
      title: 'Multilingual Teachers',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ];

  return (
    <>
      <section>
        <div className='relative flex flex-col md:flex-row justify-center items-center'>
          {/* Image Container */}
          <div className='w-full relative flex justify-center md:justify-end'>
            <img
              src='/Frame 1261153740.png'
              alt='About-Us'
              className='w-full h-auto object-cover'
            />

            {/* Text Overlay */}
            <div className='absolute inset-0 flex flex-col justify-center items-start text-start px-4 md:px-16 mb-6'>
              <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-7xl text-[#1A1A1A]'>
                About Us
              </h1>
              <p className='text-[#1A1A1A] text-lg sm:text-xl md:text-2xl font-medium mt-2 sm:mt-4'>
                Islamic Global Institute
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 pt-10 px-4 md:px-16 gap-8 md:gap-16 lg:gap-20 xl:gap-20 2xl:gap-20 '>
          <div className='col-span-12 md:col-span-8'>
            <h1 className='font-medium text-[#1C8E5A] text-3xl md:text-4xl'>
              Islamic Global Institute
            </h1>
            <p className='font-normal text-base md:text-lg text-[#333333] mt-4 '>
              Islamic Global Institute is dedicated to providing high-quality
              Quranic education to students worldwide, emphasizing the profound
              meanings and wisdom behind every holy word revealed by Allah.
              Recognized globally for our outstanding online teaching standards
              and comprehensive student support, our experienced tutors hold
              authentic degrees and Ijazah certifications to ensure reliable and
              knowledgeable instruction. We believe that Quranic knowledge has
              the power to transform lives. For years, we've been committed to
              making Quran education accessible to those who may lack
              opportunities in their region, especially for learning with proper
              Tajweed. Our mission is rooted in the concept of Sadqa-e-Jariah (a
              form of ongoing charity) through the spread of true Islamic
              knowledge. Our online Quran learning programs are structured to
              cater to various needs and proficiency levels, from basic to
              advanced courses in Tajweed, Tafseer, and memorization. Designed
              for all age groups, we offer flexible learning options, including
              both group and one-on-one sessions, ensuring that each student
              receives personalized attention and a fulfilling learning
              experience.
            </p>
          </div>
          <div className='col-span-12 md:col-span-4 flex md:justify-end'>
            <img src='/Group 9.png' alt='' className='max-w-full h-auto' />
          </div>
        </div>
        <div className='pt-10 flex flex-col justify-center items-center gap-3 px-4 md:px-16'>
          <h2 className='text-[#1C8E5A] text-lg md:text-xl text-center font-medium'>
            Why Study with US
          </h2>
          <h1 className='font-medium text-xl md:text-2xl text-center'>
          Islamic Global Institute
          </h1>
          <p className='text-[#333333] font-normal text-base md:text-lg lg:text-xl'>
            We specialize in online Quran and Tajweed education, enabling you to
            integrate learning into your everyday routine seamlessly. Our
            innovative teaching approach offers an engaging and interactive
            experience, allowing students to deeply connect with their studies.
            With the support of our dedicated and knowledgeable tutors, you’ll
            receive guidance and encouragement at every step of your learning
            journey.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16'>
          {details.map((item, index) => (
            <div key={index} className='text-start'>
              <img src={item.image} alt='img' className='' />
              <h1 className='text-xl font-semibold mt-4'>{item.title}</h1>
              <p className='mt-2 text-[#333333] text-start'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className='px-4 md:px-10'>
          <FreeTrail />
        </div>
      </section>
    </>
  );
}

export default About;
