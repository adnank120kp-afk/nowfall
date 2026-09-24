export type BGMMode = 'village' | 'highway' | 'city' | 'mountains' | 'rain' | 'beach' | 'mission' | 'night';

export interface BGMTrackInfo {
  id: BGMMode;
  title: string;
  malayalam: string;
  icon: string;
  desc: string;
}

export const BGM_MODES_INFO: BGMTrackInfo[] = [
  { id: 'village', title: 'Village Serenity', malayalam: 'ഗ്രാമീണ കാറ്റ് (Flute & Edakka)', icon: '🌴', desc: 'Bamboo flute, soft edakka rhythms & peaceful village birds' },
  { id: 'highway', title: 'Road Trip Groove', malayalam: 'ഹൈവേ യാത്ര (Guitar & Drums)', icon: '🛣️', desc: 'Punchy bass, acoustic guitar & driving road-trip groove' },
  { id: 'city', title: 'City Beat Pulse', malayalam: 'നഗരത്തിരക്ക് (Modern Beats)', icon: '🏙️', desc: 'Urban electronic pulse, energetic percussion & fast pace' },
  { id: 'mountains', title: 'Misty High Ranges', malayalam: 'മലയോര കാറ്റ് (Pads & Flute)', icon: '⛰️', desc: 'Dreamy cinematic pads, high ghats flute & cool mountain wind' },
  { id: 'beach', title: 'Coastal Breeze', malayalam: 'കടൽത്തീരം (Acoustic & Waves)', icon: '🏖️', desc: 'Relaxed acoustic guitar, warm ocean wash & light chenda' },
  { id: 'rain', title: 'Monsoon Rhythm', malayalam: 'ഇടവപ്പാതി മഴ (Rain & Soft Melodies)', icon: '🌧️', desc: 'Gentle monsoon rain ambience with warm acoustic arpeggios' },
  { id: 'night', title: 'Midnight Starlight', malayalam: 'രാത്രി നിലാവ് (Atmospheric)', icon: '🌙', desc: 'Slower atmospheric flute, distant crickets & warm pads' },
  { id: 'mission', title: 'Cinematic Action', malayalam: 'ആവേശകരമായ ദൗത്യം (Chenda Melam)', icon: '🎯', desc: 'Fast-paced Chenda melam drums and cinematic percussion' },
];

class KeralaAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  // Background Music State
  private bgmPlaying: boolean = false;
  private bgmMode: BGMMode = 'village';
  private bgmVolume: number = 0.65;
  private masterBgmGain: GainNode | null = null;
  private bgmTimer: number | null = null;
  private bgmStep: number = 0;
  private bgmListeners: Array<(playing: boolean, mode: BGMMode) => void> = [];

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterBgmGain && this.audioCtx) {
      this.masterBgmGain.gain.setValueAtTime(muted ? 0 : this.bgmVolume, this.audioCtx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // ==============================================================
  // 🎵 PROCEDURAL KERALA BGM ENGINE ("NAATTILE SCENE — ഇത് കേരളമാണ്!")
  // ==============================================================
  public playBGM(mode?: BGMMode) {
    if (mode) this.bgmMode = mode;
    this.initContext();
    if (!this.audioCtx) return;

    if (!this.masterBgmGain) {
      this.masterBgmGain = this.audioCtx.createGain();
      this.masterBgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.audioCtx.currentTime);
      this.masterBgmGain.connect(this.audioCtx.destination);
    }

    if (this.bgmPlaying) {
      this.notifyBgmListeners();
      return;
    }

    this.bgmPlaying = true;
    this.bgmStep = 0;
    this.startBgmLoop();
    this.notifyBgmListeners();
  }

  public pauseBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.notifyBgmListeners();
  }

  public toggleBGM() {
    if (this.bgmPlaying) {
      this.pauseBGM();
    } else {
      this.playBGM();
    }
  }

  public setBGMMode(mode: BGMMode) {
    this.bgmMode = mode;
    this.notifyBgmListeners();
  }

  public getBGMMode(): BGMMode {
    return this.bgmMode;
  }

  public isBGMPlaying(): boolean {
    return this.bgmPlaying;
  }

  public setBGMVolume(vol: number) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.masterBgmGain && this.audioCtx && !this.isMuted) {
      this.masterBgmGain.gain.setValueAtTime(this.bgmVolume, this.audioCtx.currentTime);
    }
  }

  public getBGMVolume(): number {
    return this.bgmVolume;
  }

  public subscribeBGM(listener: (playing: boolean, mode: BGMMode) => void) {
    this.bgmListeners.push(listener);
    return () => {
      this.bgmListeners = this.bgmListeners.filter(l => l !== listener);
    };
  }

  private notifyBgmListeners() {
    this.bgmListeners.forEach(cb => cb(this.bgmPlaying, this.bgmMode));
  }

  private startBgmLoop() {
    if (this.bgmTimer) {
      window.clearInterval(this.bgmTimer);
    }

    // 16th note tick interval (112 BPM ~ 134ms per step)
    const stepIntervalMs = 134;

    this.bgmTimer = window.setInterval(() => {
      if (!this.bgmPlaying || !this.audioCtx || this.isMuted) return;
      this.tickBgm(this.bgmStep);
      this.bgmStep = (this.bgmStep + 1) % 64; // 4-bar loop (16 steps per bar)
    }, stepIntervalMs);
  }

  private tickBgm(step: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const now = this.audioCtx.currentTime;
    const mode = this.bgmMode;

    // Scale notes in Mohanam / Bhupali raga (C4, D4, E4, G4, A4, C5, D5, E5)
    const MOHANAM = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

    // 1. KERALA BAMBOO FLUTE (Pullanguzhal Melody)
    // Soulful traditional melody playing on key beats
    const fluteNotes = [
      { step: 0, noteIdx: 4, dur: 0.4 },  // A4
      { step: 3, noteIdx: 5, dur: 0.3 },  // C5
      { step: 6, noteIdx: 7, dur: 0.5 },  // E5
      { step: 10, noteIdx: 5, dur: 0.3 }, // C5
      { step: 12, noteIdx: 4, dur: 0.5 }, // A4
      { step: 16, noteIdx: 3, dur: 0.4 }, // G4
      { step: 19, noteIdx: 2, dur: 0.3 }, // E4
      { step: 22, noteIdx: 4, dur: 0.6 }, // A4
      { step: 28, noteIdx: 3, dur: 0.4 }, // G4
      { step: 32, noteIdx: 2, dur: 0.4 }, // E4
      { step: 35, noteIdx: 1, dur: 0.3 }, // D4
      { step: 38, noteIdx: 2, dur: 0.5 }, // E4
      { step: 42, noteIdx: 3, dur: 0.3 }, // G4
      { step: 44, noteIdx: 4, dur: 0.4 }, // A4
      { step: 48, noteIdx: 5, dur: 0.5 }, // C5
      { step: 52, noteIdx: 4, dur: 0.3 }, // A4
      { step: 56, noteIdx: 3, dur: 0.4 }, // G4
      { step: 60, noteIdx: 2, dur: 0.5 }, // E4
    ];

    const currentFlute = fluteNotes.find(f => f.step === step);
    if (currentFlute) {
      const freq = MOHANAM[currentFlute.noteIdx % MOHANAM.length];
      const fluteVol = (mode === 'mountains' || mode === 'village' || mode === 'night') ? 0.28 : 0.18;
      this.playFluteNote(freq, now, currentFlute.dur, fluteVol);
    }

    // 2. TRADITIONAL CHENDA & EDAKKA PERCUSSION
    // Chenda "Urutti Chenda" rhythm on steps 0, 4, 8, 12 with syncopations
    const isChendaStep = step % 4 === 0 || (step % 8 === 6 && (mode === 'highway' || mode === 'mission'));
    if (isChendaStep) {
      const isAccent = step % 16 === 0;
      const chendaPitch = isAccent ? 180 : (step % 8 === 4 ? 240 : 210);
      const chendaVol = mode === 'mission' ? 0.38 : (mode === 'highway' || mode === 'city' ? 0.28 : 0.18);
      this.playChendaBeat(chendaPitch, now, isAccent, chendaVol);
    }

    // Edakka melodic glide on steps 7, 15, 23, 31
    if (step % 8 === 7 && (mode === 'village' || mode === 'beach' || mode === 'night')) {
      this.playEdakkaGlide(now, 0.2);
    }

    // 3. DRIVING BASSLINE (Highway, City, Mission)
    if (step % 4 === 0 && (mode === 'highway' || mode === 'city' || mode === 'mission')) {
      const bassRoots = [130.81, 130.81, 174.61, 196.0]; // C3, C3, F3, G3
      const barIdx = Math.floor(step / 16);
      const bFreq = bassRoots[barIdx % bassRoots.length];
      this.playBassNote(bFreq, now, 0.22, 0.32);
    }

    // 4. ACOUSTIC GUITAR CHORD PLUCKS (Village, Highway, Beach, Rain)
    if (step % 2 === 0 && (mode === 'village' || mode === 'highway' || mode === 'beach' || mode === 'rain')) {
      const chordNotes = [329.63, 392.0, 523.25, 659.25]; // C major / Am arpeggio
      const noteFreq = chordNotes[(step / 2) % chordNotes.length];
      this.playAcousticPluck(noteFreq, now, 0.18, 0.14);
    }

    // 5. ROAD-TRIP KICK & SNARE (Highway, City, Mission)
    if (mode === 'highway' || mode === 'city' || mode === 'mission') {
      if (step % 8 === 0) {
        // Kick drum
        this.playKick(now, 0.35);
      } else if (step % 8 === 4) {
        // Snare / Rimshot
        this.playSnare(now, 0.25);
      }
      // Shaker on all 16ths
      this.playShaker(now, 0.08);
    }

    // 6. AMBIENT NATURE SOUNDS (Village, Rain, Beach, Night)
    if (step % 32 === 0) {
      if (mode === 'village' || mode === 'mountains') {
        this.playBirdChirp(now);
      } else if (mode === 'night') {
        this.playCricketChirp(now);
      }
    }
  }

  // Synth Instruments
  private playFluteNote(freq: number, startTime: number, duration: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const subOsc = this.audioCtx.createOscillator();
    const lfo = this.audioCtx.createOscillator();
    const lfoGain = this.audioCtx.createGain();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm second harmonic overtone
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, startTime);

    // Flute vibrato (5.2 Hz LFO)
    lfo.frequency.setValueAtTime(5.2, startTime);
    lfoGain.gain.setValueAtTime(4.5, startTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Gentle breath envelope (soft attack, sustained, smooth release)
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.06);
    gain.gain.setValueAtTime(vol * 0.9, startTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    subOsc.start(startTime);
    lfo.start(startTime);
    osc.stop(startTime + duration);
    subOsc.stop(startTime + duration);
    lfo.stop(startTime + duration);
  }

  private playChendaBeat(freq: number, startTime: number, isAccent: boolean, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * (isAccent ? 1.2 : 1.0), startTime);
    osc.frequency.exponentialRampToValueAtTime(60, startTime + 0.1);

    gain.gain.setValueAtTime(vol * (isAccent ? 1.3 : 1.0), startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.11);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.11);
  }

  private playEdakkaGlide(startTime: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, startTime);
    osc.frequency.exponentialRampToValueAtTime(440, startTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(280, startTime + 0.22);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.24);
  }

  private playAcousticPluck(freq: number, startTime: number, duration: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playBassNote(freq: number, startTime: number, duration: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, startTime);

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, startTime);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playKick(startTime: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, startTime);
    osc.frequency.exponentialRampToValueAtTime(38, startTime + 0.12);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.14);
  }

  private playSnare(startTime: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, startTime);
    osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.08);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  private playShaker(startTime: number, vol: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'highpass' as unknown as OscillatorType;
    osc.frequency.setValueAtTime(6000, startTime);

    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.04);
  }

  private playBirdChirp(startTime: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(3200, startTime);
    osc.frequency.exponentialRampToValueAtTime(4600, startTime + 0.06);
    osc.frequency.exponentialRampToValueAtTime(3800, startTime + 0.12);

    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.14);
  }

  private playCricketChirp(startTime: number) {
    if (!this.audioCtx || !this.masterBgmGain) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(5400, startTime);

    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterBgmGain);

    osc.start(startTime);
    osc.stop(startTime + 0.08);
  }

  public playSound(
    type:
      | 'airhorn'
      | 'teaglass'
      | 'autohorn'
      | 'jump'
      | 'coin'
      | 'bell'
      | 'ticket'
      | 'kick'
      | 'goal'
      | 'whistle'
      | 'splash'
      | 'shutter'
      | 'thunder'
      | 'tractor'
      | 'bullet'
      | 'moo'
      | 'chenda'
      | 'refuel'
      | 'workshop'
  ) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      if (type === 'shutter') {
        // Crisp dual-click mechanical camera shutter
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.05);

        setTimeout(() => {
          if (!this.audioCtx) return;
          const osc2 = this.audioCtx.createOscillator();
          const gain2 = this.audioCtx.createGain();
          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(900, this.audioCtx.currentTime);
          gain2.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);
          osc2.connect(gain2);
          gain2.connect(this.audioCtx.destination);
          osc2.start();
          osc2.stop(this.audioCtx.currentTime + 0.06);
        }, 70);
      } else if (type === 'thunder') {
        // Deep rumbling monsoon thunder roll
        const bufferSize = this.audioCtx.sampleRate * 1.5;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, now);
        filter.frequency.linearRampToValueAtTime(45, now + 1.2);
        const gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);
        noise.start(now);
        noise.stop(now + 1.4);
      } else if (type === 'chenda') {
        // Traditional Kerala Chenda melam beat ("തക തക തിമി")
        [0, 0.08, 0.16, 0.28].forEach((delay, idx) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(idx % 2 === 0 ? 280 : 360, now + delay);
          osc.frequency.exponentialRampToValueAtTime(70, now + delay + 0.09);
          gain.gain.setValueAtTime(0.35, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.09);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
      } else if (type === 'moo') {
        // Cow moo ("അമ്മാഹ്ഹ്ഹ്!")
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(125, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.3);
        osc.frequency.linearRampToValueAtTime(110, now + 0.8);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.85);
      } else if (type === 'refuel') {
        // Petrol pump nozzle fuel gush & meter beep
        [600, 800, 1000].forEach((freq, idx) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.09);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.09);
        });
      } else if (type === 'tractor') {
        // Heavy single-cylinder diesel chug ("ടക് ടക് ടക്!")
        [0, 0.08, 0.16, 0.24].forEach((delay) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(65, now + delay);
          gain.gain.setValueAtTime(0.25, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.06);
        });
      } else if (type === 'bullet') {
        // Royal Enfield classic motorcycle thump ("ഡുഗ്ഗ് ഡുഗ്ഗ് ഡുഗ്ഗ്!")
        [0, 0.11, 0.22].forEach((delay) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(80, now + delay);
          osc.frequency.exponentialRampToValueAtTime(30, now + delay + 0.08);
          gain.gain.setValueAtTime(0.3, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.08);
        });
      }

      if (type === 'splash') {
        // Soft water ripple splash
        [440, 660, 880].forEach((freq, i) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + i * 0.05 + 0.22);
          gain.gain.setValueAtTime(0.18, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.22);
        });
      } else if (type === 'bell') {
        // Authentic KSRTC conductor double bell ring ("ട്രിങ്... ട്രിങ്!")
        [0, 0.14].forEach((delay) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1450, now + delay);
          gain.gain.setValueAtTime(0.3, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.28);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.28);
        });
      } else if (type === 'ticket') {
        // KSRTC Electronic Ticket Machine (ETM) rapid thermal print buzz
        for (let i = 0; i < 6; i++) {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(800 + (i % 2) * 200, now + i * 0.04);
          gain.gain.setValueAtTime(0.12, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.035);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.035);
        }
      } else if (type === 'airhorn') {
        // Kerala bus dual tone / tri-tone musical airhorn
        const frequencies = [370, 440, 554, 440];
        frequencies.forEach((freq, idx) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.38);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.38);
        });
      } else if (type === 'teaglass') {
        // High frequency tea glass clink
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2400, now);
        osc.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'autohorn') {
        // Auto rickshaw horn (buzzy square wave)
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(290, now);
        osc.frequency.setValueAtTime(340, now + 0.1);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'jump') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'coin') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1480, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'kick') {
        // Punchy low-thud soccer ball kick impact
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'whistle') {
        // Referee match whistle with vibrato
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2600, now);
        osc.frequency.linearRampToValueAtTime(2850, now + 0.08);
        osc.frequency.linearRampToValueAtTime(2700, now + 0.25);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'goal') {
        // Celebratory match goal chord & whistle
        [2800, 3200].forEach((freq) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.5);
        });
      } else if (type === 'workshop') {
        // Metallic wrench and ratchet click sound
        [440, 880, 1320].forEach((freq, i) => {
          if (!this.audioCtx) return;
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          gain.gain.setValueAtTime(0.18, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.12);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.12);
        });
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }
}

export const soundSynth = new KeralaAudioEngine();
