import Phaser from 'phaser';

// Assets
import bg from '../assets/bg.png';
import playerSprite from '../assets/player.png';
import ground from '../assets/platform.png';
import block from '../assets/block.png';
import smallPlatform from '../assets/smallPlatform.png';
import coin from '../assets/coin.png';

// Helpers
import keyboardManager from '../helpers/keyboardManager';

// Variables
let platforms;
let player;
let cursors;
let coins;
let score = 0;

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('coin', coin);
    this.load.image('ground', ground);
    this.load.image('smallPlatform', smallPlatform);
    this.load.image('block', block);
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
      .create(400, 560, 'ground')
      .setScale(0.8).refreshBody();
    platforms.create(550, 450, 'smallPlatform');
    platforms.create(120, 300, 'smallPlatform');
    platforms.create(320, 380, 'smallPlatform');
    platforms.create(720, 220, 'smallPlatform');
    platforms.create(280, 220, 'block');
    platforms.create(450, 200, 'block');

    /* ========================== */
    /* ========= PLAYER ========= */
    /* ========================== */
    player = this.physics.add.sprite(100, 450, 'player');

    // Add Collider
    this.physics.add.collider(player, platforms);

    player.setBounce(0.2);
    player.body.setGravityY(330);
    player.setCollideWorldBounds(true);

    // Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 5,
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


    // Coins
    coins = this.physics.add.group({
      key: 'coin',
      repeat: 11,
      setXY: { x: 20, y: 0, stepX: 68 }
    });

    coins.children.iterate((child) => {
      child.setBounceY(0.2);
    });

    this.physics.add.collider(coins, platforms);
    this.physics.add.overlap(player, coins, collectCoins, null, this);

    // Score
    const scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000'
    });


    // eslint-disable-next-line no-shadow
    function collectCoins(player, coin) {
      coin.disableBody(true, true);
      score += 10;
      scoreText.setText(`Score: ${score}`);
      if (coins.countActive(true) === 0) {
        const gameOverText = this.add.text(300, 300, 'GAME OVER', { fontSize: '32px', fill: '#000' });
        gameOverText.setDepth(1);
      }
    }
  }

  update() {
    cursors = this.input.keyboard.createCursorKeys();
    keyboardManager(cursors, player);
  }
}
