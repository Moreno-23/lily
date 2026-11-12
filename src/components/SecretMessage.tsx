import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Award, Heart, X } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const SecretMessage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDiscovered, setHasDiscovered] = useState(false);

  const handleOpenSecret = () => {
    audioManager.playSfx('secret');
    setHasDiscovered(true);
    setIsOpen(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D8B978', '#672F43', '#FFF9F0', '#C98996'],
    });
  };

  return (
    <>
      {/* Discreet floating golden easter egg trigger */}
      <div 
        className="fixed bottom-16 md:bottom-6 left-3 md:left-6 z-40"
        title="A tiny mysterious golden glow..."
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.25, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpenSecret}
          className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#D8B978] via-[#FFF9F0] to-[#D8B978] p-0.5 shadow-lg shadow-[#D8B978]/40 flex items-center justify-center cursor-pointer group"
          aria-label="Secret sibling surprise Easter egg"
        >
          {/* Pulsing ring aura */}
          <span className="absolute inset-0 rounded-full bg-[#D8B978]/30 animate-ping pointer-events-none" />

          <div className="w-full h-full rounded-full bg-[#FFF9F0] flex items-center justify-center text-lg">
            <span className="group-hover:rotate-45 transition-transform duration-300">
              ⭐
            </span>
          </div>

          {!hasDiscovered && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#672F43] rounded-full border-2 border-white animate-pulse" />
          )}
        </motion.button>
      </div>

      {/* Secret Message Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-b from-[#FFF9F0] via-[#FFF9F0] to-[#F4DCE0] rounded-3xl p-8 border-3 border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Explorer Badge */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D8B978] text-[#493126] flex items-center justify-center shadow-lg border-2 border-[#FFF9F0] animate-bounce">
                <Award className="w-8 h-8 text-[#672F43]" />
              </div>

              <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#672F43] font-semibold block mb-1">
                {BIRTHDAY_DATA.secret.badgeTitle}
              </span>
              <h3 className="font-serif text-3xl text-[#493126] font-bold mb-4">
                {BIRTHDAY_DATA.secret.foundTitle}
              </h3>

              {/* Secret Letter Body */}
              <div className="bg-[#FFF9F0] rounded-2xl p-6 border border-[#D8B978]/60 shadow-inner mb-6 text-left">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#493126] leading-relaxed whitespace-pre-line">
                  {BIRTHDAY_DATA.secret.message}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] font-serif text-sm tracking-wider uppercase hover:bg-[#493126] shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D8B978]" />
                  <span>Cherish This Secret</span>
                  <Heart className="w-3.5 h-3.5 fill-current text-[#D8B978]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

