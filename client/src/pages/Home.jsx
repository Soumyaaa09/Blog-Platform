import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

const Home = () => {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);

  return (
    <div className="bg-[#050816] text-white overflow-hidden">

      
      <section className="relative min-h-screen flex items-center px-10">

        
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px] rounded-full"></div>

        </div>

        
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          
          <div>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-green-400 font-semibold mb-6"
            >
              Now live • Spring 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-7xl md:text-8xl font-black leading-none mb-8"
            >
              Write Stories
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                {" "}That Feel Alive
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 text-xl leading-9 max-w-xl"
            >
              An immersive futuristic blogging platform for creators,
              developers, and storytellers.
            </motion.p>

            
            <div className="flex gap-6 mt-10">

              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold hover:scale-105 transition duration-300 shadow-[0_0_40px_rgba(127,90,240,0.5)]">
                Start Writing
              </button>

              <button className="px-8 py-4 rounded-2xl border border-gray-700 backdrop-blur-lg hover:bg-white/10 transition">
                Explore Blogs
              </button>

            </div>

          </div>

          
          <div className="relative h-[600px] hidden md:flex items-center justify-center">

            
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
            >

              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt=""
                className="rounded-2xl mb-5"
              />

              <span className="text-cyan-400 text-sm">
                Technology
              </span>

              <h2 className="text-2xl font-bold mt-3">
                The Future of AI Development
              </h2>

            </motion.div>

            
            <motion.div
              animate={{
                y: [0, 30, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
              }}
              className="absolute top-20 right-0 w-[250px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5"
            >

              <h3 className="text-xl font-bold mb-4">
                Trending Topics
              </h3>

              <div className="space-y-3 text-gray-300">

                <p># Artificial Intelligence</p>
                <p># Web Development</p>
                <p># Future Tech</p>
                <p># Startups</p>

              </div>

            </motion.div>

            
            <motion.div
              animate={{
                y: [0, -25, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-0 left-0 w-[220px] bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10 rounded-3xl p-5"
            >

              <h3 className="text-3xl font-black">
                12K+
              </h3>

              <p className="text-gray-400 mt-2">
                Active Creators
              </p>

            </motion.div>

          </div>

        </div>

      </section>

      
      <section className="py-32 px-10">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-black mb-20">
            Featured Blogs
          </h2>

          
          <div className="grid md:grid-cols-3 gap-10">

            {[1,2,3].map((item) => (

              <motion.div
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                }}
                key={item}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-cyan-400 transition duration-300"
              >

                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                  alt=""
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">

                  <span className="text-cyan-400">
                    AI & Technology
                  </span>

                  <h3 className="text-2xl font-bold mt-3 mb-4">
                    Building Modern Immersive Interfaces
                  </h3>

                  <p className="text-gray-400">
                    Explore futuristic UI design with animations,
                    glassmorphism, and 3D interactions.
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;