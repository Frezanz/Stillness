# STILLNESS - Meditation App

<p align="center">
  <img src="assets/images/icon.png" width="120" alt="STILLNESS Logo"/>
</p>

<p align="center">
  <strong>A minimalist meditation app focused on silence, presence, and functional design.</strong>
</p>

<p align="center">
  No streaks. No rewards. No pressure. Just stillness.
</p>

---

## ✨ Features

### 🌬️ Breathing Sessions
- **60 FPS animated breathing circle** with smooth inhale/exhale transitions
- **Two breathing speeds**: Normal (4s inhale, 4s exhale) and Slow (6s each)
- **Duration selector**: 5, 10, 15, 20, 25, 30 minutes + custom duration
- **Distraction-free UI** during sessions
- **Background audio support** - continues when screen is off

### 🎵 Ambient Sound Mixer
Mix and layer **10 different ambient sounds** to create your perfect meditation atmosphere:
| Sound | Description |
|-------|-------------|
| 🌊 Ocean Waves | Calming sea sounds |
| 🌧️ Rain | Gentle rainfall |
| ⛈️ Thunder | Distant storm rumbles |
| 🔥 Fire | Crackling fireplace |
| 💨 Wind | Soft breeze through trees |
| 🌲 Forest | Natural forest ambience |
| 🐦 Birds Chirping | Morning birdsong |
| 💧 Flowing Stream | Peaceful water flow |
| 🔔 Tibetan Bowls | Meditative singing bowls |
| 🏙️ Street Ambience | Urban white noise |

Each sound has:
- Individual ON/OFF toggle
- Volume control slider (0-100%)
- Seamless looping playback

### 🎨 Theme System
Four beautiful, nature-inspired color themes:
- **Forest Dawn** - Earthy greens (Default)
- **Sunset Glow** - Warm pinks and purples
- **Ocean Calm** - Serene blues
- **Lavender Fields** - Soft purples

### 📊 Statistics Tracking
- **Total minutes** meditated
- **Total sessions** completed
- **Average session length**
- **Weekly bar chart** visualization
- All data stored locally on device

### 🎯 Design Philosophy
- **Zero clutter** - every pixel serves a purpose
- **No gamification** - no streaks, badges, or rewards
- **Thumb-friendly** - designed for one-handed use
- **Non-selectable text** - prevents accidental selection during meditation

---

## 📱 Screenshots

| Home | Session | Settings | Stats |
|------|---------|----------|-------|
| Duration selector | Breathing circle | Sound mixer | Weekly chart |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Expo (SDK 54)** | React Native framework |
| **expo-router** | File-based navigation |
| **React Context** | Global state management |
| **expo-av** | Audio playback |
| **react-native-reanimated** | 60 FPS animations |
| **expo-linear-gradient** | Theme gradients |
| **AsyncStorage** | Local data persistence |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stillness.git
cd stillness/frontend

# Install dependencies
yarn install

# Start development server
yarn start
```

### Running the App

**On Physical Device (Recommended for audio):**
1. Install [Expo Go](https://expo.dev/client) on your phone
2. Scan the QR code from terminal
3. App will load on your device

**On Web Preview:**
```bash
yarn web
```
> ⚠️ Note: Audio playback has limitations on web browsers. Use mobile device for full experience.

---

## 📦 Building for Production

### Setting Up EAS Build

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure your project:**
```bash
eas build:configure
```

4. **Update `app.json`:**
   - Replace `"your-project-id-here"` with your actual EAS project ID
   - Verify package name: `com.frezanz.stillness`

---

## 🤖 Android/Google Play Store Deployment

### Step 1: Build APK for Testing
```bash
# Create a preview APK
eas build --platform android --profile preview
```

### Step 2: Build Production AAB
```bash
# Create production Android App Bundle
eas build --platform android --profile production
```

### Step 3: Create Play Store Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in app details:
   - **App name**: STILLNESS
   - **Default language**: English (US)
   - **App type**: App
   - **Category**: Health & Fitness > Meditation

### Step 4: Prepare Store Assets

| Asset | Specifications |
|-------|---------------|
| **App Icon** | 512x512 PNG |
| **Feature Graphic** | 1024x500 PNG |
| **Screenshots** | 2-8 screenshots, 16:9 or 9:16 ratio |
| **Short Description** | Max 80 characters |
| **Full Description** | Max 4000 characters |

**Suggested Short Description:**
> A minimalist meditation app. No streaks, no pressure. Just breathe.

**Suggested Full Description:**
```
STILLNESS is a meditation app that respects your time and attention.

