import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { audioManager } from '../utils/audioManager';

export default function SettingsScreen() {
  const {
    currentTheme,
    setCurrentTheme,
    breathingSpeed,
    setBreathingSpeed,
    soundTracks,
    updateSoundTrack,
    themes,
  } = useApp();
  const router = useRouter();
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Load audio when component mounts
  useEffect(() => {
    initAudio();
    return () => {
      // Don't stop audio when leaving settings
    };
  }, []);

  const initAudio = async () => {
    console.log('Settings: Initializing audio...');
    try {
      for (const track of soundTracks) {
        await audioManager.loadSound(track);
      }
      setAudioLoaded(true);
      console.log('Settings: All sounds loaded');
    } catch (error) {
      console.error('Settings: Error loading audio:', error);
    }
  };

  // Handle sound track toggle
  const handleSoundToggle = async (trackId: string, enabled: boolean) => {
    console.log(`Settings: Toggling ${trackId} to ${enabled}`);
    updateSoundTrack(trackId, { enabled });
    
    if (audioLoaded) {
      if (enabled) {
        const track = soundTracks.find(t => t.id === trackId);
        if (track) {
          await audioManager.playSound(trackId, track.volume);
        }
      } else {
        await audioManager.stopSound(trackId);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = async (trackId: string, volume: number) => {
    updateSoundTrack(trackId, { volume });
    
    if (audioLoaded) {
      const track = soundTracks.find(t => t.id === trackId);
      if (track && track.enabled) {
        await audioManager.setVolume(trackId, volume);
      }
    }
  };

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>SETTINGS</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Theme Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>THEME</Text>
            <View style={styles.themesContainer}>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.id}
                  style={[
                    styles.themeCard,
                    currentTheme.id === theme.id && styles.themeCardActive,
                  ]}
                  onPress={() => setCurrentTheme(theme)}
                >
                  <LinearGradient
                    colors={theme.gradient}
                    style={styles.themeGradient}
                  />
                  <Text style={styles.themeName}>{theme.name}</Text>
                  {theme.locked && (
                    <View style={styles.lockBadge}>
                      <Ionicons name="lock-closed" size={12} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Breathing Speed */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BREATHING SPEED</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  breathingSpeed === 'normal' && styles.toggleButtonActive,
                ]}
                onPress={() => setBreathingSpeed('normal')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    breathingSpeed === 'normal' && styles.toggleTextActive,
                  ]}
                >
                  Normal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  breathingSpeed === 'slow' && styles.toggleButtonActive,
                ]}
                onPress={() => setBreathingSpeed('slow')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    breathingSpeed === 'slow' && styles.toggleTextActive,
                  ]}
                >
                  Slow
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sound Mixer */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AMBIENT SOUNDS</Text>
            <Text style={styles.infoText}>
              {audioLoaded ? 'Toggle sounds to test. Audio works best on mobile devices.' : 'Loading sounds...'}
            </Text>
            {soundTracks.map((track) => (
              <View key={track.id} style={styles.soundTrack}>
                <View style={styles.soundHeader}>
                  <View style={styles.soundInfo}>
                    <Ionicons name="musical-notes" size={20} color="#ffffff80" />
                    <Text style={styles.soundName}>{track.name}</Text>
                  </View>
                  <Switch
                    value={track.enabled}
                    onValueChange={(value) => handleSoundToggle(track.id, value)}
                    trackColor={{ false: '#ffffff20', true: '#ffffff40' }}
                    thumbColor={track.enabled ? '#ffffff' : '#ffffff80'}
                  />
                </View>
                {track.enabled && (
                  <View style={styles.volumeControl}>
                    <Ionicons name="volume-low" size={16} color="#ffffff60" />
                    <Slider
                      style={styles.slider}
                      value={track.volume}
                      onValueChange={(value) => handleVolumeChange(track.id, Math.round(value))}
                      minimumValue={0}
                      maximumValue={100}
                      minimumTrackTintColor="#ffffff"
                      maximumTrackTintColor="#ffffff20"
                      thumbTintColor="#ffffff"
                    />
                    <Text style={styles.volumeText}>{track.volume}%</Text>
                    <Ionicons name="volume-high" size={16} color="#ffffff60" />
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            <Text style={styles.aboutText}>
              STILLNESS provides a container for meditation through breathing
              exercises and ambient soundscapes. {"\n\n"}
              Every pixel serves the experience. Empty space is intentional.
              {"\n\n"}
              No streaks. No rewards. Just stillness.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 4,
    color: '#ffffff',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#ffffff60',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#ffffff80',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeCard: {
    width: '47%',
    aspectRatio: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeCardActive: {
    borderColor: '#ffffff40',
  },
  themeGradient: {
    flex: 1,
  },
  themeName: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 14,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 1,
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00000060',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#ffffff20',
    borderColor: '#ffffff40',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff60',
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  soundTrack: {
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  soundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soundInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  soundName: {
    fontSize: 16,
    color: '#ffffff',
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  volumeText: {
    fontSize: 12,
    color: '#ffffff60',
    width: 40,
    textAlign: 'right',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#ffffff80',
  },
});
