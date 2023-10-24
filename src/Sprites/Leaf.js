class Leaf extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'leafWalkYDown');
        this.setFrame(1);
        this.scene.add.existing(this);
        this.setupSprite();
        this.setScale(2);
        this.previousCoordinates = { x, y };
    }

    setupSprite() {
        this.anims.create({
            key: 'leafWalkXAnim',
            frames: this.anims.generateFrameNumbers('leafWalkX', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: 'leafWalkYUpAnim',
            frames: this.anims.generateFrameNumbers('leafWalkYUp', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1,
        })

        this.anims.create({
            key: 'leafWalkYDownAnim',
            frames: this.anims.generateFrameNumbers('leafWalkYDown', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 1,
        })
    }

    moveInDirection(direction) {
        const distance = 2;
        this.lastFacingDirection = direction;

        // Up / Down
        if (['up', 'down'].includes(direction)) {

            if (direction === 'up') {
                this.anims.play('leafWalkYUpAnim', true);
                this.y -= distance;
            } else {
                this.anims.play('leafWalkYDownAnim', true);
                this.y += distance;
            }

            return;
        }

        // Left / Right
        if (['left', 'right'].includes(direction)) {
            this.anims.play('leafWalkXAnim', true);

            if (direction === 'left') {
                this.flipX = false;
                this.x -= distance;
            } else {
                this.flipX = true;
                this.x += distance;
            }

            return;
        }
        
        
        this.anims.stop();
        this.setFrame(1);
    }
}

export default Leaf;