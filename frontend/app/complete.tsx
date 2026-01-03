import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CompleteScreen() {
  const { currentTheme, stats } = useApp();
  const router = useRouter();
  const params = useLocalSearchParams();
  const completedMinutes = parseInt(params.completedMinutes as string) || 0;

  const handleExtend = () => {
    router.replace({
      pathname: '/session',
      params: { duration: '5' },
    });
  };

  const handleDone = () => {
    router.replace('/');
  };

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Completion Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.title}>Session Complete</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{completedMinutes}</Text>
                <Text style={styles.statLabel}>minutes</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalMinutes}</Text>
                <Text style={styles.statLabel}>total minutes</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.extendButton}
              onPress={handleExtend}
            >
              <Text style={styles.extendButtonText}>+ 5 MIN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleDone}
            >
              <Text style={styles.doneButtonText}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 28,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 48,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 48,
    fontWeight: '200',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff60',
    letterSpacing: 1,
    marginTop: 8,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#ffffff20',
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  extendButton: {
    height: 56,
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff80',
    letterSpacing: 2,
  },
  doneButton: {
    height: 56,
    backgroundColor: '#ffffff20',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    letterSpacing: 2,
  },
});
