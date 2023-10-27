import Phaser from 'phaser';

class Battle extends Phaser.Scene {
    constructor() {
        super('Battle');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x9badb7);

        this.graphics = this.add.graphics();
        const { width:gameWidth, height:gameHeight } = this.sys.game.config;
        const quarterWidth = gameWidth * .25;
        const halfWidth = gameWidth * .5;
        const threeFifthsHeight = gameHeight * .60;
        const twoFifthsHeight = gameHeight * .40;
    
        
        this.graphics.lineStyle(5, 0x004012);
        this.graphics.fillGradientStyle(
            0x5C8C4D,
            0x5C8C4D,
            0xA6DE95,
            0xA6DE95
        );
        this.graphics.fillRect(10, 10, gameWidth - 20, threeFifthsHeight - 30);
        this.graphics.strokeRect(10, 10, gameWidth - 20, threeFifthsHeight - 30);

        this.graphics.lineStyle(5, 0x004012);
        this.graphics.fillGradientStyle(
            0xA6DE95,
            0xA6DE95,
            0x5C8C4D,
            0x5C8C4D
        );
        this.drawBoxBottom(10, 10, quarterWidth, twoFifthsHeight);
        this.drawBoxBottom(quarterWidth + 20, 10, quarterWidth, twoFifthsHeight);
        this.drawBoxBottom((quarterWidth + 15) * 2, 10, halfWidth - 40, twoFifthsHeight);
    }

    preload() {

    }

    update() {

    }

    drawBoxBottom(x, y, width, height) {
        const { height:gameHeight } = this.sys.game.config;

        this.graphics.fillRect(x, gameHeight - height - y, width, height);
        this.graphics.strokeRect(x, gameHeight - height - y, width, height);
    }

    
}

export default Battle;