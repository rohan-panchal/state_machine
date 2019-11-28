const assert = require('assert');
const { WaitState, WaitStateUnitType } = require('../../src/states/wait_state');

describe('WaitState', function () {

    describe('WaitState.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let state = new WaitState("Test",
                null,
                WaitStateUnitType.Seconds,
                1,
                "Next");

            assert(state.name === "Test");
            assert(state.comment === null);
            assert(state.units === WaitStateUnitType.Seconds);
            assert(state.value === 1);
            assert(state.next === "Next");
        });
    });
    
    describe('WaitState.solve', function () {

        describe('units === WaitStateUnitType.Seconds', function () {

            it('should return true with a correct seconds value', async function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.Seconds,
                    0,
                    "Next");

                let result = await state.solve(null, null);

                assert(result === true);
            });

            it('should throw exception if seconds value is not a number', function () {
                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.Seconds,
                    "1",
                    "Next");

                assert.rejects(state.solve(null, null));
            });
        });

        describe('units === WaitStateUnitType.SecondsPath', function () {

            it('should return true with a correct SecondsPath value from the input', async function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.SecondsPath,
                    "$.seconds",
                    "Next");

                let result = await state.solve({
                    "seconds": 0
                }, null);

                assert(result === true);
            });

            it('should throw exception if SecondsPath value does not exist in the input', function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.SecondsPath,
                    "$.seconds",
                    "Next");

                assert.rejects(state.solve({
                    "minutes": 0
                }, null));
            });

            it('should throw exception if SecondsPath value is not a number', function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.SecondsPath,
                    "$.seconds",
                    "Next");

                assert.rejects(state.solve({
                    "seconds": "1"
                }, null));
            });
        });

        describe('units === WaitStateUnitType.Timestamp', function () {

            it('should return true with a correct seconds value', async function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.Timestamp,
                    new Date().getTime().toString(),
                    "Next");

                let result = await state.solve(null, null);

                assert(result === true);
            });

            it('should throw exception if timestamp value is null', function () {
                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.Timestamp,
                    null,
                    "Next");

                assert.rejects(state.solve(null, null));
            });

            it('should throw exception if timestamp value is not a string', function () {
                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.Timestamp,
                    1,
                    "Next");

                assert.rejects(state.solve(null, null));
            });
        });

        describe('units === WaitStateUnitType.TimestampPath', function () {

            it('should return true with a correct TimestampPath value from the input', async function () {

                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.TimestampPath,
                    "$.timestamp",
                    "Next");

                let input = {
                    timestamp: new Date().getTime().toString()
                };

                let result = await state.solve(input, null);

                assert(result === true);
            });

            it('should throw exception if TimestampPath value does not exist in the input', function () {
                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.TimestampPath,
                    "$.timestamp",
                    "Next");

                assert.rejects(state.solve({ }, null));
            });

            it('should throw exception if TimestampPath value is not a string', function () {
                let state = new WaitState("Test",
                    null,
                    WaitStateUnitType.TimestampPath,
                    "$.timestamp",
                    "Next");

                assert.rejects(state.solve({ timestamp: 0 }, null));
            });
        });
    });
});