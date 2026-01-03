import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const PRESET_DURATIONS = [5, 10, 15, 20, 30];

export default function HomeScreen() {
  const { currentTheme } = useApp();
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const [customDuration, setCustomDuration] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleStartSession = (duration: number) => {
    router.push({
      pathname: '/session',
      params: { duration: duration.toString() },
    });
  };

  const handleCustomSubmit = () => {
    const duration = parseInt(customDuration);
    if (duration >= 1 && duration <= 120) {
      handleStartSession(duration);
    }
  };

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.title}>STILLNESS</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => router.push('/stats')}
              style={styles.iconButton}
            >
              <Ionicons name="stats-chart" size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={styles.iconButton}
            >
              <Ionicons name="settings-outline" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Breathing Circle Preview */}
        <View style={styles.circleContainer}>
          <LinearGradient
            colors={currentTheme.circle}
            style={styles.circle}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>

        {/* Duration Selector */}
        <View style={styles.durationSection}>
          <Text style={styles.sectionLabel}>DURATION</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.durationScroll}
          >
            {PRESET_DURATIONS.map((duration) => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  selectedDuration === duration && styles.durationButtonActive,
                ]}
                onPress={() => {
                  setSelectedDuration(duration);
                  setShowCustomInput(false);
                  handleStartSession(duration);
                }}
              >
                <Text
                  style={[
                    styles.durationText,
                    selectedDuration === duration && styles.durationTextActive,
                  ]}
                >
                  {duration}
                </Text>
                <Text style={styles.durationLabel}>min</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={[
                styles.durationButton,
                showCustomInput && styles.durationButtonActive,
              ]}
              onPress={() => setShowCustomInput(!showCustomInput)}
            >
              <Ionicons
                name="create-outline"
                size={24}
                color={showCustomInput ? '#ffffff' : '#ffffff80'}
              />
              <Text style={styles.durationLabel}>custom</Text>
            </TouchableOpacity>
          </ScrollView>

          {showCustomInput && (
            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                placeholder="1-120 minutes"
                placeholderTextColor="#ffffff60"
                keyboardType="number-pad"
                value={customDuration}
                onChangeText={setCustomDuration}
                maxLength={3}
              />
              <TouchableOpacity
                style={styles.customButton}
                onPress={handleCustomSubmit}
              >
                <Text style={styles.customButtonText}>START</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>Tap duration to begin</Text>
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
  headerSpacer: {
    width: 60,
  },
  headerIcons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'flex-end',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 4,
    color: '#ffffff',
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.7,
  },
  durationSection: {
    paddingVertical: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#ffffff60',
    textAlign: 'center',
    marginBottom: 16,
  },
  durationScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  durationButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButtonActive: {
    backgroundColor: '#ffffff20',
    borderColor: '#ffffff40',
  },
  durationText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#ffffff80',
  },
  durationTextActive: {
    color: '#ffffff',
  },
  durationLabel: {
    fontSize: 12,
    color: '#ffffff60',
    marginTop: 4,
  },
  customInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    gap: 12,
  },
  customInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 24,
    paddingHorizontal: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  customButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff20',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#ffffff60',
    textAlign: 'center',
    paddingBottom: 32,
  },
});
