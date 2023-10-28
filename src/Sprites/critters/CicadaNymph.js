import Critter from "./Critter";

class CicadaNymph extends Critter {
    constructor(scene, x, y,) {
        super(scene, x, y, 'cicadaNymph');

        this.setAttacks(['stab']);
    }
}

export default CicadaNymph;