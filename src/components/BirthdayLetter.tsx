import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Printer, Play, FastForward, Check, Sparkles, Edit3, X, RotateCcw, Languages } from 'lucide-react';
import { BIRTHDAY_DATA } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

const LETTER_STORAGE_KEY = 'eleni_eyuel_custom_letter_v4';

export const BirthdayLetter: React.FC = () => {
  const defaultFullText = BIRTHDAY_DATA.letter.paragraphs.join('\n\n');

  // Load custom letter if Eyuel wrote his own
  const [customLetterData, setCustomLetterData] = useState<{
    salutation: string;
    body: string;
    closing: string;
    signature: string;
  }>(() => {
    try {
      const saved = localStorage.getItem(LETTER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      salutation: BIRTHDAY_DATA.letter.salutation,
      body: defaultFullText,
      closing: BIRTHDAY_DATA.letter.closing,
      signature: BIRTHDAY_DATA.letter.signatureName,
    };
  });

  const [displayedText, setDisplayedText] = useState(customLetterData.body);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(false);

  // Editor form states
  const [editSalutation, setEditSalutation] = useState(customLetterData.salutation);
  const [editBody, setEditBody] = useState(customLetterData.body);
  const [editClosing, setEditClosing] = useState(customLetterData.closing);
  const [editSignature, setEditSignature] = useState(customLetterData.signature);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LETTER_STORAGE_KEY, JSON.stringify(customLetterData));
    } catch {
      // ignore
    }
  }, [customLetterData]);

  // Typewriter effect simulation
  useEffect(() => {
    let index = 0;
    let timer: number;

    const targetText = showEnglishTranslation ? BIRTHDAY_DATA.letter.englishTranslation : customLetterData.body;

    if (isTyping && index < targetText.length) {
      timer = window.setInterval(() => {
        if (index < targetText.length) {
          setDisplayedText(targetText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          setIsCompleted(true);
        }
      }, 20);
    }

    return () => clearInterval(timer);
  }, [isTyping, customLetterData.body, showEnglishTranslation]);

  const handleStartTypewriter = () => {
    audioManager.playSfx('sparkle');
    setDisplayedText('');
    setIsCompleted(false);
    setIsTyping(true);
  };

  const handleReadInstantly = () => {
    audioManager.playSfx('pop');
    setDisplayedText(showEnglishTranslation ? BIRTHDAY_DATA.letter.englishTranslation : customLetterData.body);
    setIsTyping(false);
    setIsCompleted(true);
  };

  const handleToggleTranslation = () => {
    audioManager.playSfx('pop');
    const nextState = !showEnglishTranslation;
    setShowEnglishTranslation(nextState);
    setDisplayedText(nextState ? BIRTHDAY_DATA.letter.englishTranslation : customLetterData.body);
    setIsCompleted(true);
    setIsTyping(false);
  };

  const handlePrint = () => {
    audioManager.playSfx('unwrap');
    window.print();
  };

  const handleCopy = () => {
    const textToCopy = showEnglishTranslation 
      ? BIRTHDAY_DATA.letter.englishTranslation
      : `${customLetterData.salutation}\n\n${customLetterData.body}\n\n${customLetterData.closing}\n${customLetterData.signature}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    audioManager.playSfx('sparkle');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenEditor = () => {
    audioManager.playSfx('pop');
    setEditSalutation(customLetterData.salutation);
    setEditBody(customLetterData.body);
    setEditClosing(customLetterData.closing);
    setEditSignature(customLetterData.signature);
    setIsEditorOpen(true);
  };

  const handleSaveCustomLetter = (e: React.FormEvent) => {
    e.preventDefault();
    audioManager.playSfx('sparkle');

    const nextData = {
      salutation: editSalutation.trim() || 'endet nesh lishaaaaa,',
      body: editBody.trim() || defaultFullText,
      closing: editClosing.trim() || 'Love you always, Sis!',
      signature: editSignature.trim() || 'Eyuel ❤️',
    };

    setCustomLetterData(nextData);
    setDisplayedText(nextData.body);
    setShowEnglishTranslation(false);
    setIsCompleted(true);
    setIsEditorOpen(false);
  };

  const handleResetLetter = () => {
    if (window.confirm("Reset letter back to Eyuel's original words?")) {
      const resetData = {
        salutation: BIRTHDAY_DATA.letter.salutation,
        body: defaultFullText,
        closing: BIRTHDAY_DATA.letter.closing,
        signature: BIRTHDAY_DATA.letter.signatureName,
      };
      setCustomLetterData(resetData);
      setDisplayedText(defaultFullText);
      setShowEnglishTranslation(false);
      localStorage.removeItem(LETTER_STORAGE_KEY);
      setIsEditorOpen(false);
    }
  };

  return (
    <section 
      id="letter"
      className="relative min-h-screen py-16 sm:py-24 px-4 max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D8B978]/25 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3 border border-[#D8B978]/40">
          <Heart className="w-3.5 h-3.5 text-[#672F43]" />
          <span>The Heartfelt Centerpiece</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-2">
          {BIRTHDAY_DATA.letter.heading}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#493126]/80 leading-relaxed px-2">
          Eyuel's authentic, unfiltered words straight from his heart to Lilisha.
        </p>

        {/* Mobile-Friendly Control Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleToggleTranslation}
            className={`px-3 py-2 rounded-full text-xs font-serif tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer active:scale-95 ${
              showEnglishTranslation
                ? 'bg-[#672F43] text-[#FFF9F0] border-[#672F43]'
                : 'bg-[#FFF9F0] text-[#672F43] border-[#D8B978]/50 hover:bg-[#F4DCE0]'
            }`}
            title="Toggle between Eyuel's original words and English translation"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{showEnglishTranslation ? 'Original Words' : 'English Translation'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenEditor}
            className="px-3.5 py-2 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif tracking-wider flex items-center gap-1.5 shadow-xs hover:bg-[#493126] transition-all cursor-pointer active:scale-95"
            title="Edit message"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D8B978]" />
            <span className="font-medium">Edit Letter</span>
          </button>

          <button
            type="button"
            onClick={handleStartTypewriter}
            className="px-3 py-2 rounded-full bg-[#F4DCE0] hover:bg-[#C98996]/30 text-[#672F43] text-xs font-serif tracking-wider flex items-center gap-1 border border-[#D8B978]/40 transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-3 h-3" />
            <span>Typewriter</span>
          </button>

          <button
            type="button"
            onClick={handleReadInstantly}
            className="px-3 py-2 rounded-full bg-[#FFF9F0] hover:bg-[#F4DCE0] text-[#493126] text-xs font-serif tracking-wider flex items-center gap-1 border border-[#D8B978]/40 transition-all cursor-pointer active:scale-95"
          >
            <FastForward className="w-3 h-3" />
            <span>Read Instantly</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-full bg-[#FFF9F0] hover:bg-[#F4DCE0] text-[#493126] text-xs font-serif tracking-wider flex items-center gap-1 border border-[#D8B978]/40 transition-all cursor-pointer active:scale-95"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Sparkles className="w-3 h-3 text-[#D8B978]" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-2 rounded-full bg-[#FFF9F0] hover:bg-[#F4DCE0] text-[#493126] text-xs font-serif tracking-wider flex items-center gap-1 border border-[#D8B978]/40 transition-all cursor-pointer active:scale-95 hidden sm:inline-flex"
          >
            <Printer className="w-3 h-3" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Textured Vintage Ivory Stationery Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-[#FFF9F0] rounded-3xl p-6 sm:p-12 border-2 border-[#D8B978] shadow-2xl relative overflow-hidden paper-texture"
      >
        {/* Vintage Postage Stamp (Top Right) */}
        <div className="absolute top-5 right-5 w-14 h-18 sm:w-20 sm:h-24 bg-[#F4DCE0] border-2 border-dashed border-[#C98996] rounded-xs p-1 sm:p-1.5 flex flex-col items-center justify-between text-center select-none shadow-xs rotate-2">
          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-[#672F43]">
            PAR AVION
          </span>
          <span className="text-xl sm:text-3xl">🌸</span>
          <span className="text-[9px] sm:text-[10px] font-serif font-bold text-[#672F43]">
            NOV 2
          </span>
        </div>

        {/* Letter Date & Tag */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="font-serif italic text-xs sm:text-sm text-[#A6B59A]">
            {BIRTHDAY_DATA.letter.date}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D8B978]/20 text-[#672F43] font-semibold">
            {showEnglishTranslation ? 'English Version' : 'Original Message'}
          </span>
        </div>

        {/* Salutation */}
        {!showEnglishTranslation && (
          <h3 className="font-script text-3xl sm:text-5xl text-[#672F43] font-normal mb-6 sm:mb-8 pr-16">
            {customLetterData.salutation}
          </h3>
        )}

        {/* Main Body with Handwritten Script & Smooth Flow */}
        <div className="font-handwriting text-2xl sm:text-3.5xl text-[#493126] leading-relaxed sm:leading-loose space-y-4 sm:space-y-6 max-w-2xl whitespace-pre-line">
          {displayedText}
          {isTyping && (
            <span className="inline-block w-1.5 h-5 bg-[#672F43] ml-1 animate-pulse" />
          )}
        </div>

        {/* Letter Signoff */}
        {isCompleted && !showEnglishTranslation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#D8B978]/40 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4"
          >
            <div>
              <p className="font-serif text-lg sm:text-2xl font-semibold text-[#672F43] mb-1">
                {customLetterData.closing}
              </p>
              <p className="font-serif italic text-xs sm:text-sm text-[#493126]/80">
                {BIRTHDAY_DATA.letter.signatureGreeting}
              </p>
              <p className="font-script text-2xl sm:text-4xl text-[#672F43] font-normal">
                {customLetterData.signature}
              </p>
            </div>

            {/* Embossed Burgundy Wax Seal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#672F43] border-4 border-[#FFF9F0] shadow-xl flex items-center justify-center text-[#D8B978] shadow-[#672F43]/30 select-none shrink-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#D8B978]/50 flex flex-col items-center justify-center">
                <span className="font-serif text-[8px] sm:text-[10px] tracking-widest uppercase">EYUEL</span>
                <span className="text-[10px]">✦</span>
                <span className="font-serif text-[8px] sm:text-[10px] tracking-widest uppercase">LILISHA</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Eyuel's Personal Letter Composer (Mobile-Friendly Bottom Sheet / Modal) */}
      <AnimatePresence>
        {isEditorOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#493126]/60 backdrop-blur-xs"
            onClick={() => setIsEditorOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#FFF9F0] rounded-t-3xl sm:rounded-3xl p-6 border-t-2 sm:border-2 border-[#D8B978] shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-[#D8B978]/60 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#672F43]" />
                  <h4 className="font-serif text-xl text-[#672F43] font-bold">
                    Edit Your Message
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 rounded-full text-[#493126] hover:bg-[#F4DCE0] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-sans text-xs text-[#493126]/80 mb-4">
                Eyuel, edit your message here. It updates immediately on the stationery:
              </p>

              <form onSubmit={handleSaveCustomLetter} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Greeting
                  </label>
                  <input
                    type="text"
                    value={editSalutation}
                    onChange={(e) => setEditSalutation(e.target.value)}
                    placeholder="endet nesh lishaaaaa,"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D8B978]/60 bg-white text-xs sm:text-sm text-[#493126] focus:outline-hidden focus:border-[#672F43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Message Body
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    placeholder="Write your words here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8B978]/60 bg-white text-xs sm:text-sm text-[#493126] focus:outline-hidden focus:border-[#672F43] leading-relaxed resize-y"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                      Closing Wish
                    </label>
                    <input
                      type="text"
                      value={editClosing}
                      onChange={(e) => setEditClosing(e.target.value)}
                      placeholder="Love you always, Sis!"
                      className="w-full px-3 py-2 rounded-xl border border-[#D8B978]/60 bg-white text-xs text-[#493126] focus:outline-hidden focus:border-[#672F43]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                      Signature
                    </label>
                    <input
                      type="text"
                      value={editSignature}
                      onChange={(e) => setEditSignature(e.target.value)}
                      placeholder="Eyuel ❤️"
                      className="w-full px-3 py-2 rounded-xl border border-[#D8B978]/60 bg-white text-xs text-[#493126] focus:outline-hidden focus:border-[#672F43]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetLetter}
                    className="text-xs font-serif text-[#C98996] hover:text-[#672F43] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditorOpen(false)}
                      className="px-4 py-2 text-xs font-serif text-stone-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif tracking-wider uppercase font-semibold cursor-pointer shadow-sm active:scale-95"
                    >
                      Save Letter
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
