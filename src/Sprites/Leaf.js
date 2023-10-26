import Entity from '../Entity.js';
class Leaf extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'leafWalkYDown');
        this.scene.add.existing(this);
        this.setFrame(1);
        this.setScale(2);
        this.prepareAnimations();
        this.keys = scene.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT');
    }

    update() {
        const { keys } = this;
        const keysPressed = Object.entries(keys).filter(([, keyData]) => keyData.isDown);

        this.handleMovement(keysPressed);
        this.handleMovementAnimation(keysPressed);
    }

    prepareAnimations() {
        const frameRate = 20;
        const anims = this.scene.anims;
        
        // Leaf walks along the X axis
        anims.create({
            key: 'leafWalkXAnim',
            frames: anims.generateFrameNumbers('leafWalkX', { start: 0, end: 2 }),
            frameRate,
            repeat: 1
        });

        // Leaf walks up the Y axis
        anims.create({
            key: 'leafWalkYUpAnim',
            frames: anims.generateFrameNumbers('leafWalkYUp', { start: 0, end: 2 }),
            frameRate,
            repeat: 1,
        });

        // Leaf walks down the Y axis
        anims.create({
            key: 'leafWalkYDownAnim',
            frames: anims.generateFrameNumbers('leafWalkYDown', { start: 0, end: 2 }),
            frameRate,
            repeat: 1,
        });
    }

    handleMovement(keysPressed) {
        const speed = 100;
        const prevVelocity = this.body.velocity.clone();

        this.body.setVelocity(0);

        if(keysPressed.length){
            keysPressed.forEach(([keyName]) => {
                switch(keyName) {
                    case 'LEFT':
                    case 'A':
                        this.body.setVelocityX(-speed);
                        break;
                    case 'RIGHT':
                    case 'D':
                        this.body.setVelocityX(speed);
                        break;
                    case 'UP':
                    case 'W':
                        this.body.setVelocityY(-speed);
                        break;
                    case 'DOWN':
                    case 'S':
                        this.body.setVelocityY(speed);
                        break;
                    default:
                        break;
                }
            });
        }

        this.body.velocity.normalize().scale(speed);
    }

    handleMovementAnimation(keysPressed) {
        if(keysPressed.length) {
            keysPressed.forEach(([keyName]) => {
                switch(keyName) {
                    case 'LEFT':
                    case 'A':
                        this.anims.play('leafWalkXAnim', true);
                        this.flipX = false;
                        break;
                    case 'RIGHT':
                    case 'D':
                        this.anims.play('leafWalkXAnim', true);
                        this.flipX = true;
                        break;
                    case 'UP':
                    case 'W':
                        this.anims.play('leafWalkYUpAnim', true);
                        break;
                    case 'DOWN':
                    case 'S':
                        this.anims.play('leafWalkYDownAnim', true);
                        break;
                    default:
                        this.anims.stop();
                        this.setFrame(1);
                        break;
                }
            });
        }
    }
}

export default Leaf;