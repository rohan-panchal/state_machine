const { TaskStateType } = require('./state_types');

module.exports = class State {

    /**
     * Constructs a State object.
     *
     * @param type StateType
     * @param name string
     * @param comment string
     */
    constructor(type = TaskStateType, name, comment = null) {
        this.type = type;
        this.name = name;
        this.comment = comment;
    }

    async solve(input, context) {
        throw "Invalid solve method";
    }

    serialize() {
        throw "Invalid serialize method";
    }
};