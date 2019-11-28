const {
    TaskStateType
} = require('./state_types');
const State = require('./state');

module.exports = class TaskState extends State {

    /**
     * Constructs a TaskState object.
     *
     * @param name string
     * @param comment string
     * @param resource string
     * @param next string
     */
    constructor(name, comment = null, resource, next = null) {
        super(TaskStateType, name, comment);

        this.resource = resource;
        this.next = next;
        this.is_end = (next === null);
    }

    async solve(input, context) {

        if (this.resource !== null) {
            // if (typeof this.resource === 'string') {
            //
            // } else if (typeof this.resource === 'function') {
            //
            // }
            return await this.resource(input);
        } else {
            throw "Invalid resource";
        }
    }

    /*
    "TaskState": {
      "Comment": "Task State example",
      "Type": "Task",
      "Resource": "arn:aws:states:us-east-1:123456789012:task:HelloWorld",
      "Next": "NextState",
      "TimeoutSeconds": 300,
      "HeartbeatSeconds": 60
    }
     */
    serialize() {
        return {
            Type: this.type,
            Comment: this.comment,
            Resource: this.resource,
            Next: this.next
        }
    }
};