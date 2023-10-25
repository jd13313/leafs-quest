import Entity from '../Entity.js';
class Leaf extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'leafWalkYDown');
        this.scene.add.existing(this);
        this.setFrame(1);
        this.setScale(2);

        const frameRate = 20;
        const anims = scene.anims;

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

        const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        });
    }

    update() {
        const {keys} = this;
        const speed = 100;
        const prevVelocity = this.body.velocity.clone();

        this.body.setVelocity(0);

        // Movement
        if(keys.left.isDown || keys.a.isDown) {
            this.body.setVelocityX(-speed);
        } else if(keys.right.isDown || keys.d.isDown) {
            this.body.setVelocityX(speed);
        }

        if(keys.up.isDown || keys.w.isDown) {
            this.body.setVelocityY(-speed);
        } else if(keys.down.isDown || keys.s.isDown) {
            this.body.setVelocityY(speed);
        }

        this.body.velocity.normalize().scale(speed);
    
        // Animation

        if(keys.left.isDown || keys.a.isDown) {
            this.anims.play('leafWalkXAnim', true);
            this.flipX = false;
        } else if(keys.right.isDown || keys.d.isDown) {
            this.anims.play('leafWalkXAnim', true);
            this.flipX = true;
        } else if(keys.up.isDown || keys.w.isDown) {
            this.anims.play('leafWalkYUpAnim', true);
        } else if(keys.down.isDown || keys.s.isDown) {
            this.anims.play('leafWalkYDownAnim', true);
        } else {
            this.anims.stop();
            this.setFrame(1);
        }
    }
}

export default Leaf;