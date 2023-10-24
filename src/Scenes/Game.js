import Phaser from "phaser";
import Leaf from '../Sprites/Leaf';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.leaf = new Leaf(this, 100, 100);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let direction = Object.entries(this.cursors).find(([, cursor]) => cursor.isDown);

    direction = direction ? direction[0] : null;
    this.leaf.moveInDirection(direction);
  }
}

export default Game;