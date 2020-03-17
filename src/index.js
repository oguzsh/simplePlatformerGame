// Phaser
import Phaser from 'phaser';

// Phaser config
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: { preload: preload, create: create, update: update }
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

function preload() {}

function create() {}

function update() {}
