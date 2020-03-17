// Phaser
import Phaser from 'phaser';

// Assets
import bg from './assets/bg.png';
import ball from './assets/blue_ball.png';
import ground from './assets/platform.png';
import tomato from './assets/tomato.png';

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

function preload() {
  this.load.image('bg', bg);
  this.load.image('ground', ground);
}

let platforms;
function create() {
  this.add.image(400, 300, 'bg');
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function update() {}
