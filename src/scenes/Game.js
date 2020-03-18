import Phaser from 'phaser';

// Assets
import bg from '../assets/bg.png';
import playerSprite from '../assets/player.png';
import ground from '../assets/platform.png';
import playerManager from '../helpers/playerManager';

let platforms;
let player;
let cursors;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('ground', ground);
    this.load.spritesheet('player', playerSprite, {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
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

  update() {
    cursors = this.input.keyboard.createCursorKeys();
    playerManager(cursors, player);
  }
}
