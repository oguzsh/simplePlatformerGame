// Phaser
import Phaser from 'phaser';
import Game from './scenes/Game';

// Phaser config
const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Game]
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
