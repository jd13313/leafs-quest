import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
      super('Boot');
  }

  preload() {
    const leafSpriteDimensions = { frameWidth: 11, frameHeight: 16 };

    this.load.spritesheet('leafWalkX', 'spritesheets/leaf/walk-x.png', leafSpriteDimensions);
    this.load.spritesheet('leafWalkYUp', 'spritesheets/leaf/walk-y-up.png', leafSpriteDimensions);
    this.load.spritesheet('leafWalkYDown', 'spritesheets/leaf/walk-y-down.png', leafSpriteDimensions);

    this.load.image('grass', 'grass.png');

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