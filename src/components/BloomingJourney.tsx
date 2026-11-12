import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { BIRTHDAY_DATA, type BloomingStage } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

const STORAGE_KEY = 'eleni_blooming_photos_v2';

export const BloomingJourney: React.FC = () => {
  const [stages, setStages] = useState<BloomingStage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === BIRTHDAY_DATA.bloomingJourney.stages.length) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return BIRTHDAY_DATA.bloomingJourney.stages;
  });

  const [activeStageId, setActiveStageId] = useState<string>(stages[0]?.id || 'bloom-1');
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState(false);
  const [targetStageId, setTargetStageId] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stages));
    } catch {
      // ignore
    }
  }, [stages]);

  const activeIndex = stages.findIndex(s => s.id === activeStageId);
  const currentStage = stages[activeIndex] || stages[0];

  const handleNext = () => {
    audioManager.playSfx('bloom');
    const nextIdx = (activeIndex + 1) % stages.length;
    setActiveStageId(stages[nextIdx].id);
  };

  const handlePrev = () => {
    audioManager.playSfx('bloom');
    const prevIdx = (activeIndex - 1 + stages.length) % stages.length;
    setActiveStageId(stages[prevIdx].id);
  };

  const openUploader = (stageId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioManager.playSfx('pop');
    const stage = stages.find(s => s.id === stageId);
    setTargetStageId(stageId);
    setUploadedUrl(stage?.photoUrl || '');
    setIsPhotoUploaderOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStageId) return;

    audioManager.playSfx('sparkle');
    setStages(prev => prev.map(s => s.id === targetStageId ? {
      ...s,
      photoUrl: uploadedUrl || s.photoUrl,
    } : s));

    setIsPhotoUploaderOpen(false);
  };

  return (
    <section 
      id="blooming"
      className="relative py-12 sm:py-16 px-3 sm:px-4 max-w-lg sm:max-w-2xl mx-auto flex flex-col items-center select-none"
    >
      {/* Header Badge */}
      <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4DCE0] text-[#672F43] text-xs font-serif tracking-widest uppercase mb-2 border border-[#D8B978]/40 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B978]" />
          <span>{BIRTHDAY_DATA.bloomingJourney.sectionBadge}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#672F43] font-semibold mb-1 leading-tight">
          {BIRTHDAY_DATA.bloomingJourney.title}
        </h2>
      </div>

      {/* Mobile Chapter Progress Tabs (Scrollable Thumb Bar) */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none mb-3">
        <div className="flex items-center gap-1.5 min-w-max px-1">
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  audioManager.playSfx('bloom');
                  setActiveStageId(stage.id);
                }}
                className={`py-1.5 px-3 rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#672F43] text-[#FFF9F0] border-[#D8B978] shadow-md scale-102'
                    : 'bg-[#FFF9F0] text-[#493126] border-[#D8B978]/40 hover:bg-[#F4DCE0]/50'
                }`}
              >
                <span className="text-base">{stage.flowerIcon}</span>
                <span className="font-serif text-xs font-bold whitespace-nowrap">
                  Photo {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mobile Card: Pure, Clean, Beautiful Photo Display */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-[#FFF9F0] rounded-3xl p-3 sm:p-5 border-2 border-[#D8B978] shadow-xl relative overflow-hidden flex flex-col items-center"
          >
            {/* Top Minimal Bar */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#F4DCE0] text-sm flex items-center justify-center border border-[#D8B978]/50 shadow-2xs">
                  {currentStage.flowerIcon}
                </span>
                <span className="font-serif text-sm font-semibold text-[#672F43]">
                  {currentStage.chapterNumber}
                </span>
              </div>

              {/* Upload Photo Option for Eyuel */}
              <button
                type="button"
                onClick={(e) => openUploader(currentStage.id, e)}
                className="p-1.5 rounded-full bg-[#F4DCE0] hover:bg-[#C98996]/30 text-[#672F43] cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="Change or update photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clean, Full, Large Photo Frame (Zero Text Inside or Under) */}
            <div className="relative w-full aspect-3/4 sm:aspect-4/5 max-h-[70vh] rounded-2xl overflow-hidden border-2 border-[#D8B978]/60 shadow-lg bg-[#F4DCE0]">
              <img
                src={currentStage.photoUrl}
                alt={currentStage.title}
                className="w-full h-full object-cover filter sepia-[0.02]"
                loading="lazy"
              />
            </div>

            {/* Mobile Navigation Arrows (Previous / Counter / Next) */}
            <div className="w-full flex items-center justify-between pt-3 px-1 mt-1">
              <button
                type="button"
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-full border border-[#D8B978] text-[#493126] hover:bg-[#F4DCE0] text-xs font-serif flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="font-serif text-xs text-[#672F43] font-bold">
                {activeIndex + 1} / {stages.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="px-3.5 py-1.5 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile-Friendly Photo Uploader Modal */}
      <AnimatePresence>
        {isPhotoUploaderOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#493126]/60 backdrop-blur-xs"
            onClick={() => setIsPhotoUploaderOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#FFF9F0] rounded-t-3xl sm:rounded-3xl p-5 border-t-2 sm:border-2 border-[#D8B978] shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-[#D8B978]/60 rounded-full mx-auto mb-3 sm:hidden" />

              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-lg text-[#672F43] font-bold">
                  Update Photo
                </h4>
                <button
                  type="button"
                  onClick={() => setIsPhotoUploaderOpen(false)}
                  className="p-1.5 rounded-full text-[#493126] hover:bg-[#F4DCE0] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-3.5">
                <div>
                  <label className="w-full py-3 px-4 rounded-2xl bg-[#F4DCE0] hover:bg-[#C98996]/30 border-2 border-dashed border-[#C98996] text-[#672F43] font-serif text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98">
                    <Camera className="w-4 h-4" />
                    <span>Choose Photo from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Or Image Path / URL
                  </label>
                  <input
                    type="text"
                    value={uploadedUrl.startsWith('data:') ? '' : uploadedUrl}
                    onChange={(e) => setUploadedUrl(e.target.value)}
                    placeholder="/images/photo.jpg or https://..."
                    className="w-full px-3 py-2 rounded-xl border border-[#D8B978]/60 bg-white text-xs text-[#493126] focus:outline-hidden focus:border-[#672F43]"
                  />
                  {uploadedUrl.startsWith('data:') && (
                    <span className="text-[11px] text-emerald-700 mt-0.5 block">
                      ✓ Image loaded from your device
                    </span>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsPhotoUploaderOpen(false)}
                    className="px-3.5 py-2 text-xs font-serif text-stone-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif tracking-wider uppercase font-semibold cursor-pointer shadow-xs active:scale-95"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
