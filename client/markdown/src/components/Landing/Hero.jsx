import React from "react";
import heroGIF from "../../Images/heroImage2.gif";
import Navbar from "../NavBar/Navbar";
import "./hero.css";
import { Typewriter } from "react-simple-typewriter";
import { Pencil, PencilLineIcon } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col bg-zinc-200 min-h-screen text-black h-[100%] justify-between">
      <div className="h-[20%]">{/* <Navbar /> */}</div>

      <div className="flex justify-center mt-10 items-center h-[80vh] flex-col">
        <div className="flexw-[100%] h-[50%] align-middle justify-center">
          <h1 className="flex text-4xl font-outfit font-extralight mt-12 title">
            CollabMD
          </h1>
        </div>
        <div className="text-black text-lg absolute font-outfit font-thin uppercase mt-2 heroDiv">
          <Typewriter
           words={[
  "Simplify your format process",
  "Your texts, our syntax",
  "Redefining markdown editing",
  "Write together, in real time",
]}

            loop={0}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </div>

      <div className="flex w-full bg-black items-center justify-center h-16">
        <button className="flex text-zinc-400 text-2xl text-center hover:bg-zinc-500 p-3 hover:text-white"><PencilLineIcon size={18} className="flex mr-3 mt-2"/><a href="/login"> Start writing</a></button>
      </div>
    </div>
  );
};

export default Hero;
