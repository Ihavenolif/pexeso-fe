export class Card {
    /**
     * @type {Number}
     */
    id;

    /**
     * @type {String}
     */
    name;

    /**
     * @type {Number}
     */
    wowClass;

    /**
     * @type {Number}
     */
    wowRole;

    /**
     * @type {Boolean}
     */
    flipped = false;

    /**
     * @type {Boolean}
     */
    hidden = false;

    /**
     * 
     * @param {Number} id 
     * @param {String} name 
     * @param {Number} wowClass 
     * @param {Number} wowRole 
     */
    constructor(id, name, wowClass, wowRole) {
        this.id = id;
        this.name = name;
        this.wowClass = wowClass;
        this.wowRole = wowRole;

    }
}