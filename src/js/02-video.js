import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const KEY_STORAGE = 'videoplayer-current-time';

populateLastVideoTime();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  const currentTimeSeconds = event.seconds;
  localStorage.setItem(KEY_STORAGE, currentTimeSeconds);
}

function populateLastVideoTime() {
  const savedTime = localStorage.getItem(KEY_STORAGE);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
