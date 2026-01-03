import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export type BreathingSpeed = 'normal' | 'slow';

export type Theme = {
  id: string;
  name: string;
  gradient: string[];
  circle: string[];
  locked: boolean;
};

export type SoundTrack = {
  id: string;
  name: string;
  file: any;
  enabled: boolean;
  volume: number;
};

export type SessionStats = {
  totalMinutes: number;
  totalSessions: number;
  weeklyData: { [key: string]: number };
};

type AppContextType = {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  breathingSpeed: BreathingSpeed;
  setBreathingSpeed: (speed: BreathingSpeed) => void;
  soundTracks: SoundTrack[];
  updateSoundTrack: (id: string, updates: Partial<SoundTrack>) => void;
  stats: SessionStats;
  addSession: (minutes: number) => void;
  themes: Theme[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const THEMES: Theme[] = [
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    gradient: ['#1a2332', '#2d3f5f'],
    circle: ['#4a90e2', '#7ab8ef'],
    locked: false,
  },
  {
    id: 'twilight',
    name: 'Twilight',
    gradient: ['#1f1535', '#3d2463'],
    circle: ['#8b5cf6', '#c4b5fd'],
    locked: false, // Unlocked by default as requested
  },
  {
    id: 'warm-earth',
    name: 'Warm Earth',
    gradient: ['#2a1810', '#4a2818'],
    circle: ['#f59e0b', '#fcd34d'],
    locked: false, // Unlocked by default as requested
  },
  {
    id: 'teal-mist',
    name: 'Teal Mist',
    gradient: ['#0f2e2a', '#1a4d45'],
    circle: ['#14b8a6', '#5eead4'],
    locked: false, // Unlocked by default as requested
  },
];

const INITIAL_SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    file: require('../assets/audio/ocean-waves.mp3'),
    enabled: false,
    volume: 50,
  },
  {
    id: 'thunder',
    name: 'Thunder',
    file: require('../assets/audio/thunder.mp3'),
    enabled: false,
    volume: 50,
  },
  {
    id: 'fire',
    name: 'Fire',
    file: require('../assets/audio/fire.mp3'),
    enabled: false,
    volume: 50,
  },
  {
    id: 'tibetan-bowls',
    name: 'Tibetan Bowls',
    file: require('../assets/audio/tibetan-bowls.mp3'),
    enabled: false,
    volume: 50,
  },
  {
    id: 'street-ambience',
    name: 'Street Ambience',
    file: require('../assets/audio/street-ambience.mp3'),
    enabled: false,
    volume: 50,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [breathingSpeed, setBreathingSpeed] = useState<BreathingSpeed>('normal');
  const [soundTracks, setSoundTracks] = useState<SoundTrack[]>(INITIAL_SOUND_TRACKS);
  const [stats, setStats] = useState<SessionStats>({
    totalMinutes: 0,
    totalSessions: 0,
    weeklyData: {},
  });

  // Load saved data on mount
  useEffect(() => {
    loadData();
    setupAudio();
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const loadData = async () => {
    try {
      const [themeData, speedData, soundData, statsData] = await Promise.all([
        AsyncStorage.getItem('currentTheme'),
        AsyncStorage.getItem('breathingSpeed'),
        AsyncStorage.getItem('soundTracks'),
        AsyncStorage.getItem('stats'),
      ]);

      if (themeData) {
        const theme = THEMES.find(t => t.id === themeData);
        if (theme) setCurrentTheme(theme);
      }
      if (speedData) setBreathingSpeed(speedData as BreathingSpeed);
      if (soundData) setSoundTracks(JSON.parse(soundData));
      if (statsData) setStats(JSON.parse(statsData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveTheme = async (theme: Theme) => {
    setCurrentTheme(theme);
    try {
      await AsyncStorage.setItem('currentTheme', theme.id);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const saveBreathingSpeed = async (speed: BreathingSpeed) => {
    setBreathingSpeed(speed);
    try {
      await AsyncStorage.setItem('breathingSpeed', speed);
    } catch (error) {
      console.error('Error saving breathing speed:', error);
    }
  };

  const updateSoundTrack = async (id: string, updates: Partial<SoundTrack>) => {
    const newTracks = soundTracks.map(track =>
      track.id === id ? { ...track, ...updates } : track
    );
    setSoundTracks(newTracks);
    try {
      await AsyncStorage.setItem('soundTracks', JSON.stringify(newTracks));
    } catch (error) {
      console.error('Error saving sound tracks:', error);
    }
  };

  const addSession = async (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    const newStats = {
      totalMinutes: stats.totalMinutes + minutes,
      totalSessions: stats.totalSessions + 1,
      weeklyData: {
        ...stats.weeklyData,
        [today]: (stats.weeklyData[today] || 0) + minutes,
      },
    };
    setStats(newStats);
    try {
      await AsyncStorage.setItem('stats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentTheme,
        setCurrentTheme: saveTheme,
        breathingSpeed,
        setBreathingSpeed: saveBreathingSpeed,
        soundTracks,
        updateSoundTrack,
        stats,
        addSession,
        themes: THEMES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
