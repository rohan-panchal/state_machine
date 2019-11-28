const assert = require('assert');
const {
    WaitStateType
} = require('./state_types');
const State = require('./state');
const get = require('../util/get');

const WaitStateUnitTypeSeconds = "Seconds";
const WaitStateUnitTypeSecondsPath = "SecondsPath";
const WaitStateUnitTypeTimestamp = "Timestamp";
const WaitStateUnitTypeTimestampPath = "TimestampPath";

const WaitStateUnitType = {
    Seconds: WaitStateUnitTypeSeconds,
    SecondsPath: WaitStateUnitTypeSecondsPath,
    Timestamp: WaitStateUnitTypeTimestamp,
    TimestampPath: WaitStateUnitTypeTimestampPath
};

class WaitState extends State {

    /**
     * Constructs a WaitState object.
     *
     * @param name string
     * @param comment string
     * @param units WaitStateUnitType
     * @param value string|int
     * @param next string
     */
    constructor(name, comment = null, units, value, next = null) {
        super(WaitStateType, name, comment);

        assert([WaitStateUnitTypeSeconds, WaitStateUnitTypeSecondsPath, WaitStateUnitTypeTimestamp, WaitStateUnitTypeTimestampPath].includes(units));

        this.units = units;
        this.value = value;
        this.next = next;
        this.is_end = (next === null);
    }

    async solve(input, context) {

        switch (this.units) {
            case WaitStateUnitTypeSeconds:

                if (!(typeof this.value === 'number')) {
                    throw "Invalid value type. Should be 'number'.";
                }
                this.sleep(this.value * 1000);

                return true;

            case WaitStateUnitTypeSecondsPath:

                const seconds = get(input, this.value);
                if (!(typeof seconds === 'number')) {
                    throw "Invalid value type. Should be 'number'.";
                }
                this.sleep(seconds * 1000);

                return true;

            case WaitStateUnitTypeTimestamp:

                if (!(typeof this.value === 'string')) {
                    throw "Invalid value type. Should be 'string'.";
                }
                let date = Date.parse(this.value);
                this.sleepUntil(date);

                return true;

            case WaitStateUnitTypeTimestampPath:

                const timestamp = get(input, this.value);

                if (!timestamp) {
                    throw `Invalid value at path[${this.value}] within input.`
                }
                if (!(typeof timestamp === 'string')) {
                    throw "Invalid value type. Should be 'string'.";
                }
                let timestampDate = Date.parse(timestamp);
                this.sleepUntil(timestampDate);

                return true;
        }

        return false;
    }

    sleep(milliseconds) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    sleepUntil(timestamp) {
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() < timestamp)) {
                break;
            }
        }
    }

    serialize() {
        let object = {
            Type: this.type,
            Next: this.next
        };

        object[this.units] = value;
        return object;
    }
}

module.exports = {
    WaitState: WaitState,
    WaitStateUnitType: WaitStateUnitType
};