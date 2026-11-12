import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

interface OpeningGiftProps {
  onOpenComplete: () => void;
}

export const OpeningGift: React.FC<OpeningGiftProps> = ({ onOpenComplete }) => {
  const [stage, setStage] = useState<'idle' | 'untying' | 'opening' | 'blooming' | 'completed'>('idle');

  const triggerConfetti = () => {
    // Elegant luxury gold & blush confetti
    const count = 80;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#D8B978', '#F4DCE0', '#C98996', '#672F43', '#FFF9F0'],
      disableForReducedMotion: true,
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.6),
      spread: 60,
      startVelocity: 45,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 100,
      decay: 0.91,
      scalar: 1.2,
    });
  };

  const handleOpenGift = async () => {
    if (stage !== 'idle') return;

    // Start background music subtly and play ribbon unwrap sfx
    audioManager.startMusic();
    audioManager.playSfx('unwrap');
    setStage('untying');

    // 1. Ribbon unties (after 700ms)
    setTimeout(() => {
      setStage('opening');
      audioManager.playSfx('bloom');

      // 2. Box lid lifts & flowers bloom with golden sparkles (after 800ms)
      setTimeout(() => {
        setStage('blooming');
        audioManager.playSfx('sparkle');
        triggerConfetti();

        // 3. Smooth transition to main website
        setTimeout(() => {
          setStage('completed');
          onOpenComplete();
        }, 2200);
      }, 900);
    }, 700);
  };

  const handleSkip = () => {
    audioManager.startMusic();
    audioManager.playSfx('pop');
    setStage('completed');
    onOpenComplete();
  };

  return (
    <AnimatePresence>
      {stage !== 'completed' && (
        <motion.div
          key="gift-intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F0] overflow-hidden px-4 select-none"
        >
          {/* Subtle botanical corner decorations */}
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-40">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#A6B59A]">
              <path d="M0 0 C40 80, 80 40, 150 20 C110 90, 70 120, 0 150 Z" fill="currentColor" opacity="0.4" />
              <circle cx="60" cy="50" r="16" fill="#F4DCE0" />
              <circle cx="110" cy="35" r="12" fill="#C98996" />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-40 rotate-180">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#A6B59A]">
              <path d="M0 0 C40 80, 80 40, 150 20 C110 90, 70 120, 0 150 Z" fill="currentColor" opacity="0.4" />
              <circle cx="60" cy="50" r="16" fill="#F4DCE0" />
              <circle cx="110" cy="35" r="12" fill="#C98996" />
            </svg>
          </div>

          {/* Floating Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 text-xs tracking-widest uppercase text-[#C98996] hover:text-[#672F43] font-medium py-2 px-4 rounded-full border border-[#D8B978]/40 hover:border-[#672F43] transition-all duration-300 cursor-pointer"
          >
            {BIRTHDAY_DATA.opening.skipButtonText}
          </button>

          {/* Center Card with Handwritten Note & Gift Box */}
          <div className="max-w-md w-full flex flex-col items-center text-center z-10">
            
            {/* Handwritten Greeting Note */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mb-8"
            >
              <span className="font-handwriting text-3xl sm:text-4xl text-[#672F43] block mb-1">
                {BIRTHDAY_DATA.opening.greeting}
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#493126]/80 italic">
                {BIRTHDAY_DATA.opening.subGreeting}
              </p>
              <div className="w-16 h-0.5 bg-[#D8B978]/60 mx-auto mt-3 rounded-full" />
            </motion.div>

            {/* Interactive Luxury Gift Box */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
              
              {/* Blooming Flowers & Golden Sparkles container (pops out on open) */}
              <AnimatePresence>
                {(stage === 'opening' || stage === 'blooming') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2, y: 30 }}
                    animate={{ opacity: 1, scale: 1.15, y: -65 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute z-20 pointer-events-none flex flex-col items-center"
                  >
                    {/* Floral bouquet bursting out */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="text-6xl absolute"
                      >
                        🌸
                      </motion.span>
                      <span className="text-5xl absolute -top-4 -left-4 animate-bounce">🌹</span>
                      <span className="text-5xl absolute -top-4 -right-4 animate-pulse">🌷</span>
                      <span className="text-4xl absolute -bottom-2 -left-3">🌼</span>
                      <span className="text-4xl absolute -bottom-2 -right-3">🌺</span>
                      <Sparkles className="w-10 h-10 text-[#D8B978] absolute animate-spin" />
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-script text-3xl text-[#672F43] mt-2 whitespace-nowrap drop-shadow-sm"
                    >
                      Happy 29th, Sis!
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Gift Box Container */}
              <motion.div
                whileHover={stage === 'idle' ? { scale: 1.03 } : {}}
                whileTap={stage === 'idle' ? { scale: 0.98 } : {}}
                onClick={handleOpenGift}
                className="relative w-52 h-52 sm:w-56 sm:h-56 cursor-pointer group"
              >
                {/* Golden ambient glow */}
                <div className="absolute inset-0 bg-[#D8B978]/20 rounded-3xl blur-xl group-hover:bg-[#D8B978]/40 transition-all duration-500" />

                {/* Gift Box Base */}
                <div className="absolute inset-x-4 bottom-2 top-14 bg-gradient-to-br from-[#F4DCE0] via-[#C98996] to-[#672F43] rounded-2xl shadow-xl shadow-[#493126]/20 border border-[#FFF9F0]/60 flex items-center justify-center overflow-hidden">
                  {/* Subtle geometric pattern / texture */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFF9F0_1px,transparent_1px)] [background-size:12px_12px]" />

                  {/* Vertical Ribbon on Base */}
                  <div className="absolute w-8 h-full bg-gradient-to-r from-[#D8B978] via-[#FFF9F0] to-[#D8B978] shadow-sm" />

                  {/* Small Brotherly Seal */}
                  <div className="absolute bottom-4 right-4 bg-[#672F43]/80 text-[#FFF9F0] px-2.5 py-1 rounded-full text-[10px] font-serif tracking-wider border border-[#D8B978]/50 flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 fill-current text-[#D8B978]" />
                    <span>For Eleni</span>
                  </div>
                </div>

                {/* Gift Box Lid (animates lifting / flying off) */}
                <motion.div
                  animate={
                    stage === 'opening' || stage === 'blooming'
                      ? { y: -80, rotate: -15, opacity: 0 }
                      : stage === 'untying'
                      ? { y: -10 }
                      : { y: 0 }
                  }
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-2 top-10 h-14 bg-gradient-to-r from-[#C98996] via-[#F4DCE0] to-[#C98996] rounded-xl shadow-lg border border-[#FFF9F0] flex items-center justify-center z-10"
                >
                  {/* Horizontal Ribbon on Lid */}
                  <div className="w-full h-6 bg-gradient-to-b from-[#D8B978] via-[#FFF9F0] to-[#D8B978] shadow-inner" />

                  {/* Bow Ribbon Top */}
                  <motion.div
                    animate={
                      stage === 'untying' || stage === 'opening' || stage === 'blooming'
                        ? { scale: 0, opacity: 0 }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="absolute -top-7 flex items-center justify-center"
                  >
                    {/* Left Loop */}
                    <div className="w-8 h-8 rounded-full border-4 border-[#D8B978] bg-[#FFF9F0]/70 -mr-2 rotate-45 shadow-sm" />
                    {/* Center Knot */}
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D8B978] to-[#FFF9F0] shadow-md z-10 border border-[#493126]/20" />
                    {/* Right Loop */}
                    <div className="w-8 h-8 rounded-full border-4 border-[#D8B978] bg-[#FFF9F0]/70 -ml-2 -rotate-45 shadow-sm" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Note & Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4"
            >
              <p className="font-handwriting text-xl sm:text-2xl text-[#493126] mb-5">
                "{BIRTHDAY_DATA.opening.fromBrother}"
              </p>

              <button
                type="button"
                onClick={handleOpenGift}
                disabled={stage !== 'idle'}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#672F43] text-[#FFF9F0] font-serif text-lg tracking-wider shadow-lg shadow-[#672F43]/25 hover:shadow-xl hover:shadow-[#672F43]/40 hover:bg-[#493126] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 text-[#D8B978] group-hover:rotate-12 transition-transform duration-300" />
                <span>{stage === 'idle' ? BIRTHDAY_DATA.opening.openButtonText : 'Unwrapping Your Gift...'}</span>
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

