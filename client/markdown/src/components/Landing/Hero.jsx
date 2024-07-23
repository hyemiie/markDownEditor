import React from "react";
import heroGIF from "../../Images/heroImage2.gif";
import Navbar from "../NavBar/Navbar";
import './hero.css'

const Hero = () => {
  return (
    <div className="flex flex-col bg-black min-h-screen">
      <div className="h-[20%]">
        <Navbar />
      </div>

      <div className="herDiv flex bg-white flex-row items-center h-[100%] flex-grow">
        <div className="subHerDiv w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-5xl text-slate-600 mb-8">
            Simplify your format Process: Your Ideas, Your texts, Our Syntax
          </h2>
          <button className="heroBtn bg-blue-500 text-white py-4 px-8  mt-8 hover:bg-blue-600 transition-colors">
            <a href="/login">Get Started</a>
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Illustration by{" "}
            <a href="https://icons8.com/illustrations/author/Go8GMpKPAq1W" className="text-blue-500 hover:underline">
              Polina M.
            </a>{" "}
            from <a href="https://icons8.com/illustrations" className="text-blue-500 hover:underline">Ouch!</a>
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img src={heroGIF} alt="Hero illustration" className="w-4/5 max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;