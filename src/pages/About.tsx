import React from 'react';
import { Sparkles, ShieldCheck, Heart, Star, Leaf, Droplets } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F9] font-sans relative overflow-hidden selection:bg-pink-200 selection:text-pink-900">
      {/* Global Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-rose-100/30 rounded-full mix-blend-multiply filter blur-[60px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
            alt="Elegant Texture"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-[#FFF9F9]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full bg-white/80 backdrop-blur-sm border border-pink-100 text-pink-600 font-bold tracking-[0.3em] uppercase text-xs shadow-sm">
              Our Philosophy
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-medium text-gray-900 mb-8 leading-tight tracking-tight animate-fade-in-up animation-delay-200">
            The Heart of <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-400">JAANMAK</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Where uncompromising quality meets everyday elegance.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-12 md:p-20 shadow-xl shadow-pink-100/20 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-[100px] -mr-10 -mt-10 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-tr-[100px] -ml-10 -mb-10 opacity-50"></div>

            <div className="text-center max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-gray-900 mb-12 leading-snug">
                "Client-Driven Excellence: Our Commitment to Uncompromising Quality."
              </h2>

              <div className="prose prose-lg prose-pink mx-auto text-gray-600 font-light leading-loose">
                <p className="text-lg md:text-xl">
                  At <strong className="text-gray-900 font-medium">JAANMAK</strong>, we are fundamentally defined by one metric: <span className="text-pink-600 font-medium italic">client satisfaction</span>.
                  We operate on the belief that the essentials of your daily life—from the moment you wake to the state of your home—deserve an uncompromising standard of quality.
                </p>
                <p className="mt-6 text-lg md:text-xl">
                  Our mission is to meet your highest expectations by delivering verified performance and value across every category we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Cards Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Skincare Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-white rounded-[3rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-50"></div>
              <div className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-lg shadow-pink-100/30 border border-pink-50 h-full transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-serif font-medium text-gray-900 mb-6">Scientific Rigor</h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  We apply the same scientific rigor to our premium skincare, ensuring radiance, elegance, magnetic attractiveness, and long-term health, as we do to the expert processing of our cereals.
                </p>
                <div className="mt-8 flex gap-2">
                  <span className="px-4 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full uppercase tracking-wider">Radiance</span>
                  <span className="px-4 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full uppercase tracking-wider">Health</span>
                </div>
              </div>
            </div>

            {/* Home Care Card */}
            <div className="group relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white rounded-[3rem] transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500 opacity-50"></div>
              <div className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-lg shadow-orange-100/30 border border-orange-50 h-full transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-serif font-medium text-gray-900 mb-6">Unified Standard</h3>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  This unified standard extends to our powerful household cleaning products, guaranteeing a safe, spotless, and comfortable environment without sacrificing strength or safety.
                </p>
                <div className="mt-8 flex gap-2">
                  <span className="px-4 py-1 bg-orange-50 text-orange-500 text-xs font-bold rounded-full uppercase tracking-wider">Safety</span>
                  <span className="px-4 py-1 bg-orange-50 text-orange-500 text-xs font-bold rounded-full uppercase tracking-wider">Comfort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-3 text-pink-400 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-medium text-gray-900 mb-10 leading-tight">
            "Quality is never accidental; it is our established, professional guarantee."
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
            We enforce precision in every lab and facility to eliminate doubt and ensure your continued trust. You ask for the best; we deliver it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-gray-900 text-lg mb-2">Natural Origins</h4>
              <p className="text-sm text-gray-500">Sourced from the finest ingredients</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Droplets className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-gray-900 text-lg mb-2">Pure Formulation</h4>
              <p className="text-sm text-gray-500">No harmful additives or fillers</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 mx-auto mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-gray-900 text-lg mb-2">Client Focused</h4>
              <p className="text-sm text-gray-500">Driven entirely by your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 clip-path-curve"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">Experience the certainty of <br />uncompromising quality today.</h2>
          <p className="text-gray-300 mb-12 text-xl font-light max-w-2xl mx-auto">Secure your essentials and begin your upgraded routine now.</p>
          <a href="/#/skincare" className="inline-flex items-center px-12 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-white/10 text-lg group">
            Shop Collection <Sparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;