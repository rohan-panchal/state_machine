const assert = require('assert');
const state_machine = require('../../src');

describe('PassState', function () {

    describe('PassState.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let state = new state_machine.PassState("Test",
                null,
                { x: 1, y: 1 },
                "$.coordinates",
                "End");

            assert(state.name === "Test");
            assert(state.comment === null);
            assert(state.result !== null);
            assert(state.result_path === "$.coordinates");
            assert(state.next === "End");
        });
    });

    describe('PassState.solve', function () {

        it('should solve correctly with result and result_path', function () {

            let state = new state_machine.PassState("Test",
                null,
                { x: 1, y: 1 },
                "$.coordinates",
                "End");

            let input = {
                name: "TestLocation"
            };
            let output = state.solve(input);

            assert(output.coordinates !== null);
        });

        it('should solve correctly without result and result_path', async function () {

            let state = new state_machine.PassState("Test",
                null,
                null,
                null,
                "End");

            let input = {
                name: "Test"
            };
            let output = await state.solve(input);

            assert(output === input);
        });
    });

});
