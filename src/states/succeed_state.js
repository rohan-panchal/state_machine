const {
    SucceedStateType
} = require('./state_types');
const State = require('./state');

module.exports = class SucceedState extends State {

    constructor(name, comment = null) {
        super(SucceedStateType, name, comment);
    }

    async solve(input, context) {
        return true;
    }

    serialize() {
        return {
            Type: this.type
        };
    }
};