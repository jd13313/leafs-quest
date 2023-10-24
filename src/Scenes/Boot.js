import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
      super('Boot');
  }

  preload() {
    const leafSpriteDimensions = { frameWidth: 16, frameHeight: 16 };

    this.load.spritesheet('leafWalkX', 'spritesheets/leaf/walk-x.png', leafSpriteDimensions);
    this.load.image('leafIdleUp', 'spritesheets/leaf/idle-y-up.png');
    this.load.image('leafIdleDown', 'spritesheets/leaf/idle-y-down.png');
    this.load.image('leafIdleX', 'spritesheets/leaf/idle-x.png');

    this.game.config.textStyles = {
      default: {
        fontFamily: 'Amatic SC',
        fill: '#333'
      }
    }
  }

  create() {
    this.scene.start('Game');
  }
}

export default Boot;