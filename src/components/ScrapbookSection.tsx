import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Plus, X, ChevronLeft, ChevronRight, Edit3, Image as ImageIcon } from 'lucide-react';
import { BIRTHDAY_DATA, type ScrapbookMemory } from '../config/birthdayData';
import { audioManager } from '../utils/audio';

const STORAGE_KEY = 'eleni_scrapbook_custom_memories_v2';

export const ScrapbookSection: React.FC = () => {
  const [memories, setMemories] = useState<ScrapbookMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return BIRTHDAY_DATA.scrapbook.memories;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingMemory, setEditingMemory] = useState<ScrapbookMemory | null>(null);

  // Form states for adding/editing a memory
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ScrapbookMemory['category']>('Childhood');
  const [formDate, setFormDate] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formImage, setFormImage] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch {
      // ignore
    }
  }, [memories]);

  // Native dialog control for lightbox conforming to modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxIndex !== null) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [lightboxIndex]);

  const categories = ['All', 'Childhood', 'Family Moments', 'Funny Moments', 'Special Occasions', 'Adventures'];

  const filteredMemories = activeCategory === 'All'
    ? memories
    : memories.filter(m => m.category === activeCategory);

  const openLightbox = (index: number) => {
    audioManager.playSfx('unwrap');
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredMemories.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredMemories.length) % filteredMemories.length);
    }
  };

  const handleStartAdd = () => {
    audioManager.playSfx('pop');
    setEditingMemory(null);
    setFormTitle('');
    setFormCategory('Childhood');
    setFormDate('');
    setFormCaption('');
    setFormImage('');
    setIsEditorOpen(true);
  };

  const handleStartEdit = (mem: ScrapbookMemory, e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.playSfx('pop');
    setEditingMemory(mem);
    setFormTitle(mem.title);
    setFormCategory(mem.category);
    setFormDate(mem.date);
    setFormCaption(mem.caption);
    setFormImage(mem.imageUrl);
    setIsEditorOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    audioManager.playSfx('sparkle');

    const defaultImage = "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80";

    if (editingMemory) {
      // Update existing
      setMemories(prev => prev.map(m => m.id === editingMemory.id ? {
        ...m,
        title: formTitle || 'A Cherished Moment',
        category: formCategory,
        date: formDate || 'Fond Memory',
        caption: formCaption || 'Some memories never get old.',
        imageUrl: formImage || m.imageUrl,
      } : m));
    } else {
      // Create new
      const newMem: ScrapbookMemory = {
        id: `mem-${Date.now()}`,
        title: formTitle || 'New Sibling Memory',
        category: formCategory,
        date: formDate || 'Unforgettable Day',
        caption: formCaption || 'Some memories never get old.',
        imageUrl: formImage || defaultImage,
        rotation: Math.random() > 0.5 ? 'rotate-1' : '-rotate-1',
      };
      setMemories(prev => [newMem, ...prev]);
    }

    setIsEditorOpen(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Reset scrapbook memories back to default template?")) {
      setMemories(BIRTHDAY_DATA.scrapbook.memories);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const currentMemory = lightboxIndex !== null ? filteredMemories[lightboxIndex] : null;

  return (
    <section 
      id="scrapbook"
      className="relative min-h-screen py-24 px-4 max-w-7xl mx-auto flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A6B59A]/20 text-[#493126] text-xs font-serif tracking-widest uppercase mb-3">
          <Camera className="w-3.5 h-3.5 text-[#672F43]" />
          Vintage Sibling Keepsake
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#672F43] font-semibold mb-2">
          {BIRTHDAY_DATA.scrapbook.title}
        </h2>
        <p className="font-script text-2xl text-[#C98996] mb-3">
          "{BIRTHDAY_DATA.scrapbook.subtitle}"
        </p>
        <p className="font-sans text-sm sm:text-base text-[#493126]/80 leading-relaxed mb-6">
          {BIRTHDAY_DATA.scrapbook.description}
        </p>

        {/* Action Buttons for Eyuel */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleStartAdd}
            className="px-5 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif tracking-wider uppercase flex items-center gap-2 shadow-sm hover:bg-[#493126] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D8B978]" />
            <span>Add Sibling Photograph</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2 rounded-full border border-[#D8B978]/60 text-xs font-serif text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
          >
            Reset Album
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-serif tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#672F43] text-[#FFF9F0]'
                  : 'bg-[#FFF9F0] text-[#493126] border border-[#D8B978]/40 hover:bg-[#F4DCE0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
        {filteredMemories.map((mem, index) => {
          return (
            <motion.div
              key={mem.id}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className={`relative bg-[#FFF9F0] rounded-xl p-4 sm:p-5 shadow-lg border border-[#D8B978]/50 cursor-pointer flex flex-col group ${
                mem.rotation || ''
              } transition-transform duration-300`}
            >
              {/* Vintage Washi Tape Top Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#D8B978]/40 backdrop-blur-xs transform -rotate-1 rounded-xs shadow-2xs pointer-events-none" />

              {/* Edit button */}
              <button
                type="button"
                onClick={(e) => handleStartEdit(mem, e)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-[#FFF9F0]/90 text-[#672F43] opacity-0 group-hover:opacity-100 hover:bg-[#F4DCE0] transition-all cursor-pointer shadow-xs"
                title="Edit this photo and caption"
                aria-label="Edit memory"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {/* Photo Box */}
              <div className="relative aspect-4/3 w-full bg-[#F4DCE0] rounded-lg overflow-hidden shadow-sm">
                <img
                  src={mem.imageUrl}
                  alt="Lilisha memory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter sepia-[0.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[#FFF9F0] text-[10px] font-serif italic">Tap to expand</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Native <dialog> Full-Screen Lightbox adhering to modern-web-guidance */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="lightbox-title"
        onClose={closeLightbox}
        className="fixed inset-0 m-auto max-w-4xl w-[95%] bg-[#FFF9F0] rounded-3xl p-6 sm:p-8 border-2 border-[#D8B978] shadow-2xl text-[#493126] overflow-y-auto"
      >
        {currentMemory && (
          <div className="relative flex flex-col items-center">
            {/* Close Button */}
            <form method="dialog" className="absolute top-0 right-0 z-20">
              <button
                type="submit"
                className="p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close photo gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </form>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevLightbox}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FFF9F0]/80 border border-[#D8B978] text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer z-10 hidden sm:flex"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={nextLightbox}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FFF9F0]/80 border border-[#D8B978] text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer z-10 hidden sm:flex"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image */}
            <div className="w-full max-h-[75vh] rounded-2xl overflow-hidden shadow-lg bg-black/5 flex items-center justify-center">
              <img
                src={currentMemory.imageUrl}
                alt="Expanded photograph"
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </dialog>

      {/* Add / Edit Memory Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#493126]/60 backdrop-blur-xs overflow-y-auto"
            onClick={() => setIsEditorOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FFF9F0] rounded-3xl p-6 sm:p-8 border-2 border-[#D8B978] shadow-2xl my-8 text-left"
            >
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#493126] hover:bg-[#F4DCE0] transition-colors cursor-pointer"
                aria-label="Close editor"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl text-[#672F43] font-semibold mb-1">
                {editingMemory ? 'Edit Scrapbook Memory' : 'Add a New Sibling Memory'}
              </h3>
              <p className="font-sans text-xs text-[#493126]/80 mb-6">
                Eyuel, you can upload real photos of Eleni and you, or paste a photo link, and write custom captions!
              </p>

              <form onSubmit={handleSaveMemory} className="space-y-4">
                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Camping Trip in the Highlands"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8B978]/60 bg-white text-sm focus:outline-hidden focus:border-[#672F43]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ScrapbookMemory['category'])}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D8B978]/60 bg-white text-xs focus:outline-hidden focus:border-[#672F43]"
                    >
                      <option value="Childhood">Childhood</option>
                      <option value="Family Moments">Family Moments</option>
                      <option value="Funny Moments">Funny Moments</option>
                      <option value="Special Occasions">Special Occasions</option>
                      <option value="Adventures">Adventures</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                      Date / Era
                    </label>
                    <input
                      type="text"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="e.g. Summer 2018"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D8B978]/60 bg-white text-xs focus:outline-hidden focus:border-[#672F43]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Handwritten Caption
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formCaption}
                    onChange={(e) => setFormCaption(e.target.value)}
                    placeholder="Write a sweet, funny, or memorable sibling note..."
                    className="w-full px-4 py-2 rounded-xl border border-[#D8B978]/60 bg-white text-sm focus:outline-hidden focus:border-[#672F43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-[#493126] mb-1 font-semibold">
                    Upload Photograph
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 rounded-xl bg-[#F4DCE0] hover:bg-[#C98996]/30 text-[#672F43] text-xs font-serif cursor-pointer border border-[#D8B978]/40 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Choose Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-[#A6B59A] truncate max-w-xs">
                      {formImage ? 'Image Selected ✓' : 'Or enter URL below'}
                    </span>
                  </div>
                  <input
                    type="url"
                    value={formImage.startsWith('data:') ? '' : formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full mt-2 px-3 py-2 rounded-xl border border-[#D8B978]/40 bg-white text-xs text-stone-600 focus:outline-hidden"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 text-xs font-serif text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#672F43] text-[#FFF9F0] text-xs font-serif tracking-wider uppercase hover:bg-[#493126] shadow-sm cursor-pointer"
                  >
                    Save Memory
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
