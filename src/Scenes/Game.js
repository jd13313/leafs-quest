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

    const { triggerBattleImmediately } = this.game.config.debugOptions;
    this.triggerTimer = this.time.addEvent({
      callback: this.encounterCheckCallback,
      callbackScope: this,
      delay: triggerBattleImmediately ? 1 : 3000,
      loop: true
    });
  }

  update() {
    this.leaf.update();
  }

  encounterCheckCallback() {
    if (!this.leaf.allowEncounters || this.leaf.encounterActive) return;

    const { triggerBattleImmediately } = this.game.config.debugOptions;
    
    const threshold = triggerBattleImmediately ? 1 : 40;
    const randomValue = Phaser.Math.Between(1, 100);

    if (threshold <= randomValue) {
      this.leaf.encounterActive = true;
      this.leaf.allowEncounters = false;
      this.scene.launch('Battle');
    }
  }
}

export default Game;