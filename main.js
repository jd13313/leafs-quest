import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import Boot from './src/Scenes/Boot';
import Game from './src/Scenes/Game';

const debugEnabled = false;

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    zoom: 1,
    width: 800,
    height: 600,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    mode: Phaser.Scale.FIT
  },
  backgroundColor: 0x444444,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: debugEnabled,
      gravity: { y: 0 }
    }
  },
  scene: [
    Boot,
    Game,
  ],
  textStyles: {}
}

WebFontLoader.load({
  google: {
    families: [
      'Amatic SC',
    ]
  },
  active: () => {
    const game = new Phaser.Game(config);
  }
});