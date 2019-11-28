const {
    PassStateType,
    TaskStateType,
    ChoiceStateType,
    WaitStateType,
    SucceedStateType,
    FailStateType,
    ParallelStateType,
} = require('./state_types');

module.exports = class StateBranch {

    /**
     * @param comment  string
     * @param start_at string
     * @param states   [State]
     */
    constructor(comment=null, start_at, states) {
        this.comment = comment;
        this.start_at = start_at;
        this.states = states;
    }

    async solve(input, context) {

        return this.solveState(input, this.start_at);
    }

    async solveState(input = null, name) {

        let state = this.states.filter((state) => state.name === name)[0];

        if (state) {

            let output = null;
            let next = null;

            switch (state.type) {
                case PassStateType:

                    output = await state.solve(input);
                    next = state.next;

                    break;
                case TaskStateType:

                    output = await state.solve(input);
                    next = state.next;

                    break;
                case ChoiceStateType:

                    // Returns first successful choice rule.
                    next = await state.solve(input);
                    output = input;

                    break;
                case WaitStateType:

                    await state.solve(input);
                    output = input;
                    next = state.next;

                    break;
                case SucceedStateType:

                    return input;
                case FailStateType:

                    return state.error;
                case ParallelStateType:

                    output = await state.solve(input);
                    next = state.next;

                    break;
            }

            if (state.is_end) {
                return output;
            }

            return this.solveState(output, next);

        } else {
            throw `No state found with name:${name}`;
        }
    }

    serialize() {

        let state_objects = { };

        this.states.forEach((state) => {
            state_objects[state.name] = state.serialize();
        });



        return {
            Comment: this.comment,
            StartAt: this.start_at,
            States: state_objects
        };
    }
};