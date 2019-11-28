const assert = require('assert');
const FailState = require('../../src/states/fail_state');

describe('FailState', function () {

    describe('FailState.solve', function () {

        it('should return false', async function () {

            let state = new FailState("Test", null);

            let result = await state.solve();

            assert(!result);
        });
    });
});