import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart, Compass } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section for active indicator
      const sectionIds = ['hero', 'blooming', 'garden', 'chocolates', 'cakes', 'wishes', 'scrapbook', 'letter', 'wishing-fountain', 'finale'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How You Bloomed', href: '#blooming', icon: '🌿', id: 'blooming' },
    { label: 'Flower Garden', href: '#garden', icon: '🌷', id: 'garden' },
    { label: 'Chocolates', href: '#chocolates', icon: '🍫', id: 'chocolates' },
    { label: 'Milifoni & Cakes', href: '#cakes', icon: '🎂', id: 'cakes' },
    { label: '29 Wishes', href: '#wishes', icon: '💌', id: 'wishes' },
    { label: 'Scrapbook', href: '#scrapbook', icon: '📷', id: 'scrapbook' },
    { label: 'Letter From Eyuel', href: '#letter', icon: '📜', id: 'letter' },
    { label: 'Make a Wish', href: '#wishing-fountain', icon: '🪷', id: 'wishing-fountain' },
  ];

  const handleNavClick = (href: string) => {
    audioManager.playSfx('pop');
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Mobile & Desktop Bar */}
      <header 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#D8B978]/30 shadow-xs py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Monogram / Title */}
          <button
            type="button"
            onClick={() => {
              audioManager.playSfx('pop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer text-left active:scale-95 transition-transform"
            aria-label="Scroll to top of Lilisha's Birthday Website"
          >
            <div className="w-8 h-8 rounded-full bg-[#F4DCE0] border border-[#D8B978]/60 flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform">
              🌸
            </div>
            <div>
              <span className="font-serif font-bold text-[#672F43] text-sm sm:text-base tracking-tight block">
                {BIRTHDAY_DATA.sisterName}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-widest uppercase text-[#A6B59A] block -mt-1 font-semibold">
                Nov 2 • 29th Birthday
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`text-xs uppercase font-serif tracking-widest transition-colors cursor-pointer py-1 relative group ${
                  activeSection === item.id ? 'text-[#672F43] font-bold' : 'text-[#493126]/80 hover:text-[#672F43]'
                }`}
              >
                <span>{item.label}</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#C98996] rounded-full transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </nav>

          {/* Top Right Dedicated Pill & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4DCE0]/70 border border-[#D8B978]/40 text-xs font-serif text-[#672F43]">
              <Heart className="w-3 h-3 fill-current text-[#672F43]" />
              <span>Gift from Eyuel</span>
            </div>

            {/* Mobile All-Chapters Drawer Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#672F43] hover:bg-[#F4DCE0] active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open all chapters"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <>
                  <Compass className="w-4 h-4 text-[#D8B978]" />
                  <span className="font-serif text-xs font-medium">Chapters</span>
                  <Menu className="w-5 h-5 ml-0.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Chapters Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF9F0]/98 backdrop-blur-md border-b border-[#D8B978]/40 shadow-2xl px-5 py-6 animate-fade-in flex flex-col gap-2.5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D8B978]" />
              <span className="font-serif text-xs uppercase tracking-widest text-[#672F43] font-semibold">
                Chapters in Lilisha's World
              </span>
              <Sparkles className="w-4 h-4 text-[#D8B978]" />
            </div>

            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`py-3 px-4 rounded-2xl font-serif text-base text-[#493126] hover:text-[#672F43] transition-colors flex items-center justify-between border cursor-pointer active:scale-98 ${
                  activeSection === item.id
                    ? 'bg-[#F4DCE0] border-[#C98996] text-[#672F43] font-bold'
                    : 'bg-white/60 border-[#D8B978]/30'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
                <span className="text-xs text-[#A6B59A]">→</span>
              </button>
            ))}

            <div className="pt-2 text-xs font-serif text-[#A6B59A] italic">
              Made with brotherly love by Eyuel ❤️
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Thumb Strip */}
      <nav 
        className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#FFF9F0]/95 backdrop-blur-md rounded-2xl border border-[#D8B978]/60 shadow-lg shadow-[#493126]/10 px-2 py-1.5 flex items-center justify-around select-none"
        aria-label="Mobile Bottom Navigation"
      >
        <button
          type="button"
          onClick={() => {
            audioManager.playSfx('pop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'hero' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">🌸</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">Intro</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('#blooming')}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'blooming' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">🌿</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">Bloomed</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('#cakes')}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'cakes' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">🎂</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">Cakes</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('#chocolates')}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'chocolates' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">🍫</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">Choco</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('#wishes')}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'wishes' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">💌</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">29 Wishes</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('#letter')}
          className={`flex flex-col items-center p-1 rounded-xl cursor-pointer active:scale-95 transition-all ${
            activeSection === 'letter' ? 'text-[#672F43] font-bold' : 'text-[#493126]/70'
          }`}
        >
          <span className="text-base">📜</span>
          <span className="text-[9px] font-serif leading-none mt-0.5">Letter</span>
        </button>
      </nav>
    </>
  );
};
