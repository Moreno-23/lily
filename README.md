# 🌸 A Little World for Eleni — 29th Birthday Experience

> *"29 Years of You — A Little World Made Just for You."*  
> **A personal birthday gift from her brother, Eyuel.**

---

## ✨ Overview

This website is a custom, interactive 29th birthday digital world created specifically for **Eleni** by her brother **Eyuel**. Built with a **sophisticated floral fairytale** aesthetic, it combines:
- A luxury flower boutique and English garden in spring
- An artisan chocolate gift box with sibling humor
- An interactive collection of 29 unique birthday wishes
- A vintage sibling memory scrapbook with custom photo uploading
- The heartfelt centerpiece birthday letter on textured stationery
- A private celestial wishing fountain
- A grand finale celebration with petals, confetti, and flying butterflies
- Atmospheric procedural piano/harp soundscape via Web Audio API (zero external broken links) + optional custom MP3 support

---

## 🎨 Visual Identity & Color Palette

- **Warm Ivory:** `#FFF9F0` (Main background)
- **Blush Pink:** `#F4DCE0` (Soft petals & accents)
- **Dusty Rose:** `#C98996` (Floral highlights)
- **Burgundy:** `#672F43` (Headings & wax seal)
- **Sage Green:** `#A6B59A` (Botanical foliage)
- **Champagne Gold:** `#D8B978` (Sparkles, ribbons & borders)
- **Chocolate Brown:** `#493126` (Body typography & chocolate box)

---

## 🚀 Quick Start Guide

### 1. Run the Development Server
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized production website will be generated in the `dist/` directory, ready to deploy to Netlify, Vercel, GitHub Pages, or any static web host.

---

## 📝 Personalization Guide (For Eyuel)

All content is centralized in **`src/config/birthdayData.ts`**. You do not need to search through component files to update text or photos:

| Setting | Location in `src/config/birthdayData.ts` | What it Controls |
| :--- | :--- | :--- |
| **Names & Age** | `sisterName`, `brotherName`, `age` | Updates names and ages across the entire site |
| **Opening Gift** | `opening` | The greeting notes and button text on the gift box |
| **Flower Garden** | `garden.flowers` | The flowers, scientific names, and brotherly messages |
| **Chocolates** | `chocolates.items` | The artisan chocolates, flavors, and funny sibling laws |
| **29 Wishes** | `wishes` | All 29 individual envelopes and wishes for her 29th year |
| **Scrapbook** | `scrapbook.memories` | Default photos and captions (also editable directly in the UI!) |
| **Birthday Letter** | `letter` | The emotional centerpiece letter from Eyuel |
| **Wishing Well** | `wishingWell` | The prompt and blessing for her private celestial wish |
| **Easter Egg** | `secret` | The hidden brotherly message revealed by the golden star |

### Adding Real Sibling Photographs
There are two easy ways:
1. **Directly in the Browser:** Click the **"Add Sibling Photograph"** or **"Edit"** button on any polaroid in the Scrapbook section. You can upload an image file directly from your computer or phone!
2. **In Code:** Put your photos in the `public/images/` folder and link them in `src/config/birthdayData.ts`.

### Custom Background Music (Optional)
The website already generates a calming, procedural ambient piano and harp soundscape directly in the browser with zero external dependencies. If you prefer to play a specific custom song:
1. Create a folder `public/audio/`
2. Save your audio file as `birthday.mp3` inside `public/audio/`
3. The audio player will automatically detect and play your custom soundtrack!

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (lightning-fast build & HMR)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (60 FPS fluid botanical animations)
- **Canvas-Confetti** (champagne gold & blush celebrations)
- **Lucide Icons**
- **Web Audio API** (dreamy ambient arpeggios & physical SFX)

---

*Made with love by Eyuel for Eleni's 29th Birthday.*
