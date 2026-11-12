import React, { useState } from 'react';
import { OpeningGift } from './components/OpeningGift';
import { FloatingPetals } from './components/FloatingPetals';
import { Navigation } from './components/Navigation';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { BloomingJourney } from './components/BloomingJourney';
import { FlowerGarden } from './components/FlowerGarden';
import { ChocolateFactory } from './components/ChocolateFactory';
import { CakesSection } from './components/CakesSection';
import { WishesSection } from './components/WishesSection';
import { ScrapbookSection } from './components/ScrapbookSection';
import { BirthdayLetter } from './components/BirthdayLetter';
import { MakeAWish } from './components/MakeAWish';
import { SecretMessage } from './components/SecretMessage';
import { GrandFinale } from './components/GrandFinale';

// Delicate botanical divider ornament
const SectionDivider: React.FC = () => (
  <div className="relative py-8 sm:py-12 flex items-center justify-center pointer-events-none select-none max-w-sm sm:max-w-xl mx-auto px-6" aria-hidden="true">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D8B978]/60 to-transparent" />
    <div className="px-3 text-[#C98996] text-base sm:text-lg flex items-center gap-1.5 bg-[#FFF9F0]">
      <span>🌸</span>
      <span className="text-[10px] text-[#D8B978]">✦</span>
      <span>🌿</span>
    </div>
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D8B978]/60 to-transparent" />
  </div>
);

export const App: React.FC = () => {
  const [hasOpenedGift, setHasOpenedGift] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#493126] font-sans relative selection:bg-[#F4DCE0] selection:text-[#672F43] overflow-x-hidden">
      {/* 1. The Opening Gift Experience */}
      {!hasOpenedGift && (
        <OpeningGift onOpenComplete={() => setHasOpenedGift(true)} />
      )}

      {/* Floating Botanical Petals & Leaves */}
      <FloatingPetals />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Hidden Sibling Easter Egg Trigger */}
      <SecretMessage />

      {/* Main Website Experience (visible after opening) */}
      {hasOpenedGift && (
        <>
          {/* Top & Bottom Navigation Bars */}
          <Navigation />

          <main className="relative z-20 pb-24 md:pb-12 max-w-7xl mx-auto">
            {/* The Hero */}
            <HeroSection />

            <SectionDivider />

            {/* Chapter 1: How You Bloomed (29 Years of Evolution & Motherhood) */}
            <BloomingJourney />

            <SectionDivider />

            {/* Chapter 2: The Digital Flower Garden */}
            <FlowerGarden />

            <SectionDivider />

            {/* Chapter 3: The Artisan Chocolate Box */}
            <ChocolateFactory />

            <SectionDivider />

            {/* Chapter 4: Lilisha's Birthday Patisserie (Milifoni, Opera, Boxegna, etc.) */}
            <CakesSection />

            <SectionDivider />

            {/* Chapter 5: 29 Wishes for 29 Years */}
            <WishesSection />

            <SectionDivider />

            {/* Chapter 6: Sibling Memory Scrapbook */}
            <ScrapbookSection />

            <SectionDivider />

            {/* Chapter 7: The Personal Birthday Letter from Eyuel */}
            <BirthdayLetter />

            <SectionDivider />

            {/* Chapter 8: Make a Wish (Private Celestial Well) */}
            <MakeAWish />

            <SectionDivider />

            {/* Chapter 9: The Grand Finale */}
            <GrandFinale onReplay={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setHasOpenedGift(false);
            }} />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
