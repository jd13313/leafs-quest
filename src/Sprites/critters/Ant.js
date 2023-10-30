import Critter from "./Critter";

class Ant extends Critter {
    constructor(scene, x, y,) {
        super(scene, x, y, 'ant');

        this.setAttacks(['bite']);
    }
}

export default Ant;