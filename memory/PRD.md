# STILLNESS - Meditation App PRD

## Overview
STILLNESS is a minimalist meditation app featuring breathing exercises and ambient soundscapes.

## Core Features Implemented

### 1. Home Screen ✅
- Centered breathing circle preview with theme gradient
- Duration selector: 5, 10, 15, 20, 30 minutes + custom input (1-120 min)
- Tap duration to start session immediately
- Header with app title and icons for Stats and Settings
- Displays current theme gradient

### 2. Breathing Session ✅
- 60 FPS animated breathing circle using React Native Reanimated
- Two breathing modes:
  - **Normal**: 4s inhale → 2s hold → 6s exhale (12s cycle)
  - **Slow**: 5s inhale → 3s hold → 7s exhale (15s cycle)
- Animation specs:
  - Scale: 0.85 (exhaled) ↔ 1.05 (inhaled)
  - Opacity: 0.6 ↔ 0.9
  - Smooth Bezier easing
- 100% distraction-free: tap screen to show/hide controls
- Session timer countdown
- Pause and stop controls
- Background audio support
- Auto-complete when timer reaches 0

### 3. Session Completion Screen ✅
- Displays "Session Complete" message
- Shows session duration and cumulative total minutes
- Actions:
  - **Extend +5 min** button
  - **Done** button
- Minimal, soft landing experience

### 4. Themes System ✅
- **Free Theme (Default)**:
  - Deep Ocean: Blue-green gradient (#1a2332 → #2d3f5f)
- **Premium Themes (All Unlocked by Default)**:
  - Twilight: Violet gradient (#1f1535 → #3d2463)
  - Warm Earth: Amber gradient (#2a1810 → #4a2818)
  - Teal Mist: Teal gradient (#0f2e2a → #1a4d45)
- Theme selection in Settings
- Themes persist via AsyncStorage

### 5. Ambient Sound Mixer ✅
**Integrated Real Audio Files:**
1. **Ocean Waves** - Gentle rainfall loop
2. **Thunder** - Thunderstorm ambiance
3. **Fire** - Crackling fire sounds
4. **Tibetan Bowls** - Resonant bowl tones
5. **Street Ambience** - Morning street vibes

**Audio Features:**
- Multi-track audio playback using expo-av
- Individual ON/OFF toggle for each sound
- Individual volume slider (0-100%) per track
- Master volume cap at 30% to maintain low floor
- Background playback support
- Seamless looping
- Audio continues when screen locked

### 6. Stats Screen ✅
- **Total Minutes**: Cumulative meditation time
- **Total Sessions**: Number of completed sessions
- **Weekly Chart**: Bar chart showing last 7 days
- **Average Session**: Total minutes / total sessions
- NO daily streaks - just cumulative data
- Clean, minimal design

### 7. Settings Screen ✅
- **Theme Selection**: 4 theme cards with preview gradients
- **Breathing Speed**: Normal / Slow toggle
- **Sound Mixer Section**:
  - List all sounds with ON/OFF toggles
  - Individual volume sliders for each track
  - Audio icons for each sound
- **About**: Brief text about STILLNESS philosophy

## Technical Stack
- **Framework**: Expo (React Native) with expo-router
- **Audio**: expo-av for multi-track audio playback
- **Animations**: react-native-reanimated for 60 FPS animations
- **Gradients**: expo-linear-gradient
- **Storage**: @react-native-async-storage/async-storage
- **Navigation**: expo-router (file-based routing)
- **UI Components**: @react-native-community/slider for volume controls

## Design System
- **Background**: Near-black (#0E0F12)
- **Card backgrounds**: #ffffff10 with border #ffffff20
- **Text primary**: #ffffff
- **Text secondary**: #ffffff80
- **Text muted**: #ffffff60
- **Accents**: Theme-specific gradients
- **Typography**: 
  - Title: 20px, weight 300, letter-spacing 2-4px
  - Body: 14-16px
  - Labels: 12-13px
- **Spacing**: 8pt grid (8px, 16px, 24px, 32px)
- **Animations**: 60 FPS, smooth easing

## Core Philosophy
- **Silence is the Feature**: The app provides a container for stillness
- **Zero Pressure**: No streaks, no rewards, no motivational notifications
- **Function > Decoration**: Every pixel serves the breathing or ambient experience
- **Restraint**: Empty space is intentional

## Status
✅ MVP Complete - All core features implemented and functional

## Future Enhancements (Not Implemented)
- Ad integration for premium theme unlocking
- In-app purchases
- Additional sound tracks
- Cloud sync for stats
- Social features (optional)
