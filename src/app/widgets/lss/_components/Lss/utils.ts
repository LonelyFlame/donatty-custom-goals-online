export const resetSFX = (audio: false | HTMLAudioElement, muted: boolean) => {
  if (!audio) return;

  audio.muted = muted;
  audio.currentTime = 0;
  audio.volume = 0.5;

  if (muted) return;

  audio.play();
};
