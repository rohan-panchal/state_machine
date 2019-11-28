const {
    ChoiceStateType
} = require('./state_types');
const State = require('./state');
const assert = require('assert');

const ChoiceRuleAndOperator = "And";
const ChoiceRuleOrOperator = "Or";
const ChoiceRuleNotOperator = "Not";
const ChoiceRuleStringEqualsOperator = "StringEquals";
const ChoiceRuleStringLessThanOperator = "StringLessThan";
const ChoiceRuleStringGreaterThanOperator = "StringGreaterThan";
const ChoiceRuleStringLessThanEqualsOperator = "StringLessThanEquals";
const ChoiceRuleStringGreaterThanEqualsOperator = "StringGreaterThanEquals";
const ChoiceRuleNumericEqualsOperator = "NumericEquals";
const ChoiceRuleNumericLessThanOperator = "NumericLessThan";
const ChoiceRuleNumericGreaterThanOperator = "NumericGreaterThan";
const ChoiceRuleNumericLessThanEqualsOperator = "NumericLessThanEquals";
const ChoiceRuleNumericGreaterThanEqualsOperator = "NumericGreaterThanEquals";
const ChoiceRuleBooleanEqualsOperator = "BooleanEquals";
const ChoiceRuleTimestampEqualsOperator = "TimestampEquals";
const ChoiceRuleTimestampLessThanOperator = "TimestampLessThan";
const ChoiceRuleTimestampGreaterThanOperator = "TimestampGreaterThan";
const ChoiceRuleTimestampLessThanEqualsOperator = "TimestampLessThanEquals";
const ChoiceRuleTimestampGreaterThanEqualsOperator = "TimestampGreaterThanEquals";

const get = require('../util/get');

/**
 * https://states-language.net/spec.html
 */

class ChoiceRuleOperation {

    /**
     *
     * @param variable
     * @param operator
     * @param operand
     */
    constructor(variable, operator, operand) {
        this.variable = variable;
        this.operator = operator;
        this.operand = operand;
    }

    solve(input) {
        let value = get(input, this.variable);

        switch (this.operator) {
            case ChoiceRuleStringEqualsOperator:
            case ChoiceRuleStringLessThanOperator:
            case ChoiceRuleStringGreaterThanOperator:
            case ChoiceRuleStringLessThanEqualsOperator:
            case ChoiceRuleStringGreaterThanEqualsOperator:
                return this.solveStringOperation(value);

            case ChoiceRuleNumericEqualsOperator:
            case ChoiceRuleNumericLessThanOperator:
            case ChoiceRuleNumericGreaterThanOperator:
            case ChoiceRuleNumericLessThanEqualsOperator:
            case ChoiceRuleNumericGreaterThanEqualsOperator:
                return this.solveNumericOperation(value);

            case ChoiceRuleBooleanEqualsOperator:
                return value === this.operand;

            case ChoiceRuleTimestampEqualsOperator:
            case ChoiceRuleTimestampLessThanOperator:
            case ChoiceRuleTimestampGreaterThanOperator:
            case ChoiceRuleTimestampLessThanEqualsOperator:
            case ChoiceRuleTimestampGreaterThanEqualsOperator:
                return this.solveTimestampOperation(value);
        }
    }

    solveStringOperation(value) {
        switch (this.operator) {
            case ChoiceRuleStringEqualsOperator:
                return value === this.operand;
            case ChoiceRuleStringLessThanOperator:
                return value < this.operand;
            case ChoiceRuleStringGreaterThanOperator:
                return value > this.operand;
            case ChoiceRuleStringLessThanEqualsOperator:
                return value <= this.operand;
            case ChoiceRuleStringGreaterThanEqualsOperator:
                return value >= this.operand;
        }
    }

    solveNumericOperation(value) {
        switch (this.operator) {
            case ChoiceRuleNumericEqualsOperator:
                return value === this.operand;
            case ChoiceRuleNumericLessThanOperator:
                return value < this.operand;
            case ChoiceRuleNumericGreaterThanOperator:
                return value > this.operand;
            case ChoiceRuleNumericLessThanEqualsOperator:
                return value <= this.operand;
            case ChoiceRuleNumericGreaterThanEqualsOperator:
                return value >= this.operand;
        }
    }

    solveTimestampOperation(value) {
        let value_timestamp = Date.parse(value);
        let operand_timestamp = Date.parse(this.operand);

        switch (this.operator) {
            case ChoiceRuleTimestampEqualsOperator:
                return value_timestamp === operand_timestamp;
            case ChoiceRuleTimestampLessThanOperator:
                return value_timestamp < operand_timestamp;
            case ChoiceRuleTimestampGreaterThanOperator:
                return value_timestamp > operand_timestamp;
            case ChoiceRuleTimestampLessThanEqualsOperator:
                return value_timestamp <= operand_timestamp;
            case ChoiceRuleTimestampGreaterThanEqualsOperator:
                return value_timestamp >= operand_timestamp;
        }
    }

