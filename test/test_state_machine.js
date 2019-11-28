const assert = require('assert');
const state_machine = require('../src');

describe('state_machine.StateMachine', function() {

    describe('StateMachine.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let states = { };

            let machine = new state_machine.StateBranch(null, "Test", states);

            assert(machine.start_at === "Test");
            assert(machine.states !== null);
        });
    });

    describe('StateMachine.solve', function () {

        it('should return true when all states succeed', async function () {

            let start = new state_machine.TaskState("Start", null, function() { return 1 }, "Middle");
            let middle = new state_machine.TaskState("Middle", null, function() { return 2 }, "End");
            let end = new state_machine.SucceedState("End", null);
            let states = [start, middle, end];

            let machine = new state_machine.StateBranch(null, "Start", states);

            let result = await machine.solve();

            assert(result);
        });
    });
});