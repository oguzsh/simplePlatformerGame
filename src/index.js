// Phaser
import Phaser from 'phaser';

// Assets
import bg from './assets/bg.png';
import playerSprite from './assets/player.png';
import ground from './assets/platform.png';

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
  this.load.spritesheet('player', playerSprite, {
    frameWidth: 32,
    frameHeight: 48
  });
}

let platforms;
let player;

function create() {
  /* ========================== */
  /* == BACKGROUND & GROUND == */
  /* ========================== */
  this.add.image(400, 300, 'bg');
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, 'ground')
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  /* ========================== */
  /* ========= PLAYER ========= */
  /* ========================== */
  player = this.physics.add.sprite(100, 450, 'player');

  // Add Collider
  this.physics.add.collider(player, platforms);

  player.setBounce(0.2);
  player.body.setGravityY(330);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'player', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
}

// Keyboard control
let cursors;
function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
