const {
    FailStateType
} = require('./state_types');
const State = require('./state');

module.exports = class FailState extends State {

    constructor(name, comment = null, error, cause) {
        super(FailStateType, name, comment);

        this.error = error;
        this.cause = cause;
    }

    async solve(input, context) {
        return false;
    }

    serialize() {
        return {
            Type: this.type,
            Error: this.error,
            Cause: this.cause
        };
    }
};