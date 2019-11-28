const {
    ParallelStateType
} = require('./state_types');
const State = require('./state');
const StateBranch = require('./state_branch');

module.exports = class ParallelState extends State {

    /**
     *
     * @param name     string
     * @param comment  string
     * @param branches [StateBranch]
     * @param next     string
     */
    constructor(name, comment = null, branches, next = null) {
        super(ParallelStateType, name, comment);

        this.branches = branches;
        this.next = next;
        this.is_end = (next === null);
    }

    async solve(input, context) {
        return Promise.all(
            this.branches.map((branch) => {
                return branch.solve(input, context);
            })
        );
    }

    serialize() {
        return {
            Type: this.type,
            Branches: this.branches.map((branch) => branch.serialize()),
            Next: this.next
        }
    }
};