import format from 'string-template';

/**
 * Error data object
 * @typedef {Object} ErrorData
 * @property {number} status - HTTP status of error
 * @property {string} [code] - Error code
 * @property {string} [message] - Message to show for user
 */
const ERRORS = {
    FIELD_IS_REQUIRED: {
        status: 400,
        message: '{FIELD} field is required'
    },
    USERNAME_ALREADY_TAKEN: {
        status: 400,
        message: 'Username {USERNAME} is already taken'
    },
    FIELD_MIN_LENGTH: {
        status: 400,
        message: '{FIELD} must be at least {LENGTH} chars'
    },
    FIELD_MAX_LENGTH: {
        status: 400,
        message: '{FIELD} must not be more than {LENGTH} chars in length'
    },
    PASSWORD_MISMATCH: {
        status: 400,
        message: 'Passwords mismatch'
    },
    INVALID_CREDENTIALS: {
        status: 400,
        message: 'Invalid username or password'
    },
    MISSING_TOKEN: {
        status: 401,
        message: 'Missing token query parameter'
    },
    INVALID_TOKEN: {
        status: 401,
        message: 'Invalid token'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized for this action'
    },
};

export class ApiError extends Error {
    static get ERRORS() {
        return ERRORS;
    }

    static process_error_with_data(error, error_data) {
        if (error_data) {
            Object.keys(error).forEach(key => {
                if (typeof error[key] === 'string') {
                    error[key] = format(error[key], error_data);
                }
            });
        }

        return error;
    }

    constructor(error, error_data) {
        super(error.message);
        this._error = Object.assign({}, error);
        this._error_data = error_data;
    }

    get code() {
        return this._error.code;
    }

    get status() {
        return this._error.status;
    }

    to_json() {
        this.constructor.process_error_with_data(this._error, this._error_data);

        return this._error;
    }
}
