import Entity from '../Entity';
import attacksList from '../../attacks.json';

class Critter extends Entity {
    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey);

        this.setData('health', 100);
        this.setData('attack', 10);
        this.setData('defense', 10);
        this.setData('speed', 10);
        this.setData('level', 1);
        this.setData('attacks', []);
        this.setData('spriteRotation', 0);

        this.attacksList = attacksList;
    }

    setAttacks(attacks = []) {
        this.setData('attacks', attacks.map(attack => {
            if (this.attacksList.hasOwnProperty(attack)) {
                return this.attacksList[attack];
            }
        }));
    }
}

export default Critter;