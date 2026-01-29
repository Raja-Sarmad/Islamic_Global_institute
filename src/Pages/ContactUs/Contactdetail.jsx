import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from 'sonner';
import axios from 'axios';

function ContactDetail() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      title: "Our Address",
      description: "H no R-107 Gulistan e Malir, Shah Faisal, Karachi, Pakistan",
      iconSrc: "/Frame 141.svg",
      iconAlt: "Address Icon",
    },
    {
      title: "Phone Number",
      description: "+92 3132661982",
      iconSrc: "/Frame 143.svg",
      iconAlt: "Phone Icon",
    },
    {
      title: "Email Address",
      description: "theislamicglobalinstitute456@gmail.com",
      iconSrc: "/Frame 142.svg",
      iconAlt: "Email Icon",
    },
    {
      title: "Working Hours",
      description: "Our customer representative team is available 24/7.",
      iconSrc: "/Frame 144.svg",
      iconAlt: "Clock Icon",
    },
  ];

  const handleEnrollNowClick = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate required fields
    if (!input1 || !input2 || !input3 || !message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Send the data to the backend API
      const response = await axios.post('/api/v1/contact', {
        name: input1,
        phone: input2,
        email: input3,
        message: message,
        type: 'contact_query'
      });

      if (response.data) {
        toast.success('Contact message sent successfully! We will get back to you soon.');
        // Reset form fields
        setInput1('');
        setInput2('');
        setInput3('');
        setMessage('');
      } else {
        toast.error(response.data.message || 'Failed to send contact message');
      }
    } catch (error) {
      console.error('Error sending contact message:', error);
      toast.error(error.response?.data?.message || 'Failed to send contact message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 sm:p-6 md:p-8 lg:px-10 xl:px-12 2xl:px-16">
      <form onSubmit={handleEnrollNowClick}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 mt-6">
          {/* Contact Info Section */}
          <div className="col-span-12 md:col-span-6 bg-white rounded-lg p-4 sm:p-6 lg:p-8 space-y-4 md:space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index}>
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-full flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center">
                    <img
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-semibold text-gray-800">
                      {item.title}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
                {index < contactInfo.length - 1 && (
                  <hr className="border-gray-300 mt-3 md:mt-5" />
                )}
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="col-span-12 md:col-span-6 mt-4 md:mt-0 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col w-full gap-y-4 sm:gap-y-6">
              {/* Name Input */}
              <div className="flex items-center bg-white p-2 sm:p-3 w-full rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src="/solar_user-linear.png" alt="User Icon" />
                <hr className="h-7 border-[#9F9F9F] border mx-2" />
                <input
                  type="text"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder="Name"
                  className="p-1 sm:p-2 rounded-full text-gray-700 w-full outline-none"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="flex items-center bg-white p-2 sm:p-3 w-full rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <PhoneInput
                  country="gb"
                  value={input2}
                  onChange={(phone) => setInput2(phone)}
                  inputClass="text-gray-700 rounded-full w-full outline-none border-none"
                  buttonClass="rounded-full"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="flex items-center bg-white p-2 sm:p-3 w-full rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src="/Frame 33.svg" alt="Email Icon" />
                <hr className="h-7 border-[#9F9F9F] border mx-2" />
                <input
                  type="email"
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                  placeholder="Email"
                  className="p-1 sm:p-2 rounded-full text-gray-700 w-full outline-none"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div className="relative mb-3 rounded-2xl pt-3 px-2 shadow-md hover:shadow-lg transition-shadow duration-300">
                <textarea
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none"
                  rows="4"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-8 md:mt-10">
              <button
                type="submit" // Ensure it triggers form submission
                disabled={loading}
                className="bg-[#FFD050] font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 w-3/4 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ContactDetail;
