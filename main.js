import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import Boot from './src/Scenes/Boot';
import Game from './src/Scenes/Game';
import Battle from './src/Scenes/Battle';
import './src/style.scss'

const debugOptions = {
  phsyics: false,
  triggerBattleImmediately: true,
};

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
      debug: debugOptions.phsyics,
      gravity: { y: 0 }
    }
  },
  scene: [
    Boot,
    Game,
    Battle
  ],
}

WebFontLoader.load({
  google: {
    families: [
      'Open Sans',
      'Pixelify Sans'
    ]
  },
  active: () => {
    const game = new Phaser.Game(config);
    game.config.debugOptions = debugOptions;
    game.config.textStyle = {};
  }
});