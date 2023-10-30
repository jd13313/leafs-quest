import Critter from "./Critter";

class Ant extends Critter {
    constructor(scene, x, y,) {
        super(scene, x, y, 'ant');

        this.setData('attack', 7);
        this.setData('defense', 10);
        this.setData('speed', 7);
        this.setAttacks(['bite']);
    }
}

export default Ant;