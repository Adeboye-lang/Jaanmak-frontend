import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#FFF9F9] relative overflow-hidden selection:bg-pink-200 selection:text-pink-900">
      {/* Global Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-rose-100/30 rounded-full mix-blend-multiply filter blur-[60px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <section className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-90" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-pink-900/10 to-[#FFF9F9]"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-10"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-6 px-6 py-2 bg-white/80 backdrop-blur-md border border-pink-100 rounded-full shadow-[0_10px_30px_rgba(255,182,193,0.4)]">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-pink-600">Welcome to Jaanmak</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium font-serif text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
            The Certainty of <br />
            <span className="italic text-pink-50 font-light">Uncompromising Quality</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
            Premium Skincare, Trusted Cleaning Solutions, and Nourishing Food.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/skincare">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold rounded-full shadow-[0_10px_30px_rgba(255,105,180,0.4)] hover:shadow-[0_15px_40px_rgba(255,105,180,0.6)] transition-all duration-300"
              >
                Shop Skincare
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white/20 backdrop-blur-md border border-white/60 text-white font-semibold rounded-full transition-all duration-300"
              >
                Our Story
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >

            <span className="block text-pink-500 font-bold tracking-[0.2em] uppercase text-sm mb-2">The Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mb-4">Our Offerings</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-200 to-rose-200 mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {/* Skincare Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] md:h-[600px] min-w-[85vw] md:min-w-0 rounded-[2.5rem] overflow-hidden shadow-2xl snap-center"
            >
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"
                alt="Skincare"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                  <Sparkles className="w-6 h-6 text-pink-200" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-medium mb-3">Skincare</h3>
                <p className="text-white/80 font-light mb-8 leading-relaxed">
                  Radiance, elegance, and magnetic attractiveness designed for your skin.
                </p>
                <Link to="/skincare" className="inline-flex items-center text-sm font-bold tracking-widest uppercase border-b border-pink-400 pb-1 hover:text-pink-300 transition-colors">
                  Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Household Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] md:h-[600px] min-w-[85vw] md:min-w-0 rounded-[2.5rem] overflow-hidden shadow-2xl snap-center"
            >
              <img
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1000&auto=format&fit=crop"
                alt="Household"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-medium mb-3">Household Cleaning</h3>
                <p className="text-white/80 font-light mb-8 leading-relaxed">
                  Powerful, safe, and spotless environment for your sanctuary.
                </p>
                <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase border border-white/30">
                  Coming Soon
                </span>
              </div>
            </motion.div>

            {/* Nourishment Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] md:h-[600px] min-w-[85vw] md:min-w-0 rounded-[2.5rem] overflow-hidden shadow-2xl snap-center"
            >
              <img
                src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1000&auto=format&fit=crop"
                alt="Nourishment"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-medium mb-3">So Much Food</h3>
                <p className="text-white/80 font-light mb-8 leading-relaxed">
                  Expert processing for sustained energy and delicious taste.
                </p>
                <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase border border-white/30">
                  Coming Soon
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Final CTA */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50 opacity-80"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>

        {/* Decorative Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/20 rounded-full mix-blend-multiply filter blur-[100px]"
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="relative z-10 max-w-4xl mx-auto text-center px-4"
        >
          <motion.h2
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-4xl md:text-6xl font-serif font-medium text-pink-950 mb-8 leading-tight"
          >
            Experience the certainty of <br />
            <span className="italic text-pink-600">uncompromising quality</span> today.
          </motion.h2>
          <motion.p
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="text-pink-900/70 mb-12 text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Secure your essentials and begin your upgraded routine now.
          </motion.p>
          <Link to="/skincare">
            <motion.button
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-full shadow-[0_10px_30px_rgba(255,105,180,0.3)] hover:shadow-[0_20px_40px_rgba(255,105,180,0.5)] transition-all duration-300 text-lg group"
            >
              Shop Collection <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
