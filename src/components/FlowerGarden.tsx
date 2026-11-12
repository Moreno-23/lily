import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sprout, CheckCircle2, X } from 'lucide-react';
import { BIRTHDAY_DATA, type FlowerData } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const FlowerGarden: React.FC = () => {
  const [flowers, setFlowers] = useState<FlowerData[]>(BIRTHDAY_DATA.garden.flowers);
  const [selectedFlower, setSelectedFlower] = useState<FlowerData | null>(null);
  const [bloomedCount, setBloomedCount] = useState<number>(0);
  const [customWildflowers, setCustomWildflowers] = useState<Array<{ id: string; name: string; icon: string; color: string; left: string }>>([]);

  const handleFlowerClick = (flower: FlowerData) => {
    audioManager.playSfx('bloom');

    // Mark as bloomed if not already
    if (!flower.bloomed) {
      setFlowers(prev => prev.map(f => f.id === flower.id ? { ...f, bloomed: true } : f));
      setBloomedCount(prev => prev + 1);
    }

    setSelectedFlower(flower);
  };

  const handleGrowGarden = () => {
    audioManager.playSfx('sparkle');
    const icons = ['🌸', '🌺', '🌷', '🌹', '🌼', '🪻', '🌻', '🌿'];
    const names = ['Morning Glory', 'Alpine Edelweiss', 'Sweet Pea', 'Daffodil', 'Gardenia', 'Orchid', 'Jasmine', 'Bluebell'];
    const colors = ['#C98996', '#D8B978', '#F4DCE0', '#A6B59A', '#9C7A97'];

    const newId = `wildflower-${Date.now()}`;
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = `${Math.floor(Math.random() * 85) + 5}%`;

    setCustomWildflowers(prev => [
      ...prev,
      { id: newId, name: randomName, icon: randomIcon, color: randomColor, left: randomLeft }
    ]);
  };

  // Render botanical flower icon/graphic
  const renderFlowerVisual = (flowerId: string, bloomed: boolean) => {
    switch (flowerId) {
      case 'rose':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 85 Q50 65 50 45" stroke="#A6B59A" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M50 65 Q35 55 30 65" stroke="#A6B59A" strokeWidth="3" fill="none" />
              <path d="M50 55 Q65 48 70 58" stroke="#A6B59A" strokeWidth="3" fill="none" />
              {/* Petals */}
              <circle cx="50" cy="35" r={bloomed ? "26" : "18"} fill="#C98996" className="transition-all duration-700" />
              <circle cx="50" cy="35" r={bloomed ? "18" : "12"} fill="#F4DCE0" className="transition-all duration-700" />
              <circle cx="50" cy="35" r="8" fill="#672F43" />
            </svg>
            <span className="absolute text-2xl">{bloomed ? '🌹' : '🥀'}</span>
          </div>
        );
      case 'peony':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 85 Q52 65 50 45" stroke="#A6B59A" strokeWidth="5" fill="none" strokeLinecap="round" />
              <circle cx="50" cy="35" r={bloomed ? "28" : "19"} fill="#F4DCE0" className="transition-all duration-700" />
              <circle cx="50" cy="35" r={bloomed ? "20" : "13"} fill="#C98996" opacity="0.8" className="transition-all duration-700" />
              <circle cx="50" cy="35" r="10" fill="#D8B978" />
            </svg>
            <span className="absolute text-2xl">🌸</span>
          </div>
        );
      case 'tulip':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 85 Q48 65 50 45" stroke="#A6B59A" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M50 70 Q30 60 25 75 Q35 85 50 75" fill="#A6B59A" opacity="0.6" />
              <path d="M35 45 C35 25, 65 25, 65 45 C65 58, 35 58, 35 45 Z" fill="#D8B978" className="transition-all duration-700" />
            </svg>
            <span className="absolute text-2xl">🌷</span>
          </div>
        );
      case 'lavender':
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 90 L50 20" stroke="#A6B59A" strokeWidth="4" />
              <circle cx="50" cy="25" r="5" fill="#9C7A97" />
              <circle cx="45" cy="35" r="5" fill="#9C7A97" />
              <circle cx="55" cy="35" r="5" fill="#9C7A97" />
              <circle cx="43" cy="45" r="6" fill="#9C7A97" />
              <circle cx="57" cy="45" r="6" fill="#9C7A97" />
            </svg>
            <span className="absolute text-2xl">🪻</span>
          </div>
        );
      default:
        return (
          <div className="relative w-20 h-20 flex items-center justify-center">
            <span className="text-4xl animate-gentle-pulse">
              {flowerId === 'daisy' ? '🌼' : flowerId === 'lily' ? '🌺' : '🌻'}
            </span>
          </div>
        );
    }
  };

  return (
    <section 
      id="garden"
      className="relative min-h-screen py-24 px-4 max-w-7xl mx-auto flex flex-col items-center"
    >
      {/* Botanical Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A6B59A]/20 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3">
          <Sprout className="w-3.5 h-3.5 text-[#672F43]" />
          Interactive Botanical Sanctuary
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-4">
          {BIRTHDAY_DATA.garden.title}
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#493126]/80 leading-relaxed">
          {BIRTHDAY_DATA.garden.subtitle}
        </p>

        {/* Garden Progress & Growth Action */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="px-4 py-2 rounded-full bg-[#F4DCE0] text-[#672F43] text-xs font-medium flex items-center gap-2 border border-[#D8B978]/30">
            <CheckCircle2 className="w-4 h-4 text-[#672F43]" />
            <span>Bloomed: <strong>{bloomedCount}</strong> / {flowers.length}</span>
          </div>

          <button
            type="button"
            onClick={handleGrowGarden}
            className="group px-5 py-2 rounded-full bg-[#D8B978] hover:bg-[#c4a460] text-[#493126] text-xs font-serif tracking-wider uppercase font-semibold shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#672F43] group-hover:rotate-12 transition-transform" />
            <span>{BIRTHDAY_DATA.garden.growButtonText}</span>
          </button>
        </div>
      </div>

      {/* Flower Bed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-12">
        {flowers.map((flower) => {
          return (
            <motion.div
              key={flower.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFlowerClick(flower)}
              className={`relative bg-[#FFF9F0] rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center shadow-sm hover:shadow-md ${
                flower.bloomed
                  ? 'border-[#C98996] shadow-[#C98996]/10'
                  : 'border-[#D8B978]/40 hover:border-[#672F43]'
              }`}
            >
              {/* Bloomed Badge */}
              {flower.bloomed && (
                <span className="absolute top-3 right-3 text-[10px] uppercase font-serif tracking-widest px-2 py-0.5 bg-[#F4DCE0] text-[#672F43] rounded-full">
                  In Bloom
                </span>
              )}

              {/* Flower Visual Graphic */}
              <div className="mb-4">
                {renderFlowerVisual(flower.id, flower.bloomed)}
              </div>

              {/* Flower Title & Meaning */}
              <h3 className="font-serif text-xl text-[#493126] font-semibold mb-1">
                {flower.name}
              </h3>
              <p className="font-serif italic text-xs text-[#A6B59A] mb-2 font-medium">
                {flower.scientificName}
              </p>
              <p className="font-sans text-xs text-[#672F43]/90 line-clamp-2">
                Meaning: {flower.meaning}
              </p>

              <span className="mt-4 text-xs font-serif text-[#C98996] group-hover:text-[#672F43] underline underline-offset-4">
                {flower.bloomed ? 'Read Sibling Message' : 'Click to Bloom'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Extra Dynamically Grown Wildflowers Meadow Strip */}
      {customWildflowers.length > 0 && (
        <div className="w-full bg-[#A6B59A]/15 border border-[#A6B59A]/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="font-serif text-sm uppercase tracking-wider text-[#493126] font-semibold">
              Eleni's Custom Meadow ({customWildflowers.length} Wildflowers Planted)
            </span>
            <span className="text-xs text-[#672F43] italic">
              "Every seed planted is a new adventure waiting."
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 py-2">
            {customWildflowers.map((wf) => (
              <motion.div
                key={wf.id}
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF9F0] border border-[#D8B978]/40 shadow-xs"
              >
                <span className="text-xl">{wf.icon}</span>
                <span className="font-serif text-xs text-[#493126]">{wf.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Flower Message Lightbox Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/50 backdrop-blur-xs"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFF9F0] rounded-3xl p-8 border border-[#D8B978] shadow-2xl text-center"
            >
              <button
                type="button"
                onClick={() => setSelectedFlower(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                {renderFlowerVisual(selectedFlower.id, true)}
              </div>

              <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#C98996] font-semibold block mb-1">
                {selectedFlower.scientificName}
              </span>
              <h3 className="font-serif text-3xl text-[#672F43] font-semibold mb-2">
                {selectedFlower.name}
              </h3>
              <p className="font-serif italic text-sm text-[#A6B59A] mb-6">
                Symbolism: {selectedFlower.meaning}
              </p>

              <div className="bg-[#F4DCE0]/50 rounded-2xl p-6 border border-[#C98996]/30 mb-6">
                <p className="font-handwriting text-2xl sm:text-3xl text-[#493126] leading-relaxed">
                  "{selectedFlower.message}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-serif text-[#493126]/70">
                <span>With affection,</span>
                <span className="font-script text-xl text-[#672F43] font-normal">Eyuel</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
