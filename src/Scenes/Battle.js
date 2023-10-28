import Phaser from 'phaser';
import critters from '../critter-list.json';

class Battle extends Phaser.Scene {
    constructor() {
        super('Battle');
        this.commonDimensions;
        this.opponent;
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.cameras.main.setBackgroundColor(0x9badb7);

        this.graphics = this.add.graphics();

        this.commonDimensions = {
            quarterWidth: this.sys.game.config.width * .25,
            halfWidth: this.sys.game.config.width * .5,
            halfHeight: this.sys.game.config.height * .50,
            twoFifthsHeight: this.sys.game.config.height * .40,
            oneTenthsHeight: this.sys.game.config.height * .10
        }

        this.graphics.lineStyle(5, 0x004012);
    
        this.buildHeaderBox();
        this.buildCombatBox();
        this.buildActionBoxes();
        this.selectRandomOpponent();
        
    }

    preload() {

    }

    update() {

    }

    selectRandomOpponent() {
        const randomIndex = Phaser.Math.Between(0, critters.length - 1);
        const { width:gameWidth, height:gameHeight } = this.sys.game.config;

        this.opponent = this.add.sprite(1, 1, critters[randomIndex]);
        this.opponent.x = gameWidth - 300;
        this.opponent.y = 450;
        this.opponent.setScale(10);
    }

    buildHeaderBox() {
        this.graphics.fillStyle(0x5C8C4D);
        this.graphics.fillRect(
            10, 
            10, 
            this.sys.game.config.width - 20, 
            this.commonDimensions.oneTenthsHeight
        );

        this.graphics.strokeRect(
            10, 
            10, 
            this.sys.game.config.width - 20, 
            this.commonDimensions.oneTenthsHeight
        );
        
        this.add.text(20, this.commonDimensions.oneTenthsHeight / 2 - 16, 'Battle!', {
            ...this.game.config.textStyles.default,
            fontSize: '45px',
            fontWeight: 'bold',
            color: '#ffffff'
        });
    }

    buildCombatBox() {
        this.graphics.fillGradientStyle(
            0x5C8C4D,
            0x5C8C4D,
            0xA6DE95,
            0xA6DE95
        );

        this.graphics.fillRect(
            10, 
            this.commonDimensions.oneTenthsHeight + 20, 
            this.sys.game.config.width - 20, 
            this.commonDimensions.halfHeight - 40
        );
        
        this.graphics.strokeRect(
            10, 
            this.commonDimensions.oneTenthsHeight + 20, 
            this.sys.game.config.width - 20, 
            this.commonDimensions.halfHeight - 40
        );
    }

    buildActionBoxes() {
        this.graphics.lineStyle(5, 0x004012);
        this.graphics.fillGradientStyle(
            0xA6DE95,
            0xA6DE95,
            0x5C8C4D,
            0x5C8C4D
        );

        this.drawBoxBottom(
            10, 
            10, 
            this.commonDimensions.quarterWidth, 
            this.commonDimensions.twoFifthsHeight
        );

        this.drawBoxBottom(
            this.commonDimensions.quarterWidth + 20, 
            10, 
            this.commonDimensions.quarterWidth, 
            this.commonDimensions.twoFifthsHeight
        );

        this.drawBoxBottom(
            (this.commonDimensions.quarterWidth + 15) * 2, 
            10, 
            this.commonDimensions.halfWidth - 40, 
            this.commonDimensions.twoFifthsHeight
        );
    }

    drawBoxBottom(x, y, width, height) {
        const { height:gameHeight } = this.sys.game.config;

        this.graphics.fillRect(x, gameHeight - height - y, width, height);
        this.graphics.strokeRect(x, gameHeight - height - y, width, height);
    } 
}

export default Battle;