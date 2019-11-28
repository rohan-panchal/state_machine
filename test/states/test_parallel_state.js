const assert = require('assert');
const StateBranch = require('../../src/states/state_branch');
const TaskState = require('../../src/states/task_state');
const ParallelState = require('../../src/states/parallel_state');

describe('ParallelState', function () {

    describe('ParallelState.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let first_branch = new StateBranch("Start", [
                new TaskState("Start", null, function (input, context) {
                    return 1
                }, null)
            ]);

            let second_branch = new StateBranch("Start", [
                new TaskState("Start", null, function (input, context) {
                    return 2;
                }, null)
            ]);

            let state = new ParallelState("Test", null, [first_branch, second_branch], null);

            assert(state.name === "Test");
            assert(state.comment === null);
            assert(state.branches.length === 2);
            assert(state.next === null);
            assert(state.is_end === true);
        });
    });

    describe('ParallelState.solve', function () {

        it('should return result of all branches in an array when all branches are succesful', async function () {

            let first_branch = new StateBranch(null, "Start", [
                new TaskState("Start", null, function (input, context) {
                    return 1
                }, null)
            ]);

            let second_branch = new StateBranch(null, "Start", [
                new TaskState("Start", null, function (input, context) {
                    return 2;
                }, null)
            ]);

            let state = new ParallelState("Test", null, [first_branch, second_branch], null);

            let result = await state.solve({}, null);

            assert(Array.isArray(result));
            assert(result[0] === 1);
            assert(result[1] === 2);
        });
    });
});