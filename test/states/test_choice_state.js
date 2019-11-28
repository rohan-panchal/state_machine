const assert = require('assert');
const {
    ChoiceState,
    ChoiceRule,
    ChoiceRuleOperation,
    ChoiceRuleAndOperator,
    ChoiceRuleOrOperator,
    ChoiceRuleNotOperator,
    ChoiceRuleStringEqualsOperator,
    ChoiceRuleStringLessThanOperator,
    ChoiceRuleStringGreaterThanOperator,
    ChoiceRuleStringLessThanEqualsOperator,
    ChoiceRuleStringGreaterThanEqualsOperator,
    ChoiceRuleNumericEqualsOperator,
    ChoiceRuleNumericLessThanOperator,
    ChoiceRuleNumericGreaterThanOperator,
    ChoiceRuleNumericLessThanEqualsOperator,
    ChoiceRuleNumericGreaterThanEqualsOperator,
    ChoiceRuleBooleanEqualsOperator,
    ChoiceRuleTimestampEqualsOperator,
    ChoiceRuleTimestampLessThanOperator,
    ChoiceRuleTimestampGreaterThanOperator,
    ChoiceRuleTimestampLessThanEqualsOperator,
    ChoiceRuleTimestampGreaterThanEqualsOperator
} = require('../../src/states/choice_state');

describe('ChoiceRuleOperation', async function () {

    describe('ChoiceRuleOperation.constructor', async function () {

        it('should set arguments correctly upon construction', async function () {

            let state = new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 20);

            assert(state.variable === "$.value");
            assert(state.operator === ChoiceRuleNumericEqualsOperator);
            assert(state.operand === 20);
        });
    });

    describe('ChoiceRuleOperation.solve', async function () {

        describe('operator is ChoiceRuleStringEqualsOperator', async function () {

            it('should return true when operand and value are equal', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "A"
                });

                assert(result);
            });

            it('should return false when operand and value are unequal', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "B"
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleStringLessThanOperator', async function () {

            it('should return true when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringLessThanOperator,
                    "B");

                let result = await state.solve({
                    value: "A"
                });

                assert(result);
            });

            it('should return false when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringLessThanOperator,
                    "A");

                let result = await state.solve({
                    value: "B"
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleStringGreaterThanOperator', async function () {

            it('should return true when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringGreaterThanOperator,
                    "A");

                let result = await state.solve({
                    value: "B"
                });

                assert(result);
            });

            it('should return false when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringGreaterThanOperator,
                    "B");

                let result = await state.solve({
                    value: "A"
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleStringLessThanEqualsOperator', async function () {

            it('should return true when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringLessThanEqualsOperator,
                    "B");

                let result = await state.solve({
                    value: "A"
                });

                assert(result);
            });

            it('should return true when value is equal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringLessThanEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "A"
                });

                assert(result);
            });

            it('should return false when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringLessThanEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "B"
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleStringGreaterThanEqualsOperator', async function () {

            it('should return true when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringGreaterThanEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "B"
                });

                assert(result);
            });

            it('should return true when value is equal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringGreaterThanEqualsOperator,
                    "A");

                let result = await state.solve({
                    value: "A"
                });

                assert(result);
            });

            it('should return false when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleStringGreaterThanEqualsOperator,
                    "B");

                let result = await state.solve({
                    value: "A"
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleNumericEqualsOperator', async function () {

            it('should return true when value is equal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 0
                });

                assert(result);
            });

            it('should return false when value is unequal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 1
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleNumericLessThanOperator', async function () {

            it('should return true when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericLessThanOperator,
                    1);

                let result = await state.solve({
                    value: 0
                });

                assert(result);
            });

            it('should return false when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericLessThanOperator,
                    0);

                let result = await state.solve({
                    value: 1
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleNumericGreaterThanEqualsOperator', async function () {

            it('should return true when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericGreaterThanEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 1
                });

                assert(result);
            });

            it('should return true when value is equal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericGreaterThanEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 0
                });

                assert(result);
            });

            it('should return false when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericGreaterThanEqualsOperator,
                    1);

                let result = await state.solve({
                    value: 0
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleNumericLessThanEqualsOperator', async function () {

            it('should return true when value is less than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericLessThanEqualsOperator,
                    1);

                let result = await state.solve({
                    value: 0
                });

                assert(result);
            });

            it('should return true when value is equal to the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericLessThanEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 0
                });

                assert(result);
            });

            it('should return false when value is greater than the operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericLessThanEqualsOperator,
                    0);

                let result = await state.solve({
                    value: 1
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleBooleanEqualsOperator', async function () {

            it('should return true when value and operand are both true', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleBooleanEqualsOperator,
                    true);

                let result = await state.solve({
                    value: true
                });

                assert(result);
            });

            it('should return true when value and operand are both false', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleBooleanEqualsOperator,
                    false);

                let result = await state.solve({
                    value: false
                });

                assert(result);
            });
        });

        describe('operator is ChoiceRuleTimestampEqualsOperator', async function () {

            it('should return true when value is equal to operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(result);
            });

            it('should return true when value is unequal to operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 01:00:00'
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleTimestampLessThanOperator', async function () {

            it('should return true when value is less than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampLessThanOperator,
                    '01 Jan 1970 01:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(result);
            });

            it('should return false when value is greater than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampLessThanOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 01:00:00'
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleTimestampGreaterThanOperator', async function () {

            it('should return true when value is greater than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampGreaterThanOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 01:00:00'
                });

                assert(result);
            });

            it('should return false when value is less than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampGreaterThanOperator,
                    '01 Jan 1970 01:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleTimestampLessThanEqualsOperator', async function () {

            it('should return true when value is less than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampLessThanEqualsOperator,
                    '01 Jan 1970 01:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(result);
            });

            it('should return true when value is equal to operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampLessThanEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(result);
            });

            it('should return false when value is greater than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampLessThanEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 01:00:00'
                });

                assert(!result);
            });
        });

        describe('operator is ChoiceRuleTimestampGreaterThanEqualsOperator', async function () {

            it('should return true when value is greater than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampGreaterThanEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 01:00:00'
                });

                assert(result);
            });

            it('should return true when value is equal to operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampGreaterThanEqualsOperator,
                    '01 Jan 1970 00:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(result);
            });

            it('should return false when value is less than operand', async function () {

                let state = new ChoiceRuleOperation("$.value",
                    ChoiceRuleTimestampGreaterThanEqualsOperator,
                    '01 Jan 1970 01:00:00');

                let result = await state.solve({
                    value: '01 Jan 1970 00:00:00'
                });

                assert(!result);
            });
        });
    });
});