🌬️ BREATHING EXERCISES
Guided breathing sessions with beautiful animated visuals. Choose from 5-30 minute sessions with two breathing speeds.

🎵 AMBIENT SOUNDS
Mix 10 different sounds to create your perfect meditation atmosphere - rain, ocean waves, forest sounds, and more.

🎨 BEAUTIFUL THEMES  
Four nature-inspired color themes to match your mood.

📊 TRACK YOUR PRACTICE
Simple statistics showing your meditation journey - total time, sessions, and weekly progress.

❌ WHAT WE DON'T HAVE
- No ads
- No streaks or gamification
- No social features
- No accounts required
- No data collection

Just you and your breath.
```

### Step 5: Upload to Play Store

1. In Play Console, go to **Production** > **Create new release**
2. Upload the `.aab` file from EAS Build
3. Add release notes
4. Review and rollout

### Step 6: Submit for Review

Complete all required sections:
- [ ] App content (Privacy policy, ads declaration)
- [ ] Store listing (Screenshots, descriptions)
- [ ] Content rating questionnaire
- [ ] Pricing & distribution

---

## 🍎 iOS/App Store Deployment

### Build for iOS
```bash
# Create production iOS build
eas build --platform ios --profile production
```

### Requirements
- Apple Developer Account ($99/year)
- App Store Connect access
- iOS-specific assets (app icon variants)

### Update `eas.json` for iOS Submit
Replace placeholder values:
- `appleId`: Your Apple ID email
- `ascAppId`: Your App Store Connect app ID

---

## 📁 Project Structure

```
frontend/
├── app/                      # Screen files (expo-router)
│   ├── _layout.tsx          # Root layout with AppProvider
│   ├── index.tsx            # Home screen
│   ├── session.tsx          # Breathing session
│   ├── complete.tsx         # Session completion
│   ├── settings.tsx         # Settings & sound mixer
│   └── stats.tsx            # Practice statistics
├── components/
│   ├── BreathingCircle.tsx  # Animated breathing component
│   └── Text.tsx             # Non-selectable text component
├── context/
│   └── AppContext.tsx       # Global state management
├── utils/
│   └── audioManager.ts      # Audio playback manager
├── assets/
│   ├── audio/               # 10 ambient sound files
│   └── images/              # App icons and images
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
└── package.json             # Dependencies
```

---

## 🔧 Configuration Files

### app.json - Key Settings
```json
{
  "expo": {
    "name": "STILLNESS",
    "slug": "stillness",
    "version": "1.0.0",
    "android": {
      "package": "com.frezanz.stillness",
      "versionCode": 1
    },
    "ios": {
      "bundleIdentifier": "com.frezanz.stillness"
    }
  }
}
```

### Versioning for Updates
Before each Play Store update:
1. Increment `version` in `app.json` (e.g., "1.0.1")
2. Increment `android.versionCode` (e.g., 2)

---

## 🎵 Audio Credits

All ambient sounds are royalty-free and licensed for commercial use:
- Rain, Wind: [Pixabay](https://pixabay.com)
- Birds, Forest, Stream: [Internet Archive](https://archive.org)
- Other sounds: User-provided

---

## 🔒 Privacy

STILLNESS does **NOT** collect any personal data:
- ✅ All data stored locally on device
- ✅ No analytics or tracking
- ✅ No accounts required
- ✅ No internet connection required (except for initial download)

---

## 🐛 Known Issues

| Issue | Status | Workaround |
|-------|--------|------------|
| Audio not working on web | Known limitation | Use Expo Go on mobile |
| expo-av deprecation warning | Will migrate to expo-audio | No action needed now |

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/stillness/issues) page.

---

<p align="center">
  Made with 🧘 for meditation enthusiasts
</p>
