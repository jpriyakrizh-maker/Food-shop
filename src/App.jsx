import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollyCanvas from './components/animations/ScrollyCanvas';
import FloatingPlate from './components/animations/FloatingPlate';
import About from './components/About';
import Dishes from './components/Dishes';
import SearchRecipes from './components/SearchRecipes';
import UserProfile from './components/UserProfile';
import { ChefHat, Search, User as UserIcon } from 'lucide-react';

const App = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Turn header opaque only after leaving the hero section (~80% scroll)
            setScrolled(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<main className="text-black selection:bg-orange-500 selection:text-white scroll-smooth transition-colors duration-500">
      {/* Dynamic Top Gradient for readability at scroll 0 */}
      <div className={`fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent z-[90] pointer-events-none transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}/>

      {/* Navigation Header - Adaptive Pill Design */}
      <nav className={`fixed left-1/2 -translate-x-1/2 z-[100] flex justify-between items-center transition-all duration-700 ease-[0.19, 1, 0.22, 1] ${scrolled
            ? 'top-6 w-[90%] md:w-[60%] bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-4 px-8 rounded-full'
            : 'top-0 w-full bg-transparent border-transparent py-6 px-12 rounded-none'}`}>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ChefHat className={`transition-all duration-500 ${scrolled ? 'text-orange-500' : 'text-white'}`} size={scrolled ? 24 : 32}/>
          <span className={`text-2xl md:text-3xl logo-font tracking-tight flex items-center transition-colors duration-500 ${scrolled ? '' : 'text-white'}`}>
            <span className="text-orange-500">Noodle</span>
            <span className={`${scrolled ? 'text-gray-900' : 'text-white/90'} ml-2`}>Artistry</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#recipe-search" className={`text-[10px] font-bold transition-all duration-500 flex items-center gap-2 uppercase tracking-[0.2em] ${scrolled ? 'text-gray-400 hover:text-orange-500' : 'text-white/80 hover:text-white'}`}>
            <Search size={14}/> Recipes
          </a>
          <a href="#user-profile" className={`text-[10px] font-bold transition-all duration-500 flex items-center gap-2 uppercase tracking-[0.2em] ${scrolled ? 'text-gray-400 hover:text-orange-500' : 'text-white/80 hover:text-white'}`}>
            <UserIcon size={14}/> Profile
          </a>
          <button className={`transition-all duration-500 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 ${scrolled
            ? 'bg-orange-500 text-white px-8 py-3 shadow-lg shadow-orange-500/20'
            : 'bg-white text-orange-500 px-10 py-4 hover:shadow-2xl shadow-white/10'}`}>
            Experience
          </button>
        </div>
      </nav>

      {/* Cinematic Scrollytelling Section */}
      <section className="relative z-10">
        <ScrollyCanvas />
      </section>

      {/* Flying Plate Transition */}
      <FloatingPlate />
      {/* About Section - Integrated with the transition */}
      <About />

      {/* Signature Dishes - Higher z-index to cover fixed hero elements */}
      <section id="dishes" className="relative z-30 py-20 bg-white">
        <div className="section-divider opacity-50 mb-20"/>
        <Dishes />
      </section>

      {/* Decorative Transition 1: ESSENCE */}
      <div className="relative h-[40vh] bg-white overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="section-divider opacity-30"/>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="relative">
          <div className="absolute inset-0 blur-[100px] bg-orange-500/5 rounded-full"/>
          <h2 className="text-[15vw] font-black text-gray-900/[0.03] italic leading-none tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            FRESH
          </h2>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-orange-500/50 to-transparent"/>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600">Made Fresh Every Day</p>
        </div>
      </div>

      {/* Recipe Management System */}
      <section id="recipe-search" className="relative z-30 py-20 luxury-blur">
        <SearchRecipes />
      </section>

      {/* Decorative Transition 2: CRAFT */}
      <div className="relative h-[40vh] bg-white overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="section-divider opacity-30"/>
        <motion.div animate={{ rotate: [0, 1, -1, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="relative">
          <div className="absolute inset-0 blur-[120px] bg-orange-500/10 rounded-full"/>
          <h2 className="text-[15vw] font-black text-gray-900/[0.03] italic leading-none tracking-tighter" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            TASTY
          </h2>
        </motion.div>
      </div>

      {/* User Preferences */}
      <section id="user-profile" className="relative z-30 py-20 bg-white">
        <UserProfile />
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-30 py-40 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative p-12 md:p-24 rounded-[3rem] text-center overflow-hidden bg-white border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]">
            {/* Subtle background texture or detail */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-900/[0.01] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"/>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="relative z-10">
              <div className="flex flex-col items-center gap-6 mb-12">
                <ChefHat size={32} className="text-orange-600"/>
                <div className="h-px w-20 bg-orange-200"/>
              </div>

              <h2 className="text-5xl md:text-7xl mb-12 tracking-tighter text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                Get Offers & <span className="italic text-gray-400">New Dishes</span>
              </h2>

              <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.4em] max-w-xl mx-auto mb-20 leading-loose">
                Get discount coupons and new menu updates on your phone.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-10">
                <input type="email" placeholder="Enter your email" className="w-full md:flex-grow bg-gray-50/50 border border-gray-100 rounded-2xl py-6 px-10 text-gray-900 focus:outline-none focus:border-orange-200 transition-all font-light placeholder:text-gray-300"/>
                <button className="w-full md:w-auto px-12 py-6 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-orange-500 transition-all shadow-xl active:scale-95">
                  Subscribe
                </button>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-300">No spam. Only tasty offers.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Editorial Footer */}
      <footer className="relative z-30 pt-40 pb-20 bg-gray-50 border-t border-gray-100 px-6 md:px-12">
        <div className="max-w-wide mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 md:gap-12 mb-32">

          {/* Brand Pillar */}
          <div className="md:col-span-5 space-y-10">
            <div className="flex items-center gap-3">
              <ChefHat size={32} className="text-orange-500"/>
              <span className="text-3xl logo-font transition-colors duration-500">
                <span className="text-orange-500">Noodle</span>
                <span className="text-gray-900 ml-2">Artistry</span>
              </span>
            </div>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Fresh noodles, rice bowls and street-style favourites, cooked to order with real ingredients. Dine in, take away, or order online.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (<a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-orange-500 transition-colors">
                  {social}
                </a>))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900">Our Menu</h4>
            <ul className="space-y-4">
              {['Signature Dishes', 'Noodles & Rice', 'Starters & Snacks', 'Drinks & Desserts'].map((item) => (<li key={item}>
                  <a href="#" className="text-gray-400 text-sm font-light hover:text-orange-500 transition-colors">{item}</a>
                </li>))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900">Order</h4>
            <ul className="space-y-4">
              {['Order Online', 'Table Booking', 'Offers & Combos', 'Gift Cards'].map((item) => (<li key={item}>
                  <a href="#" className="text-gray-400 text-sm font-light hover:text-orange-500 transition-colors">{item}</a>
                </li>))}
            </ul>
          </div>

          {/* Contact Node */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-900">Visit Us</h4>
            <p className="text-gray-400 text-sm font-light">
  hello@noodleartistry.com<br />
  +91 987654321<br />
  Open daily • 10 AM – 10 PM<br />
  Anna Nagar, Madurai
</p>
<div className="pt-4">
  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-orange-600">OPEN DAILY</span>
</div>
          </div>

        </div>

        {/* Legal & Credits Line */}
        <div className="max-w-wide mx-auto pt-16 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            &copy; 2026 Noodle Artistry. All rights reserved.
          </p>
          <div className="flex gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Usage'].map((legal) => (<a key={legal} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-gray-900 transition-colors">
                {legal}
              </a>))}
          </div>
        </div>
      </footer>
    </main>);
};
export default App;