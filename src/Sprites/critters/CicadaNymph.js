import Critter from "./Critter";

class CicadaNymph extends Critter {
    constructor(scene, x, y,) {
        super(scene, x, y, 'cicadaNymph');

        this.setData('attack', 5);
        this.setData('defense', 15);
        this.setData('speed', 3);
        this.setAttacks(['stab', 'dig', 'bite']);
    }
}

export default CicadaNymph;