import React from "react";
import Svg from "./svgn2";

const ContactUs = () => {
  return (
    <section className="relative bg-green-khzy z-40 py-8 md:py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 hidden md:block"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 hidden md:block"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 hidden md:block"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 hidden md:block"></div>

      <h1
        className="text-3xl md:text-5xl text-yellow-gold flex z-20 gap-x-2 md:gap-x-4 items-center mb-8 md:mb-12 text-center"
        style={{ fontFamily: "font1, sans-serif" }}
      >
        <Svg className="w-6 h-6 md:w-8 md:h-8" /> Contact Us <Svg className="w-6 h-6 md:w-8 md:h-8" />
      </h1>

      <div className="w-full md:w-[600px] lg:w-[1600px] h-[250px] md:h-[400px] lg:h-[600px] border-2 md:border-3 border-yellow-gold1 overflow-hidden shadow-lg mb-8 md:mb-12">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d697.9268760282611!2d-5.894896770784759!3d35.006004782691136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0a4d8985cba1d7%3A0x1de0d2d25b307013!2sKsar%20El-K%C3%A9bir!5e0!3m2!1sfr!2sma!4v1742426578910!5m2!1sfr!2sma"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-20">
        <div className="w-full md:w-1/2 px-4 md:px-0">
          <p className="jdid text-xl md:text-3xl text-yellow-gold mb-2 text-center md:text-left">Write to us</p>
          <h1 className="text-2xl md:text-4xl lg:text-6xl text-yellow-gold flex z-20 gap-x-2 md:gap-x-4 items-center mb-8 md:mb-12 text-center md:text-left" style={{ fontFamily: "font1, sans-serif" }}>
            <Svg className="w-5 h-5 md:w-6 md:h-6" /> Contact Us <Svg className="w-5 h-5 md:w-6 md:h-6" />
          </h1>
          <form className="w-full max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Name"
              className="w-full border-2 border-yellow-gold p-3 mb-4 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-gold rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border-2 border-yellow-gold bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-gold rounded"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 mb-4 border-2 border-yellow-gold bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-gold rounded min-h-[120px]"
            ></textarea>
            <div className="flex justify-center md:justify-start">
            <button
              type="submit"
                className="px-8 py-3 border-2 border-yellow-gold text-yellow-gold hover:bg-yellow-gold hover:text-white transition-all rounded"
            >
              Send
            </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 px-4 md:px-0">
          <div className="container mt-8 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-gold text-center md:text-left">Additional Info</h2>
            <div className="space-y-2 md:space-y-3 text-center md:text-left">
              <p className="text-yellow-gold1">Address: Example Street, City, Country</p>
              <p className="text-yellow-gold1">Phone: +123 456 789</p>
              <p className="text-yellow-gold1">✉ Email: example@email.com</p>
            <p className="text-yellow-gold1">Business Hours: Mon - Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
