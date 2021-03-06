import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import { config } from '../common/config/config.js';
import { CONSTANTS } from '../common/config/CONSTANTS.js';
import { ApiController } from '../common/ApiController.js';
import { ApiError } from '../common/ApiError.js';

export class ApiUsersController extends ApiController {
    /**
     * @returns {Promise<{success: boolean}>}
     */
    async register() {
        await this._validate_register_params();

        const salt = await bcrypt.genSalt(config.auth.salt_difficulty);
        const hash = await bcrypt.hash(this._query.password, salt);

        await this._repository.users.add(this._query.username, hash);

        return {
            success: true
        };
    }

    /**
     * @returns {Promise<{token: (*)}>}
     */
    async login() {
        const { username, password } = this._query;
        await this._validate_login_params();

        const user = await this._repository.users.get_user_by_username(username);

        const isPasswordValid = await bcrypt.compare(password, user ? user.password : '');
        if (user && isPasswordValid) {
            const payload = {
                user_id: user.id
            };

            const token = jwt.sign(payload, config.auth.token_secret);
            return { token };
        }

        throw new ApiError(ApiError.ERRORS.INVALID_CREDENTIALS);
    }

    /**
     * @returns {Promise<void>}
     * @private
     */
    async _validate_register_params() {
        const { username, password, confirmPassword } = this._query;

        if (!username) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'username' });
        }

        if (!password) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'password' });
        }

        if (!confirmPassword) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'confirmPassword' });
        }

        const user = await this._repository.users.get_user_by_username(username);
        if (user) {
            throw new ApiError(ApiError.ERRORS.USERNAME_ALREADY_TAKEN, { USERNAME: username });
        }

        if (username.length < CONSTANTS.RESTRICTIONS.MIN_USERNAME_LENGTH) {
            throw new ApiError(ApiError.ERRORS.FIELD_MIN_LENGTH, {
                FIELD: 'username',
                LENGTH: CONSTANTS.RESTRICTIONS.MIN_USERNAME_LENGTH
            });
        }

        if (password.length < CONSTANTS.RESTRICTIONS.MIN_PASSWORD_LENGTH) {
            throw new ApiError(ApiError.ERRORS.FIELD_MIN_LENGTH, {
                FIELD: 'password',
                LENGTH: CONSTANTS.RESTRICTIONS.MIN_PASSWORD_LENGTH
            });
        }

        if (password != confirmPassword) {
            throw new ApiError(ApiError.ERRORS.PASSWORD_MISMATCH);
        }
    }

    /**
     * @returns {Promise<void>}
     * @private
     */
    async _validate_login_params() {
        const { username, password } = this._query;

        if (!username) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'username' });
        }

        if (!password) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'password' });
        }
    }
}
