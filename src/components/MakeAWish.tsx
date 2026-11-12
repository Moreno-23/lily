import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Sparkles, Lock, Star } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const MakeAWish: React.FC = () => {
  const [wishText, setWishText] = useState('');
  const [hasSent, setHasSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim() || isSending) return;

    setIsSending(true);
    audioManager.playSfx('wish');

    // Trigger celestial starlight confetti
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#D8B978', '#FFF9F0', '#F4DCE0'],
      });

      setIsSending(false);
      setHasSent(true);
    }, 1200);
  };

  const handleMakeAnother = () => {
    audioManager.playSfx('pop');
    setWishText('');
    setHasSent(false);
  };

  return (
    <section 
      id="wishing-fountain"
      className="relative min-h-screen py-24 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center text-center"
    >
      {/* Background Starry Glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D8B978]/25 via-[#672F43]/15 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D8B978]/20 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
          Sacred Milestone Wishing Well
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-3">
          {BIRTHDAY_DATA.wishingWell.title}
        </h2>
        <p className="font-script text-2xl text-[#C98996] mb-3">
          {BIRTHDAY_DATA.wishingWell.subtitle}
        </p>
        <p className="font-sans text-sm sm:text-base text-[#493126]/80 leading-relaxed">
          {BIRTHDAY_DATA.wishingWell.instructions}
        </p>
      </div>

      {/* Wishing Interactive Card / Fountain */}
      <div className="w-full max-w-xl bg-[#FFF9F0] rounded-3xl p-8 sm:p-10 border-2 border-[#D8B978] shadow-2xl relative overflow-hidden">
        
        {/* Glowing Fountain Visual / Golden Lotus Emblem */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#D8B978]/30 blur-md"
          />

          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#D8B978] to-[#FFF9F0] p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#672F43] flex items-center justify-center text-3xl">
              <span className="animate-gentle-pulse">🪷</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!hasSent ? (
            <motion.form
              key="wish-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSendWish}
              className="space-y-4"
            >
              <div className="relative">
                <textarea
                  rows={4}
                  required
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder={BIRTHDAY_DATA.wishingWell.placeholder}
                  className="w-full px-5 py-4 rounded-2xl border border-[#D8B978] bg-white text-[#493126] font-serif text-base placeholder-[#A6B59A] focus:outline-hidden focus:ring-2 focus:ring-[#672F43]/30 shadow-inner resize-none leading-relaxed"
                />
              </div>

              {/* Privacy Shield Notice */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#A6B59A] font-sans">
                <Lock className="w-3.5 h-3.5" />
                <span>{BIRTHDAY_DATA.wishingWell.privacyNote}</span>
              </div>

              <button
                type="submit"
                disabled={!wishText.trim() || isSending}
                className="w-full py-4 rounded-full bg-[#672F43] hover:bg-[#493126] text-[#FFF9F0] font-serif text-base tracking-wider uppercase font-semibold shadow-lg shadow-[#672F43]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5"
              >
                {isSending ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-[#D8B978]" />
                    <span>Lifting Your Wish to the Stars...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#D8B978]" />
                    <span>{BIRTHDAY_DATA.wishingWell.buttonText}</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="wish-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Animated Floating Star */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl"
              >
                ✨
              </motion.div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#672F43] font-semibold">
                Your Wish Has Been Released
              </h3>

              <div className="bg-[#F4DCE0]/60 rounded-2xl p-6 border border-[#C98996]/30">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#493126] leading-relaxed">
                  "{BIRTHDAY_DATA.wishingWell.blessing}"
                </p>
              </div>

              <button
                type="button"
                onClick={handleMakeAnother}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D8B978] text-[#493126] hover:bg-[#F4DCE0] text-xs font-serif tracking-wider uppercase transition-colors cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 text-[#672F43]" />
                <span>Make Another Wish</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

