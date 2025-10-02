export const resetSFX = (audio: false | HTMLAudioElement, muted: boolean) => {
  if (!audio) return;

  audio.muted = muted;
  audio.currentTime = 0;
  audio.volume = 0.5;

  if (muted) return;

  audio.play();
};

export const getTimerDisplay = (timer: number, percent: number): string => {
  const timerLeft = timer * percent;
  const timerMinutesLeft = Math.floor(timerLeft);
  const timerSecondsLeft = Math.floor((timerLeft * 60) % 60);

  const minutesDisplay = `${timerMinutesLeft < 10 ? '0' : ''}${timerMinutesLeft}`;
  const secondsDisplay = `${timerSecondsLeft < 10 ? '0' : ''}${timerSecondsLeft}`;

  return `${minutesDisplay}:${secondsDisplay}`;
};
