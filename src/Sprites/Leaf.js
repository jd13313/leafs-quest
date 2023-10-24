class Leaf extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'leafIdleDown');
        this.scene.add.existing(this);
        this.setupSprite();
        this.setScale(2);
    }

    setupSprite() {
        this.anims.create({
            key: 'leafWalkXAnim',
            frames: this.anims.generateFrameNumbers('leafWalkX', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    moveInDirection(direction) {
        const distance = 2;

        // Up / Down
        if (['up', 'down'].includes(direction)) {
            this.anims.stop();
            
            if (direction === 'up') {
                this.setTexture('leafIdleUp');
                this.y -= distance;
            } else {
                this.setTexture('leafIdleDown');
                this.y += distance;
            }
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
        }
    }
}

export default Leaf;