    serialize() {
        let object = {
            Variable: ""
        };

        object[this.operator] = this.operand;

        return object;
    }
}

class ChoiceRule {

    /**
     *
     * @param operator And|Or|Not
     * @param operands object
     * @param next
     */
    constructor(operator, operands, next = null) {
        this.operator = operator;
        this.operands = operands;
        this.next = next;
    }

    isValid(input) {

        switch (this.operator) {
            case ChoiceRuleAndOperator:
                assert(Array.isArray(this.operands), "operands when using 'And' operator must be Array type.");
                break;
            case ChoiceRuleOrOperator:
                assert(Array.isArray(this.operands), "operands when using 'Or' operator must be Array type.");
                break;
            case ChoiceRuleNotOperator:
                break;
        }
    }

    async solve(input) {
        switch (this.operator) {
            case ChoiceRuleAndOperator:

                assert(Array.isArray(this.operands), "this.operands when using 'And' operator must be Array type.");

                return this.operands.map((operand) => {
                    return operand.solve(input)
                }).every((result) => result);

            case ChoiceRuleOrOperator:

                assert(Array.isArray(this.operands), "this.operands when using 'Or' operator must be Array type.");

                let operands = this.operands.map((operand) => {
                    return operand.solve(input)
                });

                return operands.includes(true);

            case ChoiceRuleNotOperator:
                assert(typeof this.operands === 'object', "this.operands when using'Not' operator must be an Object type.");

                return !(await this.operands.solve(input));
        }
    }

    serialize() {
        switch (this.operator) {
            case ChoiceRuleAndOperator:
                return {
                    And: this.operands.map((operand) => operand.serialize()),
                    Next: this.next
                };
            case ChoiceRuleOrOperator:
                return {
                    Or: this.operands.map((operand) => operand.serialize()),
                    Next: this.next
                };
            case ChoiceRuleNotOperator:
                return {
                    Not: this.operands.serialize(),
                    Next: this.next
                };
        }
    }
}

class ChoiceState extends State {

    /**
     * Constructs a ChoiceState object.
     *
     * @param name string
     * @param comment string
     * @param choices array
     * @param default_state string
     */
    constructor(name, comment = null, choices, default_state) {
        super(ChoiceStateType, name, comment);

        this.choices = choices;
        this.default_state = default_state;
    }

    async solve(input, context) {

        for (let choice_index in this.choices) {
            let choice = this.choices[choice_index];

            if (await choice.solve(input)) {
                return choice.next;
            }
        }

        return this.default_state;
    }

    serialize() {
        return {
            Type: this.type,
            Choices: this.choices.map((choice_state) => choice_state.serialize()),
            Default: this.default_state
        };
    }
}

module.exports = {
    ChoiceRule: ChoiceRule,
    ChoiceRuleOperation: ChoiceRuleOperation,
    ChoiceState: ChoiceState,

    ChoiceRuleAndOperator: ChoiceRuleAndOperator,
    ChoiceRuleOrOperator: ChoiceRuleOrOperator,
    ChoiceRuleNotOperator: ChoiceRuleNotOperator,
    ChoiceRuleStringEqualsOperator: ChoiceRuleStringEqualsOperator,
    ChoiceRuleStringLessThanOperator: ChoiceRuleStringLessThanOperator,
    ChoiceRuleStringGreaterThanOperator: ChoiceRuleStringGreaterThanOperator,
    ChoiceRuleStringLessThanEqualsOperator: ChoiceRuleStringLessThanEqualsOperator,
    ChoiceRuleStringGreaterThanEqualsOperator: ChoiceRuleStringGreaterThanEqualsOperator,
    ChoiceRuleNumericEqualsOperator: ChoiceRuleNumericEqualsOperator,
    ChoiceRuleNumericLessThanOperator: ChoiceRuleNumericLessThanOperator,
    ChoiceRuleNumericGreaterThanOperator: ChoiceRuleNumericGreaterThanOperator,
    ChoiceRuleNumericLessThanEqualsOperator: ChoiceRuleNumericLessThanEqualsOperator,
    ChoiceRuleNumericGreaterThanEqualsOperator: ChoiceRuleNumericGreaterThanEqualsOperator,
    ChoiceRuleBooleanEqualsOperator: ChoiceRuleBooleanEqualsOperator,
    ChoiceRuleTimestampEqualsOperator: ChoiceRuleTimestampEqualsOperator,
    ChoiceRuleTimestampLessThanOperator: ChoiceRuleTimestampLessThanOperator,
    ChoiceRuleTimestampGreaterThanOperator: ChoiceRuleTimestampGreaterThanOperator,
    ChoiceRuleTimestampLessThanEqualsOperator: ChoiceRuleTimestampLessThanEqualsOperator,
    ChoiceRuleTimestampGreaterThanEqualsOperator: ChoiceRuleTimestampGreaterThanEqualsOperator
};