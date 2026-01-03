import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

type Props = {
  isActive: boolean;
};

export default function BreathingCircle({ isActive }: Props) {
  const { currentTheme, breathingSpeed } = useApp();
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0.6);

  // Breathing timings
  const timings = breathingSpeed === 'normal'
    ? { inhale: 4000, hold: 2000, exhale: 6000 } // 12s cycle
    : { inhale: 5000, hold: 3000, exhale: 7000 }; // 15s cycle

  useEffect(() => {
    if (isActive) {
      // Create breathing animation sequence
      scale.value = withRepeat(
        withSequence(
          // Inhale
          withTiming(1.05, {
            duration: timings.inhale,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          }),
          // Hold
          withTiming(1.05, {
            duration: timings.hold,
          }),
          // Exhale
          withTiming(0.85, {
            duration: timings.exhale,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          })
        ),
        -1, // Infinite repeat
        false
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0.9, { duration: timings.inhale }),
          withTiming(0.9, { duration: timings.hold }),
          withTiming(0.6, { duration: timings.exhale })
        ),
        -1,
        false
      );
    } else {
      scale.value = withTiming(0.85, { duration: 500 });
      opacity.value = withTiming(0.6, { duration: 500 });
    }
  }, [isActive, breathingSpeed]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        <LinearGradient
          colors={currentTheme.circle}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
});
