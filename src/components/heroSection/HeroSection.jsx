
import { Typography } from "@material-tailwind/react";
import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import logo from "../../assets/logo.png";

function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <section
      style={{
        background: mode === "dark" ? "rgb(30, 41, 59)" : "#30336b", // Background color for both modes
      }}
      className="relative py-24"
    >
      {/* Hero Section */}
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col text-center">
        {/* Main Content */}
        <main>
          <div className="mb-8">
            {/* Image */}
            <div className="flex justify-center">
              <img
                className="w-48 h-48 rounded-full border-6 border-white shadow-xl transform hover:scale-110 transition-transform duration-300"
                src={logo}
                alt="BlogVerse Logo"
              />
            </div>
            <h1 className="text-5xl sm:text-6xl text-white font-extrabold mt-6 drop-shadow-xl">
              BlogVerse
            </h1>
          </div>

          <p
            className="sm:text-3xl text-xl text-white font-extralight sm:mx-auto mt-4 max-w-3xl mx-auto"
          >
            "Explore the World, One Adventure at a Time."
          </p>

          <div className="mt-8">
            <button
              className="mt-6 px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg shadow-xl hover:bg-gradient-to-l transition-all duration-300"
            >
              Join the Adventure
            </button>
          </div>
        </main>
      </div>

      {/* Background Overlay for extra contrast */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </section>
  );
}

export default HeroSection;
