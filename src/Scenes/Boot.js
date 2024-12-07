import Phaser from "phaser";
import { addLeadingZero } from "../utilities";

class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    const leafSpriteDimensions = { frameWidth: 11, frameHeight: 16 };

    this.load.spritesheet(
      "leafWalkX",
      "spritesheets/leaf/walk-x.png",
      leafSpriteDimensions,
    );
    this.load.spritesheet(
      "leafWalkYUp",
      "spritesheets/leaf/walk-y-up.png",
      leafSpriteDimensions,
    );
    this.load.spritesheet(
      "leafWalkYDown",
      "spritesheets/leaf/walk-y-down.png",
      leafSpriteDimensions,
    );

    this.load.image("grass", "grass.png");
    this.load.image("leafCorner", "leafCorner.png");

    this.load.image("cicadaNymph", "critters/cicada-nymph.png");
    this.load.image("ant", "critters/ant.png");

    this.load.audio("battleStart", "sounds/battle-start.mp3");

    const grassSpriteCount = 11;
    const grassSpriteList = [];
    for (let i = 1; i <= grassSpriteCount; i++) {
      const spriteName = `grasses-${addLeadingZero(i, 4)}`;
      grassSpriteList.push(spriteName);
      this.load.image(spriteName, `grasses/${spriteName}.png`);
    }

    this.registry.set("allGrassSpriteKeys", grassSpriteList);

    this.game.config.textStyles = {
      default: {
        fontFamily: "Pixelify Sans",
      },
    };
  }

  create() {
    this.scene.start("Game");
  }
}

export default Boot;
