import { Audio, AVPlaybackStatus } from 'expo-av';
import { SoundTrack } from '../context/AppContext';

export class AudioManager {
  private sounds: Map<string, Audio.Sound> = new Map();
  private masterVolumeCap = 0.3; // 30% master cap as specified

  async loadSound(track: SoundTrack): Promise<void> {
    try {
      if (this.sounds.has(track.id)) {
        return; // Already loaded
      }

      const { sound } = await Audio.Sound.createAsync(
        track.file,
        {
          isLooping: true,
          volume: 0,
        }
      );

      this.sounds.set(track.id, sound);
    } catch (error) {
      console.error(`Error loading sound ${track.id}:`, error);
    }
  }

  async playSound(trackId: string, volume: number): Promise<void> {
    try {
      const sound = this.sounds.get(trackId);
      if (!sound) {
        console.error(`Sound ${trackId} not loaded`);
        return;
      }

      const status = await sound.getStatusAsync();
      const adjustedVolume = (volume / 100) * this.masterVolumeCap;

      if (status.isLoaded) {
        await sound.setVolumeAsync(adjustedVolume);
        
        if (!status.isPlaying) {
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.error(`Error playing sound ${trackId}:`, error);
    }
  }

  async stopSound(trackId: string): Promise<void> {
    try {
      const sound = this.sounds.get(trackId);
      if (!sound) return;

      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
      }
    } catch (error) {
      console.error(`Error stopping sound ${trackId}:`, error);
    }
  }

  async setVolume(trackId: string, volume: number): Promise<void> {
    try {
      const sound = this.sounds.get(trackId);
      if (!sound) return;

      const adjustedVolume = (volume / 100) * this.masterVolumeCap;
      await sound.setVolumeAsync(adjustedVolume);
    } catch (error) {
      console.error(`Error setting volume for ${trackId}:`, error);
    }
  }

  async stopAll(): Promise<void> {
    try {
      const promises = Array.from(this.sounds.keys()).map(id => this.stopSound(id));
      await Promise.all(promises);
    } catch (error) {
      console.error('Error stopping all sounds:', error);
    }
  }

  async unloadAll(): Promise<void> {
    try {
      for (const [id, sound] of this.sounds.entries()) {
        await sound.unloadAsync();
        this.sounds.delete(id);
      }
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

export const audioManager = new AudioManager();
