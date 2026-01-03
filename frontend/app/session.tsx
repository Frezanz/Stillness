import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext';
import BreathingCircle from '../components/BreathingCircle';
import { Ionicons } from '@expo/vector-icons';
import { audioManager } from '../utils/audioManager';

export default function SessionScreen() {
  const { currentTheme, soundTracks, addSession } = useApp();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [duration] = useState<number>(parseInt(params.duration as string) || 10);
  const [timeRemaining, setTimeRemaining] = useState<number>(duration * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Initialize audio
  useEffect(() => {
    initAudio();
    return () => {
      audioManager.stopAll();
    };
  }, []);

  const initAudio = async () => {
    // Load all sounds
    for (const track of soundTracks) {
      await audioManager.loadSound(track);
      if (track.enabled) {
        await audioManager.playSound(track.id, track.volume);
      }
    }
  };

  // Timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Update audio when tracks change
  useEffect(() => {
    soundTracks.forEach(async (track) => {
      if (track.enabled) {
        await audioManager.playSound(track.id, track.volume);
      } else {
        await audioManager.stopSound(track.id);
      }
    });
  }, [soundTracks]);

  const handleComplete = () => {
    const completedMinutes = duration - Math.floor(timeRemaining / 60);
    addSession(completedMinutes);
    audioManager.stopAll();
    router.replace({
      pathname: '/complete',
      params: { completedMinutes: completedMinutes.toString() },
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    setIsActive(!isPaused);
  };

  const handleStop = () => {
    const completedMinutes = duration - Math.floor(timeRemaining / 60);
    if (completedMinutes > 0) {
      addSession(completedMinutes);
    }
    audioManager.stopAll();
    router.back();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <Pressable
        style={styles.touchableArea}
        onPress={() => setShowControls(!showControls)}
      >
        <View style={styles.content}>
          {/* Timer (shown when controls visible) */}
          {showControls && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            </View>
          )}

          {/* Breathing Circle */}
          <View style={styles.circleContainer}>
            <BreathingCircle isActive={isActive} />
          </View>

          {/* Controls (shown when tapped) */}
          {showControls && (
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handlePause}
              >
                <Ionicons
                  name={isPaused ? 'play' : 'pause'}
                  size={32}
                  color="#ffffff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleStop}
              >
                <Ionicons name="stop" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: 100,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: 4,
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    gap: 32,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff20',
    borderWidth: 1,
    borderColor: '#ffffff40',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
