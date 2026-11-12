import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, ArrowUp } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

interface GrandFinaleProps {
  onReplay: () => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({ onReplay }) => {
  const triggerGrandConfetti = () => {
    audioManager.playSfx('sparkle');
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#D8B978', '#672F43', '#F4DCE0', '#C98996', '#A6B59A'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleScrollToTop = () => {
    audioManager.playSfx('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="finale"
      className="relative min-h-screen py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Dreamy botanical garden background elements */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4DCE0]/40 to-[#FFF9F0] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        
        {/* Animated Flying Butterflies */}
        <div className="relative w-full h-16 pointer-events-none mb-4">
          <motion.div
            animate={{
              x: [-120, 120, -120],
              y: [0, -25, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl select-none"
          >
            🦋
          </motion.div>
        </div>

        {/* Celebratory Flower Wreath around 29 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mb-6"
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-dashed border-[#D8B978] flex items-center justify-center bg-[#FFF9F0]/80 shadow-xl shadow-[#672F43]/10">
            <span className="font-serif text-6xl sm:text-7xl font-bold text-[#672F43] drop-shadow-xs">
              29
            </span>
          </div>
          <span className="absolute -top-3 -right-3 text-3xl animate-bounce">🌸</span>
          <span className="absolute -bottom-2 -left-2 text-3xl animate-pulse">🌷</span>
          <span className="absolute top-1/2 -left-5 text-2xl">🌼</span>
          <span className="absolute top-1/2 -right-5 text-2xl">🌹</span>
        </motion.div>

        {/* Main Finale Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-6xl text-[#493126] font-semibold tracking-tight mb-2"
        >
          {BIRTHDAY_DATA.finale.heading}
        </motion.h2>

        {/* Playful Tease Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-handwriting text-lg sm:text-xl text-[#C98996] mb-4"
        >
          {BIRTHDAY_DATA.finale.teaseNotice}
        </motion.p>

        {/* Supporting Finale Wishes */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-lg sm:text-2xl text-[#493126]/85 max-w-2xl mx-auto italic font-normal leading-relaxed mb-8"
        >
          "{BIRTHDAY_DATA.finale.message}"
        </motion.p>

        {/* Brotherly Love Signoff */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-2 mb-12"
        >
          <h3 className="font-script text-4xl sm:text-6xl text-[#672F43] font-normal">
            {BIRTHDAY_DATA.finale.birthdayWish}
          </h3>
          <p className="font-serif text-sm tracking-widest uppercase text-[#A6B59A]">
            {BIRTHDAY_DATA.finale.loveAlways}
          </p>
          <p className="font-handwriting text-3xl text-[#493126] font-medium">
            {BIRTHDAY_DATA.finale.brotherSignoff}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={triggerGrandConfetti}
            className="group px-7 py-3.5 rounded-full bg-[#D8B978] hover:bg-[#c6a35d] text-[#493126] font-serif text-sm tracking-wider uppercase font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-[#672F43] group-hover:rotate-45 transition-transform" />
            <span>Celebrate With Confetti</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="group px-7 py-3.5 rounded-full bg-[#672F43] hover:bg-[#493126] text-[#FFF9F0] font-serif text-sm tracking-wider uppercase font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4 text-[#D8B978] group-hover:-rotate-90 transition-transform duration-300" />
            <span>{BIRTHDAY_DATA.finale.replayButton}</span>
          </button>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="p-3.5 rounded-full border border-[#D8B978] text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer shadow-xs"
            title="Return to beginning"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Small Footer Signature */}
        <div className="mt-20 pt-8 border-t border-[#D8B978]/30 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6B59A] font-serif">
          <span>A Little World for Eleni • 29th Birthday Edition</span>
          <span className="flex items-center gap-1 mt-2 sm:mt-0 text-[#672F43]">
            Designed with devotion by her brother, Eyuel
            <Heart className="w-3 h-3 fill-current text-[#672F43]" />
          </span>
        </div>

      </div>
    </section>
  );
};

