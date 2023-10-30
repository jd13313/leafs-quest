import Phaser from 'phaser';
import critters from '../critter-list.json';

class Battle extends Phaser.Scene {
    constructor() {
        super('Battle');
        this.commonDimensions;
        this.opponentCritter;
        this.rounds = 0;
        this.playersTurn = true;
        this.playerCritter;
        this.critterList;
        this.battleLog = [];
    }

    init(data) {
        this.leaf = data.leaf;
    }

    create() {
        this.critterList = this.registry.get('critterList');
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
        this.setPlayerCritter();
        this.selectRandomOpponent();
        this.drawText();

        
    }

    preload() {

    }

    update() {
        this.battleLogText.setText(this.battleLog.join('\n'));
    }

    setPlayerCritter() {
        const playerCritterSpriteKey = this.leaf.getData('critterList')[0];

        this.playerCritter = new this.critterList[playerCritterSpriteKey](this, 1, 1);
        this.playerCritter.x = 150;
        this.playerCritter.y = 220;
        this.playerCritter.setScale(-4, 4);
    }

    selectRandomOpponent() {
        const critterKeys = Object.keys(this.critterList);
        const randomIndex = Phaser.Math.Between(0, critterKeys.length - 1);
        const { width:gameWidth, height:gameHeight } = this.sys.game.config;

        this.opponentCritter = new this.critterList[critterKeys[randomIndex]](this, 1, 1);
        this.opponentCritter.x = gameWidth - 150;
        this.opponentCritter.y = 200;
        this.opponentCritter.setScale(4);
    }

    drawText() {
        const playerAttacksHeader = this.add.text(
             20,
             360,
            'Your Attacks',
            {
                ...this.game.config.textStyles.default,
                fontSize: '25px',
                fontWeight: 'bold',
                color: '#ffffff'
            }
        );

        this.playerCritter.getData('attacks').forEach((attack, index) => {
            const attackText = this.add.text(
                20,
                400 + (index * 40),
                attack.name,
                {
                    ...this.game.config.textStyles.default,
                    fontFamily: 'Open Sans',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }
            );

            attackText.setInteractive();
            attackText.on('pointerdown', () => {
                this.handleAttack(attack, 'opponent');
            });
        });
        

        const battleLogHeader = this.add.text( 
            this.commonDimensions.halfWidth + 42, 
            360,
            'Battle Log', 
            {
                ...this.game.config.textStyles.default,
                fontSize: '25px',
                fontWeight: 'bold',
            }
        );

        this.battleLogText = this.add.text(
            this.commonDimensions.halfWidth + 42,
            400,
            '',
            {
                ...this.game.config.textStyles.default,
                fontFamily: 'Open Sans',
                fontSize: '9px'
            }
        );
    }

    handleAttack(attack, target) {
        const attacker = target === 'opponent' ? this.playerCritter : this.opponentCritter;
        const defender = target === 'opponent' ? this.opponentCritter : this.playerCritter;

        const hitRoll = Phaser.Math.Between(0, 20) + attacker.getData('speed');
        const dodgeRoll = Phaser.Math.Between(0, 20) + defender.getData('speed');

        if (hitRoll >= dodgeRoll) {
            let damage = attack.baseDamage + attacker.getData('attack') - defender.getData('defense');
            damage = damage > 0 ? damage : 1;

            defender.setData('health', defender.getData('health') - damage);

            this.battleLog.push(`${attack.name} does ${damage} damage!`);
        } else {
            this.battleLog.push(`${attack.name} misses!`);
        }


        this.playersTurn = !this.playersTurn;
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