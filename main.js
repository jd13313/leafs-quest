import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';
import Boot from './src/Scenes/Boot';
import Game from './src/Scenes/Game';
import './src/style.scss'

const debugOptions = {
  phsyics: false,
  triggerBattleImmediately: false,
};

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    zoom: 1,
    width: window.innerWidth,
    height: window.innerHeight,
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
  ],
}

WebFontLoader.load({
  google: {
    families: [
      'Amatic SC',
    ]
  },
  active: () => {
    const game = new Phaser.Game(config);
    game.config.debugOptions = debugOptions;
    game.config.textStyle = {};
  }
});