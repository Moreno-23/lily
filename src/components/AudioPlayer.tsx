import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';
import { BIRTHDAY_DATA } from '../config/birthdayData';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsPlaying(audioManager.getIsPlaying());
    setIsMuted(audioManager.getIsMuted());
    setVolume(audioManager.getVolume());
    setSfxEnabled(audioManager.getSfxEnabled());
  }, []);

  const handleTogglePlay = async () => {
    const playing = audioManager.toggleMusic();
    setIsPlaying(playing);
    if (playing) {
      audioManager.playSfx('sparkle');
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
    if (isMuted && val > 0) {
      audioManager.toggleMute();
      setIsMuted(false);
    }
  };

  const handleToggleSfx = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !sfxEnabled;
    setSfxEnabled(next);
    audioManager.setSfxEnabled(next);
    if (next) {
      audioManager.playSfx('pop');
    }
  };

  return (
    <div 
      className="fixed bottom-16 md:bottom-6 right-3 md:right-6 z-40 transition-all duration-300"
      role="region"
      aria-label="Birthday Soundtrack Controls"
    >
      <div className="bg-[#FFF9F0]/95 backdrop-blur-md border border-[#D8B978]/60 rounded-full shadow-lg shadow-[#493126]/10 p-2 flex items-center gap-2">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-serif text-sm tracking-wide transition-all duration-300 cursor-pointer ${
            isPlaying 
              ? 'bg-[#672F43] text-[#FFF9F0] shadow-sm' 
              : 'bg-[#F4DCE0] text-[#672F43] hover:bg-[#C98996]/30'
          }`}
          title={isPlaying ? "Pause Ambient Soundtrack" : "Play Ambient Soundtrack"}
          aria-label={isPlaying ? "Pause Ambient Soundtrack" : "Play Ambient Soundtrack"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline font-sans text-xs font-medium">Pause Music</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span className="hidden sm:inline font-sans text-xs font-medium">Play Music</span>
            </>
          )}

          {/* Equalizer animation when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
              <span className="w-0.5 h-full bg-[#D8B978] animate-[bounce_1s_infinite_100ms] rounded-full" />
              <span className="w-0.5 h-full bg-[#D8B978] animate-[bounce_1s_infinite_300ms] rounded-full" />
              <span className="w-0.5 h-full bg-[#D8B978] animate-[bounce_1s_infinite_200ms] rounded-full" />
            </div>
          )}
        </button>

        {/* Volume & Settings expander button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-[#672F43] hover:text-[#493126] hover:bg-[#F4DCE0]/60 rounded-full transition-colors cursor-pointer"
          title="Audio Settings"
          aria-label="Audio Settings"
          aria-expanded={isExpanded}
        >
          <Music className="w-4 h-4" />
        </button>

        {/* Expanded Controls Drawer */}
        {isExpanded && (
          <div className="flex items-center gap-3 pr-2 border-l border-[#D8B978]/40 pl-3 animate-fade-in">
            {/* Mute toggle */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="text-[#672F43] hover:text-[#493126] transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-700" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-[#F4DCE0] accent-[#672F43] rounded-lg cursor-pointer"
              aria-label="Soundtrack Volume"
            />

            {/* SFX Toggle */}
            <button
              type="button"
              onClick={handleToggleSfx}
              className={`p-1 rounded-full text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                sfxEnabled ? 'text-[#672F43]' : 'text-stone-400 line-through'
              }`}
              title="Toggle sound effects (sparkles & chimes)"
              aria-label="Toggle sound effects"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-mono hidden md:inline">SFX</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating subtle track attribution badge */}
      {!isPlaying && (
        <div className="absolute right-0 bottom-14 bg-[#FFF9F0]/90 text-[#672F43] text-[11px] px-3 py-1.5 rounded-xl border border-[#D8B978]/40 shadow-sm pointer-events-none whitespace-nowrap animate-bounce font-serif">
          🎵 {BIRTHDAY_DATA.audio.promptNotice}
        </div>
      )}
    </div>
  );
};

