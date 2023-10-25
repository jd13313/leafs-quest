import Phaser from "phaser";
import Leaf from '../Sprites/Leaf';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.cursors;
    this.leaf;
    this.keys;
  }

  create() {
    this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'grass').setOrigin(0, 0);
    this.leaf = new Leaf(this, 100, 100);
    this.cameras.main.startFollow(this.leaf, true, 0.05, 0.05);
  }

  update() {
    this.leaf.update();
  }
}

export default Game;