import jwt from 'jsonwebtoken';

import { config } from './config/config.js';
import { ApiError } from './ApiError.js';

export class ApiMiddleware {
    constructor(request, response, next) {
        this._request = request;
        this._response = response;
        this._next = next;
    }

    /**
     * @param request
     * @param response
     * @param next
     * @returns {Promise<*>}
     */
    static async authorize_user(request, response, next) {
        const token = request.query.token;

        if (!token) {
            next(new ApiError(ApiError.ERRORS.MISSING_TOKEN));
        }

        try {
            const verified = jwt.verify(token, config.auth.token_secret);
            const { user_id } = verified;

            request.user_id = user_id;

            return next();
        } catch (err) {
            next(new ApiError(ApiError.ERRORS.INVALID_TOKEN));
        }
    }
}
