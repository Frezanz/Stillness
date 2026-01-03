import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Text from '../components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 48;
const BAR_WIDTH = (CHART_WIDTH - 48) / 7;

export default function StatsScreen() {
  const { currentTheme, stats } = useApp();
  const router = useRouter();

  // Calculate last 7 days
  const weeklyData = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const data: { day: string; date: string; minutes: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayIndex = date.getDay();
      
      data.push({
        day: days[dayIndex],
        date: dateString,
        minutes: stats.weeklyData[dateString] || 0,
      });
    }

    return data;
  }, [stats]);

  const maxMinutes = useMemo(() => {
    return Math.max(...weeklyData.map(d => d.minutes), 10);
  }, [weeklyData]);

  const averageSession = useMemo(() => {
    if (stats.totalSessions === 0) return 0;
    return Math.round(stats.totalMinutes / stats.totalSessions);
  }, [stats]);

  return (
    <LinearGradient colors={currentTheme.gradient} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>STATISTICS</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Stats */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.totalMinutes}</Text>
              <Text style={styles.summaryLabel}>Total Minutes</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.totalSessions}</Text>
              <Text style={styles.summaryLabel}>Total Sessions</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{averageSession}</Text>
              <Text style={styles.summaryLabel}>Avg Session</Text>
            </View>
          </View>

          {/* Weekly Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.sectionTitle}>LAST 7 DAYS</Text>
            <View style={styles.chartContainer}>
              <View style={styles.chart}>
                {weeklyData.map((day, index) => {
                  const height = maxMinutes > 0 
                    ? (day.minutes / maxMinutes) * 120 
                    : 0;
                  
                  return (
                    <View key={index} style={styles.barContainer}>
                      <View style={styles.barWrapper}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: Math.max(height, 4),
                              backgroundColor: day.minutes > 0 
                                ? currentTheme.circle[0] 
                                : '#ffffff10',
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.barLabel}>{day.day}</Text>
                      {day.minutes > 0 && (
                        <Text style={styles.barValue}>{day.minutes}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Motivational Text */}
          <View style={styles.messageContainer}>
            {stats.totalSessions === 0 ? (
              <Text style={styles.messageText}>
                Begin your practice. {"\n"}
                No pressure. Just presence.
              </Text>
            ) : (
              <Text style={styles.messageText}>
                {stats.totalSessions} {stats.totalSessions === 1 ? 'session' : 'sessions'} completed. {"\n"}
                Keep returning to stillness.
              </Text>
            )}
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
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '200',
    color: '#ffffff',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#ffffff60',
    textAlign: 'center',
    letterSpacing: 1,
  },
  chartSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 2,
    color: '#ffffff60',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff20',
    borderRadius: 12,
    padding: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  barContainer: {
    width: BAR_WIDTH,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 4,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 11,
    color: '#ffffff60',
    marginTop: 8,
  },
  barValue: {
    fontSize: 10,
    color: '#ffffff80',
    marginTop: 4,
  },
  messageContainer: {
    alignItems: 'center',
    padding: 24,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#ffffff80',
    textAlign: 'center',
  },
});