describe('ChoiceRule', async function () {
    
    describe('ChoiceRule.constructor', async function () {

        it('should set arguments correctly upon construction', async function () {

            let rule = new ChoiceRule(ChoiceRuleAndOperator, [], "Test");

            assert(rule.operator === ChoiceRuleAndOperator);
            assert(Array.isArray(rule.operands));
            assert(rule.next === "Test");
        });
    });

    describe('ChoiceRule.isValid', async function () {

        describe('operator == ChoiceRuleNotOperator', function () {

            it('should return true when rule succeeds', async function () {

                let operation = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericEqualsOperator,
                    0);

                let rule = new ChoiceRule(ChoiceRuleNotOperator, operation, null);

                // Should be false
                let result = await rule.solve({
                    value: 0
                });

                assert(result === false);
            });

            it('should return false when rule fails', async function () {

                let operation = new ChoiceRuleOperation("$.value",
                    ChoiceRuleNumericEqualsOperator,
                    0);

                let rule = new ChoiceRule(ChoiceRuleNotOperator, operation, null);

                let result = await rule.solve({
                    value: 0
                });

                assert(!result);
            });
        });

        describe('operator == ChoiceRuleOrOperator', function () {

            it('should return true when rules succeed', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        0),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        10),
                ];

                let rule = new ChoiceRule(ChoiceRuleOrOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(result);
            });

            it('should return false when all rules fail', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        10),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        0),
                ];

                let rule = new ChoiceRule(ChoiceRuleOrOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(!result);
            });

            it('should return true when single rule fail', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        0),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        0),
                ];

                let rule = new ChoiceRule(ChoiceRuleOrOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(result);
            });
        });

        describe('operator == ChoiceRuleAndOperator', function () {

            it('should return true when rules succeed', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        0),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        10),
                ];

                let rule = new ChoiceRule(ChoiceRuleAndOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(result);
            });

            it('should return false when all rules fail', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        10),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        0),
                ];

                let rule = new ChoiceRule(ChoiceRuleAndOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(!result);
            });

            it('should return false when single rule fail', async function () {

                let operations = [
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericGreaterThanOperator,
                        0),
                    new ChoiceRuleOperation("$.value",
                        ChoiceRuleNumericLessThanOperator,
                        0),
                ];

                let rule = new ChoiceRule(ChoiceRuleAndOperator, operations, null);

                // Should be true
                let result = await rule.solve({
                    value: 1
                });

                assert(!result);
            });
        });
    });
});

describe('ChoiceState', function () {
    
    describe('ChoiceState.constructor', function () {

        it('should set arguments correctly upon construction', function () {

            let choices = [
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 0),
                    null),
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 10),
                    null),
            ];

            let state = new ChoiceState("Test", null, choices, "Default");

            assert(state.name === "Test");
            assert(state.comment === null);
            assert(Array.isArray(state.choices));
            assert(state.default_state === "Default");
        });
    });
    
    describe('ChoiceState.solve', async function () {

        it('should return first rule that passes', async function () {

            let choices = [
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 0),
                    "1"),
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 10),
                    "2"),
            ];

            let state = new ChoiceState("Test", null, choices, "Default");

            let result = await state.solve({
                value: 5
            });

            assert(result === "1");
        });

        it('should return second rule if first rule fails', async function () {

            let choices = [
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 5),
                    "1"),
                new ChoiceRule(
                    ChoiceRuleNotOperator,
                    new ChoiceRuleOperation("$.value", ChoiceRuleNumericEqualsOperator, 10),
                    "2"),
            ];

            let state = new ChoiceState("Test", null, choices, "Default");

            let result = await state.solve({
                value: 5
            });

            assert(result === "2");
        });
    });
});