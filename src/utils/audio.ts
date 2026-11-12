/**
 * Procedural Web Audio API Soundscape & Sound Effects
 * 
 * Provides peaceful, dreamy acoustic piano/harp arpeggios and delicate
 * micro-interaction sound effects with zero external audio assets required.
 * Also supports custom MP3 playback if an audio file is placed in /audio/music.mp3
 */

class BirthdayAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private sfxEnabled = true;
  private volume = 0.5;
  private loopTimer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pentatonic notes frequencies (Hz) for serene garden harp/piano
  private melodyNotes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    783.99, // G5
    880.00, // A5
    1046.50 // C6
  ];

  // Play a single soft piano/harp tone
  private playNote(freq: number, timeOffset: number, duration: number = 2.5, gainFactor: number = 1.0) {
    if (!this.ctx || this.isMuted) return;

    try {
      const t = this.ctx.currentTime + timeOffset;

      // Primary sine oscillator for pure sweet tone
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, t);

      // Warm harmonic overtone (triangle)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, t);

      // Low-pass filter for cozy warm vintage tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(1.2, t);

      // Gain envelope with soft attack and dreamy exponential decay
      const gainNode = this.ctx.createGain();
      const peakGain = 0.12 * this.volume * gainFactor;
      gainNode.gain.setValueAtTime(0.0001, t);
      gainNode.gain.exponentialRampToValueAtTime(peakGain, t + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      // Connect graph
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + duration);
      osc2.stop(t + duration);
    } catch {
      // Audio fallback safeguard
    }
  }

  // Play an ambient arpeggio phrase
  private playArpeggioPhrase() {
    if (!this.isPlaying || this.isMuted) return;

    // Peaceful chord progressions
    const progressions = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 220.00, 261.63, 349.23], // F major
      [196.00, 246.94, 293.66, 392.00], // G major
    ];

    const chord = progressions[Math.floor(Math.random() * progressions.length)];
    
    // Play root bass note warmly
    this.playNote(chord[0] / 2, 0, 4.0, 0.9);

    // Play sparkling arpeggio notes
    chord.forEach((freq, idx) => {
      const delay = idx * 0.35 + Math.random() * 0.05;
      this.playNote(freq, delay, 3.0, 0.8);
    });

    // Random sweet decorative high note
    if (Math.random() > 0.4) {
      const highNote = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      this.playNote(highNote, 1.6, 2.8, 0.6);
    }

    // Schedule next phrase in 3.5 to 5.5 seconds for natural, organic breathing rhythm
    const nextPhraseTime = 3800 + Math.random() * 1500;
    this.loopTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playArpeggioPhrase();
      }
    }, nextPhraseTime);
  }

  public async startMusic(): Promise<boolean> {
    try {
      this.initContext();
      this.isPlaying = true;

      // Check if custom audio is provided in public/audio/birthday.mp3
      if (!this.customAudio) {
        const testAudio = new Audio('/audio/birthday.mp3');
        testAudio.loop = true;
        testAudio.volume = this.volume;

        testAudio.addEventListener('canplaythrough', () => {
          this.customAudio = testAudio;
          if (this.isPlaying && !this.isMuted) {
            this.customAudio.play().catch(() => {
              // Fallback to procedural music
              this.customAudio = null;
              this.playArpeggioPhrase();
            });
          }
        });

        testAudio.addEventListener('error', () => {
          // If no custom MP3, use our procedural music
          this.customAudio = null;
        });

        testAudio.load();
      }

      if (this.customAudio) {
        await this.customAudio.play();
      } else {
        if (this.loopTimer) clearTimeout(this.loopTimer);
        this.playArpeggioPhrase();
      }

      return true;
    } catch {
      return false;
    }
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  public getSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  // --- Sound Effects (SFX) ---
  public playSfx(type: 'sparkle' | 'bloom' | 'unwrap' | 'wish' | 'pop' | 'secret') {
    if (!this.sfxEnabled || this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (type) {
      case 'sparkle': {
        // Shimmering chimes
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
          this.playNote(freq, i * 0.06, 1.2, 0.4);
        });
        break;
      }
      case 'bloom': {
        // Warm opening chord
        this.playNote(329.63, 0, 2.0, 0.6); // E4
        this.playNote(392.00, 0.08, 2.0, 0.6); // G4
        this.playNote(523.25, 0.16, 2.2, 0.7); // C5
        this.playNote(659.25, 0.24, 2.4, 0.8); // E5
        break;
      }
      case 'unwrap': {
        // Soft paper crackle / slide
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(350, t);
          osc.frequency.exponentialRampToValueAtTime(180, t + 0.18);
          gain.gain.setValueAtTime(0.08 * this.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.18);
        } catch {
          // ignore
        }
        break;
      }
      case 'wish': {
        // Ascending celestial glissando
        [440, 554.37, 659.25, 880, 1108.73, 1318.51].forEach((f, i) => {
          this.playNote(f, i * 0.12, 3.0, 0.7);
        });
        break;
      }
      case 'pop': {
        // Gentle bubble pop
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);
          gain.gain.setValueAtTime(0.12 * this.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.07);
        } catch {
          // ignore
        }
        break;
      }
      case 'secret': {
        // Grand magical Easter egg fanfare
        [392.00, 523.25, 659.25, 783.99, 1046.50, 1567.98].forEach((f, i) => {
          this.playNote(f, i * 0.09, 3.0, 0.9);
        });
        break;
      }
    }
  }
}

export const audioManager = new BirthdayAudioManager();

