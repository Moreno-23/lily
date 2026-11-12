import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, MailOpen, Sparkles, Trophy, X, Heart } from 'lucide-react';
import { BIRTHDAY_DATA, type Wish } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const WishesSection: React.FC = () => {
  const [openedWishes, setOpenedWishes] = useState<Record<number, boolean>>({});
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [unlockedSurprise, setUnlockedSurprise] = useState<boolean>(false);

  const totalOpened = Object.keys(openedWishes).length;
  const progressPercent = Math.round((totalOpened / 29) * 100);

  const categories = ['All', 'Joy', 'Life', 'Dreams', 'Adventure', 'Peace', 'Sibling Bond'];

  const filteredWishes = activeCategory === 'All'
    ? BIRTHDAY_DATA.wishes
    : BIRTHDAY_DATA.wishes.filter(w => w.category === activeCategory);

  const handleOpenWish = (wish: Wish) => {
    audioManager.playSfx('unwrap');

    const nextOpened = { ...openedWishes, [wish.id]: true };
    setOpenedWishes(nextOpened);
    setSelectedWish(wish);

    // If opened all 29, trigger grand milestone confetti and unlock surprise modal!
    if (Object.keys(nextOpened).length === 29 && !unlockedSurprise) {
      setTimeout(() => {
        setUnlockedSurprise(true);
        audioManager.playSfx('secret');
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D8B978', '#672F43', '#F4DCE0', '#C98996'],
        });
      }, 600);
    }
  };

  const handleOpenAllWishes = () => {
    audioManager.playSfx('sparkle');
    const allObj: Record<number, boolean> = {};
    BIRTHDAY_DATA.wishes.forEach(w => {
      allObj[w.id] = true;
    });
    setOpenedWishes(allObj);
    setUnlockedSurprise(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#D8B978', '#672F43', '#F4DCE0', '#C98996'],
    });
  };

  return (
    <section 
      id="wishes"
      className="relative min-h-screen py-24 px-4 max-w-7xl mx-auto flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4DCE0] text-[#672F43] text-xs font-serif tracking-widest uppercase mb-3 border border-[#D8B978]/30">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
          A Wish for Every Year of Your Life
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-3">
          29 Wishes for Your 29th Year
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#493126]/80 leading-relaxed">
          Twenty-nine sealed envelopes written by your brother. Each holds a heartfelt blessing, 
          an adventure call, or a silly sibling truth. Tap each envelope to reveal the wish!
        </p>

        {/* Progress Tracker Bar */}
        <div className="mt-8 bg-[#FFF9F0] border border-[#D8B978]/50 rounded-2xl p-5 shadow-sm max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-serif text-[#493126] mb-2 font-medium">
            <span>Envelopes Opened: <strong className="text-[#672F43] text-sm">{totalOpened}</strong> / 29</span>
            <span>{progressPercent}% Complete</span>
          </div>

          <div className="w-full h-3 bg-[#F4DCE0] rounded-full overflow-hidden p-0.5 border border-[#D8B978]/30">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#C98996] via-[#D8B978] to-[#672F43] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] font-sans text-stone-500 italic">
              {totalOpened === 29 ? "🎉 All 29 wishes opened!" : "Unlock all 29 to reveal a special surprise!"}
            </span>

            {totalOpened < 29 && (
              <button
                type="button"
                onClick={handleOpenAllWishes}
                className="text-[11px] text-[#672F43] hover:underline font-serif font-medium cursor-pointer"
              >
                Reveal All 29
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#672F43] text-[#FFF9F0] shadow-xs'
                  : 'bg-[#FFF9F0] text-[#493126] border border-[#D8B978]/40 hover:bg-[#F4DCE0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 29 Envelopes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full mb-12">
        {filteredWishes.map((wish) => {
          const isOpen = openedWishes[wish.id];
          return (
            <motion.div
              key={wish.id}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenWish(wish)}
              className={`relative rounded-2xl p-4 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center shadow-xs hover:shadow-md ${
                isOpen
                  ? 'bg-[#F4DCE0]/40 border-[#C98996]'
                  : 'bg-[#FFF9F0] border-[#D8B978]/60 hover:border-[#672F43]'
              }`}
            >
              {/* Number Badge */}
              <span className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#FFF9F0] text-[#672F43] border border-[#D8B978]/50 text-[11px] font-serif font-bold flex items-center justify-center shadow-2xs">
                {wish.id}
              </span>

              {/* Envelope Icon */}
              <div className="my-3 text-3xl">
                {isOpen ? (
                  <MailOpen className="w-10 h-10 text-[#C98996] animate-gentle-pulse" />
                ) : (
                  <Mail className="w-10 h-10 text-[#672F43]" />
                )}
              </div>

              {/* Wish Title */}
              <h4 className="font-serif text-sm font-semibold text-[#493126] line-clamp-1 mb-1">
                {wish.title}
              </h4>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A6B59A] block mb-2">
                {wish.category}
              </span>

              <span className="text-[10px] font-serif text-[#C98996] underline underline-offset-2">
                {isOpen ? 'Read Again' : 'Open Wish'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Wish Display Lightbox Modal */}
      <AnimatePresence>
        {selectedWish && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/50 backdrop-blur-xs"
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFF9F0] rounded-3xl p-8 border-2 border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedWish(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#F4DCE0] text-[#672F43] flex items-center justify-center text-xl font-serif font-bold shadow-xs">
                #{selectedWish.id}
              </div>

              <span className="text-xs uppercase font-mono tracking-widest text-[#A6B59A] block mb-1">
                {selectedWish.category}
              </span>
              <h3 className="font-serif text-3xl text-[#672F43] font-semibold mb-4">
                Wish #{selectedWish.id}: {selectedWish.title}
              </h3>

              <div className="bg-[#FFF9F0] rounded-2xl p-6 border border-[#D8B978]/60 shadow-inner mb-6">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#493126] leading-relaxed">
                  "{selectedWish.message}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-1 text-xs font-serif text-[#493126]/80">
                <Heart className="w-3.5 h-3.5 fill-[#672F43] text-[#672F43]" />
                <span>With love from your brother, Eyuel</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unlocked 29/29 Milestone Surprise Modal */}
      <AnimatePresence>
        {unlockedSurprise && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-sm"
            onClick={() => setUnlockedSurprise(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-b from-[#FFF9F0] to-[#F4DCE0] rounded-3xl p-8 border-3 border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setUnlockedSurprise(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#FFF9F0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D8B978] text-[#493126] flex items-center justify-center shadow-lg animate-bounce">
                <Trophy className="w-8 h-8 text-[#672F43]" />
              </div>

              <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#672F43] font-semibold block mb-1">
                29 of 29 Wishes Unlocked!
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#493126] font-bold mb-3">
                You Did It, Eleni!
              </h3>

              <div className="bg-[#FFF9F0]/80 rounded-2xl p-6 border border-[#D8B978] mb-6 text-left space-y-3">
                <p className="font-handwriting text-2xl text-[#672F43]">
                  "If life gave me a wish for every time you brought happiness to our family, 29 wouldn't even scratch the surface."
                </p>
                <p className="font-sans text-xs text-[#493126]/85 leading-relaxed">
                  Every single one of these 29 wishes comes straight from my heart. I hope your 29th year feels like the beginning of your greatest adventure yet!
                </p>
              </div>

              <button
                type="button"
                onClick={() => setUnlockedSurprise(false)}
                className="px-6 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] font-serif text-sm tracking-wider uppercase shadow-md hover:bg-[#493126] transition-all cursor-pointer"
              >
                Continue Exploring Your World
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
