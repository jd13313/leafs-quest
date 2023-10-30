import Critter from "./Critter";

class CicadaNymph extends Critter {
    constructor(scene, x, y,) {
        super(scene, x, y, 'cicadaNymph');

        this.setAttacks(['stab', 'dig', 'bite']);
    }
}

export default CicadaNymph;