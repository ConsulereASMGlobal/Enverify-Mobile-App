import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let ding: any = null;

const initializeAudio = () => {
  ding = new Sound(require('../assets/sounds/soundER.mp3'), error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log(
      'duration in seconds: ' +
        ding.getDuration() +
        'number of channels: ' +
        ding.getNumberOfChannels()
    );
  });
  ding.setVolume(1);
};

const playPause = () => {
  ding.play((success: boolean) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};

const setVolume = (volume: number) => {
  if (ding) {
    ding.setVolume(volume);
  }
};

const releaseAudio = () => {
  if (ding) {
    ding.release();
    ding = null;
  }
};

export { initializeAudio, setVolume, playPause, releaseAudio };
