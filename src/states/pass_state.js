const {
    PassStateType
} = require('./state_types');
const State = require('./state');

const put = require('../util/put');

module.exports = class PassState extends State {

    /**
     * Constructs a PassState object.
     *
     * @param name string
     * @param comment string
     * @param result object
     * @param result_path string
     * @param next string
     */
    constructor(name, comment = null, result, result_path, next = null) {
        super(PassStateType, name, comment);

        this.result = result;
        this.result_path = result_path;
        this.next = next;
        this.is_end = (next === null);
    }

    async solve(input, context) {

        if (this.result !== null && this.result_path !== null) {
            put(input, this.result_path, this.result);
        }

        return input;
    }

    serialize() {
        return {
            Type: this.type,
            Comment: this.comment,
            Result: this.result,
            ResultPath: this.result_path,
            Next: this.next
        }
    }
};
