const playSound = (sound, volume = 0.0) => {
  sound.setVolume(volume + 0.5);
  sound.play(s =>
    s
      ? console.log('sound played')
      : console.log('something went wrong, sound not played'),
  );
};

export {playSound};
