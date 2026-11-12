import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, X, ShieldAlert } from 'lucide-react';
import { BIRTHDAY_DATA, type ChocolateItem } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const ChocolateFactory: React.FC = () => {
  const [unwrapped, setUnwrapped] = useState<Record<string, boolean>>({});
  const [selectedChocolate, setSelectedChocolate] = useState<ChocolateItem | null>(null);
  const [activeBoxOpen, setActiveBoxOpen] = useState(false);

  const handleUnwrap = (choc: ChocolateItem) => {
    audioManager.playSfx('unwrap');
    setUnwrapped(prev => ({ ...prev, [choc.id]: true }));
    setSelectedChocolate(choc);
  };

  const getChocolateIcon = (chocId: string) => {
    switch (chocId) {
      case 'choc-1': return '🌰'; // Hazelnut
      case 'choc-2': return '🍓'; // Strawberry
      case 'choc-3': return '🍬'; // Salted caramel
      case 'choc-4': return '☕'; // Espresso dark
      case 'choc-5': return '🥂'; // Champagne gold
      case 'choc-6': return '🌹'; // Pistachio rose
      default: return '🍫';
    }
  };

  return (
    <section 
      id="chocolates"
      className="relative min-h-screen py-24 px-4 max-w-7xl mx-auto flex flex-col items-center"
    >
      {/* Background Accent Pill */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D8B978]/25 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3">
          <Gift className="w-3.5 h-3.5 text-[#672F43]" />
          L’Atelier du Chocolat
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#493126] font-semibold mb-3">
          {BIRTHDAY_DATA.chocolates.heading}
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-[#672F43] mb-4">
          {BIRTHDAY_DATA.chocolates.subheading}
        </p>
        <p className="font-sans text-sm sm:text-base text-[#493126]/80 max-w-xl mx-auto leading-relaxed">
          {BIRTHDAY_DATA.chocolates.description}
        </p>
      </div>

      {/* Luxury Velvet Chocolate Gift Box Container */}
      <div className="w-full max-w-5xl bg-[#493126] rounded-3xl p-6 sm:p-10 border-4 border-[#D8B978] shadow-2xl relative overflow-hidden mb-12">
        {/* Gold filigree corners */}
        <div className="absolute top-2 left-2 text-[#D8B978] opacity-60 text-lg">✦</div>
        <div className="absolute top-2 right-2 text-[#D8B978] opacity-60 text-lg">✦</div>
        <div className="absolute bottom-2 left-2 text-[#D8B978] opacity-60 text-lg">✦</div>
        <div className="absolute bottom-2 right-2 text-[#D8B978] opacity-60 text-lg">✦</div>

        {/* Box Header Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D8B978]/40 pb-5 mb-8 text-[#FFF9F0]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D8B978] font-serif block">
              Boutique Collection • Millésime 29
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide">
              Eleni's Signature Assortment
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              audioManager.playSfx('sparkle');
              setActiveBoxOpen(!activeBoxOpen);
            }}
            className="mt-3 sm:mt-0 px-4 py-2 rounded-full border border-[#D8B978] text-[#D8B978] hover:bg-[#D8B978] hover:text-[#493126] transition-all text-xs font-serif tracking-wider uppercase cursor-pointer"
          >
            {activeBoxOpen ? 'Hide Master Guide' : 'View Sibling Chocolate Laws'}
          </button>
        </div>

        {/* Optional Collapsible Sibling Law Guide */}
        {activeBoxOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#2E1C14] rounded-2xl p-5 mb-8 border border-[#D8B978]/40 text-[#FFF9F0] text-xs font-sans space-y-2"
          >
            <div className="flex items-center gap-2 text-[#D8B978] font-serif uppercase tracking-wider font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Official Sibling Chocolate Codex (Signed by Eyuel)</span>
            </div>
            <p className="text-stone-300">
              1. Calories consumed while celebrating 29 years are automatically routed to zero by universal sibling decree.
            </p>
            <p className="text-stone-300">
              2. Any chocolate stolen from your brother in childhood is fully pardoned as of today.
            </p>
            <p className="text-stone-300">
              3. Unwrapping all virtual chocolates entitles you to ask your brother for one real-life chocolate treat anytime!
            </p>
          </motion.div>
        )}

        {/* Grid of 6 Luxury Chocolates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIRTHDAY_DATA.chocolates.items.map((choc) => {
            const isOpen = unwrapped[choc.id];
            return (
              <motion.div
                key={choc.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUnwrap(choc)}
                className={`group relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isOpen
                    ? 'bg-[#5B3D30] border-[#D8B978] shadow-lg shadow-black/30'
                    : 'bg-[#3A261D] border-[#D8B978]/30 hover:border-[#D8B978]'
                }`}
              >
                {/* Gold Foil Seal Stamp */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#D8B978]/20 text-[#D8B978]">
                    {choc.tag}
                  </span>
                  <span className="text-xs text-[#D8B978]">
                    {isOpen ? '✦ Unwrapped' : '✦ Sealed in Gold Foil'}
                  </span>
                </div>

                {/* Chocolate Visual */}
                <div className="my-3 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E1C14] to-[#672F43] border border-[#D8B978]/60 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {getChocolateIcon(choc.id)}
                  </div>

                  <h4 className="font-serif text-xl text-[#FFF9F0] mt-3 font-medium">
                    {choc.name}
                  </h4>
                  <p className="font-serif italic text-xs text-[#D8B978] mt-0.5">
                    {choc.type}
                  </p>
                  <p className="font-sans text-[11px] text-stone-300 mt-2 line-clamp-1">
                    {choc.flavor}
                  </p>
                </div>

                {/* Bottom Action Prompt */}
                <div className="pt-3 border-t border-[#D8B978]/20 flex items-center justify-between text-xs font-serif text-[#D8B978]">
                  <span>{isOpen ? 'Tap to view note' : 'Click to unwrap'}</span>
                  <Sparkles className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Unwrapped Note Lightbox Modal */}
      <AnimatePresence>
        {selectedChocolate && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-xs"
            onClick={() => setSelectedChocolate(null)}
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
                onClick={() => setSelectedChocolate(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#493126] text-[#D8B978] flex items-center justify-center text-3xl shadow-md">
                {getChocolateIcon(selectedChocolate.id)}
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-[#C98996] block mb-1">
                {selectedChocolate.type}
              </span>
              <h3 className="font-serif text-3xl text-[#493126] font-semibold mb-1">
                {selectedChocolate.name}
              </h3>
              <p className="font-serif italic text-xs text-[#672F43] mb-6">
                Tasting Notes: {selectedChocolate.flavor}
              </p>

              {/* Message Box */}
              <div className="bg-[#F4DCE0]/60 rounded-2xl p-6 border border-[#C98996]/30 mb-5">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#493126] leading-relaxed">
                  "{selectedChocolate.message}"
                </p>
              </div>

              {/* Sibling Law Note */}
              {selectedChocolate.siblingLaw && (
                <div className="bg-[#D8B978]/20 rounded-xl p-3 border border-[#D8B978]/50 text-xs text-[#493126] font-serif italic mb-4">
                  📜 {selectedChocolate.siblingLaw}
                </div>
              )}

              <div className="flex items-center justify-center gap-1 text-xs font-serif text-[#493126]/70">
                <span>Made sweeter by your brother</span>
                <Heart className="w-3 h-3 text-[#672F43] fill-current ml-1" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
