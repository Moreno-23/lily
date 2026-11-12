import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const handleScrollDown = () => {
    audioManager.playSfx('pop');
    const gardenEl = document.getElementById('garden');
    if (gardenEl) {
      gardenEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden"
    >
      {/* Delicate ambient radial background glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F4DCE0]/50 via-[#D8B978]/20 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Decorative botanical top flourish */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-12 h-px bg-[#D8B978]" />
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#672F43] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
          A Special Milestone Celebration
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
        </span>
        <span className="w-12 h-px bg-[#D8B978]" />
      </motion.div>

      {/* Centerpiece: Artistic Floral 29 Emblem */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Animated Butterfly 1 */}
        <motion.div
          animate={{
            x: [0, 18, -12, 0],
            y: [0, -15, 8, 0],
            rotate: [0, 10, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 -left-12 sm:-left-20 text-3xl sm:text-4xl filter drop-shadow-sm select-none"
        >
          🦋
        </motion.div>

        {/* Animated Butterfly 2 */}
        <motion.div
          animate={{
            x: [0, -14, 10, 0],
            y: [0, 12, -10, 0],
            rotate: [0, -12, 6, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute -bottom-6 -right-10 sm:-right-16 text-2xl sm:text-3xl filter drop-shadow-sm select-none"
        >
          🦋
        </motion.div>

        {/* Large Artistic Number 29 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-8 py-4"
        >
          {/* Subtle floral wreath framing the number */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D8B978]/40 animate-gentle-sway pointer-events-none" />

          <h2 className="font-serif text-8xl sm:text-9xl md:text-[11rem] font-bold tracking-tighter text-[#672F43] drop-shadow-sm leading-none flex items-center justify-center select-none">
            <span className="relative">
              2
              <span className="absolute -top-3 -left-3 text-2xl animate-spin [animation-duration:20s]">
                🌸
              </span>
            </span>
            <span className="relative -ml-3 sm:-ml-6">
              9
              <span className="absolute -bottom-2 -right-3 text-2xl animate-pulse">
                🌷
              </span>
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-4xl mx-auto mb-4"
      >
        <div className="font-serif text-xs sm:text-sm uppercase tracking-widest text-[#A6B59A] mb-1 font-semibold">
          Born on {BIRTHDAY_DATA.birthDateFormatted} • 29 Years of Radiance
        </div>
        <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl text-[#493126] font-semibold tracking-tight leading-tight">
          Happy 29th Birthday,{' '}
          <span className="font-script text-4xl sm:text-7xl md:text-8xl text-[#672F43] block sm:inline font-normal">
            {BIRTHDAY_DATA.sisterName}!
          </span>
        </h1>
        <p className="font-handwriting text-base sm:text-xl text-[#C98996] mt-1">
          (Yes, your ID says {BIRTHDAY_DATA.teaseName}, but you'll always be my Lilisha! 😉)
        </p>
      </motion.div>

      {/* Supporting Message */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-serif text-lg sm:text-2xl text-[#493126]/85 max-w-2xl mx-auto italic font-normal leading-relaxed mb-8"
      >
        "{BIRTHDAY_DATA.hero.subtitle}"
      </motion.p>

      {/* Small Brother's Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F4DCE0]/70 border border-[#D8B978]/40 shadow-sm text-sm text-[#672F43] font-handwriting text-xl sm:text-2xl"
      >
        <Heart className="w-4 h-4 fill-[#672F43] text-[#672F43]" />
        <span>{BIRTHDAY_DATA.hero.signature}</span>
      </motion.div>

      {/* Scroll Down Exploration Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 sm:mt-20 flex flex-col items-center"
      >
        <button
          type="button"
          onClick={handleScrollDown}
          className="group flex flex-col items-center text-[#672F43] hover:text-[#493126] transition-colors cursor-pointer"
          aria-label="Scroll down to explore the digital garden"
        >
          <span className="font-serif text-xs uppercase tracking-widest mb-2 group-hover:tracking-[0.25em] transition-all">
            {BIRTHDAY_DATA.hero.explorePrompt}
          </span>
          <div className="w-10 h-10 rounded-full border border-[#D8B978] flex items-center justify-center group-hover:bg-[#F4DCE0]/50 transition-all shadow-sm">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

