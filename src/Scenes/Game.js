import Phaser from "phaser";
import Leaf from "../Sprites/Leaf";
import CicadaNymph from "../Sprites/critters/CicadaNymph";
import Ant from "../Sprites/critters/Ant";

class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.cursors;
    this.leaf;
    this.keys;
  }

  create() {
    this.registry.set("critterList", {
      CicadaNymph,
      Ant,
    });

    this.cameras.main.setBackgroundColor("#1A8407");

    this.leaf = new Leaf(this, 100, 100);
    this.cameras.main.startFollow(this.leaf, true, 0.05, 0.05);

    const grassSpriteNames = this.registry.get("allGrassSpriteKeys");
    const grassSpritesToRender = 500;
    const { width, height } = this.game.config;

    let potentialCoordinates = {
      x: Phaser.Math.Between(0, width),
      y: Phaser.Math.Between(0, height),
    };

    let previousCoordinates = { ...potentialCoordinates };

    for (let i = 0; i < grassSpritesToRender; i++) {
      const coinFlip = Phaser.Math.Between(0, 1);
      const randomSpriteKey = Phaser.Math.Between(
        0,
        grassSpriteNames.length - 1,
      );

      const xRangeNumber = Phaser.Math.Between(1, 100);
      const yRangeNumber = Phaser.Math.Between(1, 100);
      const coordinates = {
        x:
          previousCoordinates.x +
          Phaser.Math.Between(-xRangeNumber, xRangeNumber),
        y:
          previousCoordinates.y +
          Phaser.Math.Between(-yRangeNumber, yRangeNumber),
      };

      previousCoordinates = { ...coordinates };

      this.add
        .image(coordinates.x, coordinates.y, grassSpriteNames[randomSpriteKey])
        .setDepth(0);
    }

    const { triggerBattleImmediately } = this.game.config.debugOptions;
    this.triggerTimer = this.time.addEvent({
      callback: this.encounterCheckCallback,
      callbackScope: this,
      delay: triggerBattleImmediately ? 1 : 3000,
      loop: true,
    });

    this.battleStartSound = this.sound.add("battleStart");
  }

  update() {
    this.leaf.update();
  }

  encounterCheckCallback() {
    if (!this.leaf.allowEncounters || this.leaf.encounterActive) return;

    const { triggerBattleImmediately } = this.game.config.debugOptions;

    const threshold = 101;
    const randomValue = Phaser.Math.Between(1, 100);

    if (threshold <= randomValue) {
      this.leaf.encounterActive = true;
      this.leaf.allowEncounters = false;

      this.battleStartSound.play();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        (cam, effect) => {
          this.scene.launch("Battle", {
            leaf: this.leaf,
          });
        },
      );
    }
  }
}

export default Game;
