const assert = require('assert');
const SucceedState = require('../../src/states/succeed_state');

describe('SucceedState', function () {

    describe('SucceedState.solve', function () {

        it('should return true', async function () {

            let state = new SucceedState("Test", null);

            let result = await state.solve();

            assert(result);
        });
    });
});