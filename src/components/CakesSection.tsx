import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Utensils, Heart, X, Check, Flame } from 'lucide-react';
import { BIRTHDAY_DATA, type CakeItem } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const CakesSection: React.FC = () => {
  const [tastedCakes, setTastedCakes] = useState<Record<string, boolean>>({});
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const totalTasted = Object.keys(tastedCakes).length;

  const handleTasteCake = (cake: CakeItem) => {
    audioManager.playSfx('sparkle');

    const nextTasted = { ...tastedCakes, [cake.id]: true };
    setTastedCakes(nextTasted);
    setSelectedCake(cake);

    // If tasted all 6 cakes, trigger celebration!
    if (Object.keys(nextTasted).length === BIRTHDAY_DATA.pastryCakes.items.length && !tastedCakes[cake.id]) {
      setTimeout(() => {
        audioManager.playSfx('secret');
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D8B978', '#672F43', '#F4DCE0', '#C98996'],
        });
        setShowRewardModal(true);
      }, 500);
    }
  };

  return (
    <section 
      id="cakes"
      className="relative min-h-screen py-16 sm:py-24 px-4 max-w-lg sm:max-w-6xl mx-auto flex flex-col items-center select-none"
    >
      {/* Header Badge */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D8B978]/25 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3 border border-[#D8B978]/40 shadow-2xs">
          <Utensils className="w-3.5 h-3.5 text-[#672F43]" />
          <span>{BIRTHDAY_DATA.pastryCakes.badge}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-2">
          {BIRTHDAY_DATA.pastryCakes.title}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#C98996] mb-3">
          Milifoni, Opera, Boxegna & More!
        </p>
        <p className="font-sans text-xs sm:text-sm text-[#493126]/80 leading-relaxed px-2">
          {BIRTHDAY_DATA.pastryCakes.subtitle}
        </p>

        {/* Tasting Progress Bar */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9F0] border border-[#D8B978]/60 shadow-xs text-xs font-serif text-[#493126]">
          <Flame className="w-4 h-4 text-amber-600 fill-current animate-pulse" />
          <span>Candles Blown / Slices Tasted: <strong className="text-[#672F43]">{totalTasted}</strong> / 6</span>
        </div>
      </div>

      {/* Grid of the 6 Favorite Cakes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full mb-10">
        {BIRTHDAY_DATA.pastryCakes.items.map((cake) => {
          const isTasted = tastedCakes[cake.id];
          return (
            <motion.div
              key={cake.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTasteCake(cake)}
              className={`relative rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-lg ${
                isTasted
                  ? 'bg-[#FFF9F0] border-[#D8B978] shadow-[#D8B978]/20'
                  : 'bg-white/80 border-[#D8B978]/40 hover:border-[#672F43]'
              }`}
            >
              {/* Top Pill: Status & Amharic Title */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#F4DCE0] text-[#672F43] font-semibold">
                  {cake.amharicName || cake.tagline}
                </span>

                <div className="flex items-center gap-1 text-xs">
                  {isTasted ? (
                    <span className="flex items-center gap-0.5 text-emerald-700 font-serif font-medium text-[11px]">
                      <Check className="w-3.5 h-3.5" /> Sliced!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-serif text-[11px]">
                      <Flame className="w-3 h-3 fill-current animate-bounce" /> Tap to taste
                    </span>
                  )}
                </div>
              </div>

              {/* Cake Visual Emblem */}
              <div className="my-2 flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFF9F0] to-[#F4DCE0] border border-[#D8B978]/60 flex items-center justify-center text-4xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  {cake.icon}

                  {/* Flickering candle on top */}
                  {!isTasted && (
                    <span className="absolute -top-3 text-sm animate-bounce">
                      🕯️
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[#493126] font-bold mt-3">
                  {cake.name}
                </h3>
                <p className="font-serif italic text-xs text-[#A6B59A] mt-0.5 font-medium">
                  {cake.tagline}
                </p>
                <p className="font-sans text-xs text-[#493126]/85 mt-2 line-clamp-2 leading-relaxed">
                  {cake.description}
                </p>
              </div>

              {/* Bottom Action Strip */}
              <div className="mt-4 pt-3 border-t border-[#D8B978]/30 flex items-center justify-between text-xs font-serif text-[#672F43]">
                <span className="font-medium underline underline-offset-4">
                  {isTasted ? 'Read Memory Again' : 'Blow Candle & Taste'}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sibling Pastry Law Banner */}
      <div className="w-full bg-[#F4DCE0]/70 rounded-2xl p-4 border border-[#C98996]/40 text-center max-w-2xl mx-auto shadow-2xs">
        <p className="font-handwriting text-xl sm:text-2xl text-[#672F43]">
          "Official Sibling Law: Milifoni and Boxegna eaten on your birthday contain exactly 0 calories. Verified by Eyuel!"
        </p>
      </div>

      {/* Cake Details Lightbox Modal */}
      <AnimatePresence>
        {selectedCake && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-xs"
            onClick={() => setSelectedCake(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FFF9F0] rounded-3xl p-6 sm:p-8 border-2 border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedCake(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#F4DCE0] text-[#672F43] flex items-center justify-center text-4xl shadow-inner border border-[#D8B978]/50">
                {selectedCake.icon}
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C98996] block mb-1 font-semibold">
                {selectedCake.amharicName || selectedCake.tagline}
              </span>
              <h3 className="font-serif text-3xl text-[#672F43] font-bold mb-1">
                {selectedCake.name}
              </h3>
              <p className="font-serif italic text-xs text-[#A6B59A] mb-4">
                Flavor Profile: {selectedCake.flavor}
              </p>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-[#493126] leading-relaxed mb-5">
                {selectedCake.description}
              </p>

              {/* Eyuel's Sibling Pastry Memory Note */}
              <div className="bg-[#FFF9F0] rounded-2xl p-4 border border-[#D8B978]/60 shadow-inner mb-5 text-left">
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#672F43] block mb-1 font-bold">
                  Eyuel's Note:
                </span>
                <p className="font-handwriting text-xl sm:text-2xl text-[#493126] leading-snug">
                  "{selectedCake.siblingNote}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#672F43]">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Happy 29th Birthday, Lilisha!</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sugar Rush All-Cakes Tasted Achievement Modal */}
      <AnimatePresence>
        {showRewardModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-sm"
            onClick={() => setShowRewardModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 25 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-b from-[#FFF9F0] to-[#F4DCE0] rounded-3xl p-6 sm:p-8 border-3 border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setShowRewardModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#493126] hover:bg-[#FFF9F0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-5xl mb-3 animate-bounce">
                🎂
              </div>

              <span className="font-serif text-xs uppercase tracking-widest text-[#672F43] font-bold block mb-1">
                All 6 Cakes Tasted!
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#493126] font-bold mb-3">
                Bakery Master Achievement!
              </h3>

              <div className="bg-[#FFF9F0]/90 rounded-2xl p-4 border border-[#D8B978] mb-5 text-left space-y-2">
                <p className="font-handwriting text-xl sm:text-2xl text-[#672F43]">
                  "Lisha, you officially tasted all 6 cakes! That means next time we hang out, real Milifoni and Boxegna are 100% on me!"
                </p>
                <p className="font-sans text-[11px] text-[#493126]/85">
                  Signed and notarized by your brother Eyuel.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRewardModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] font-serif text-xs tracking-wider uppercase font-semibold shadow-md hover:bg-[#493126] transition-all cursor-pointer"
              >
                Claim Bakery Promise
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

