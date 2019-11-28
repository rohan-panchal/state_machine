const assert = require('assert');
const TaskState = require('../../src/states/task_state.js');

describe('TaskState', function () {

    describe('TaskState.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let state = new TaskState("Test",
                null,
                function() { },
                "End");

            assert(state.name === "Test");
            assert(state.comment === null);
            assert(state.resource !== null);
            assert(state.next === "End");
        });
    });

    describe('TaskState.solve', function () {

        it('should call resource if resource is not null', function (done) {

            let state = new TaskState("Test",
                null,
                async function () {
                    done();
                },
                "End");

            state.solve("test");
        });

        it('should throw if resource is null', function () {

            let state = new TaskState("Test",
                null,
                null,
                "End");

            assert.rejects(state.solve(null));
        });
    });
});
