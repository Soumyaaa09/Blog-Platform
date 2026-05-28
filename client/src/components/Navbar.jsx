import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/50 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >

      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        <Link
          to="/"
          className="text-4xl font-black text-white"
        >
          ✦ Inkwell
        </Link>

        <div className="hidden md:flex items-center gap-10">

         <Link
  to="/explore"
  className="text-gray-300 hover:text-cyan-400 transition"
>
  Explore
</Link>

<Link
  to="/categories"
  className="text-gray-300 hover:text-cyan-400 transition"
>
  Categories
</Link>

<Link
  to="/dashboard"
  className="text-gray-300 hover:text-cyan-400 transition"
>
  Dashboard
</Link>

        </div>

        <div className="flex items-center gap-5">

          <Link
            to="/login"
            className="text-gray-300 hover:text-white"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;