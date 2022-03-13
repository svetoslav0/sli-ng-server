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
    static async is_user_client(request, response, next) {
        try {
            await ApiMiddleware._authorize_user(request);
        } catch (err) {
            return next(err);
        }


        // if (request.role_id >= CONSTANTS.USER_ROLES.USER_ROLE_ID) {
        //     return next();
        // }

        // next(new ApiError(ApiError.ERRORS.UNAUTHORIZED));
    }

    /**
     * @param request
     * @returns {Promise<*>}
     * @private
     */
    static async _authorize_user(request) {
        const token = request.query.token;

        if (!token) {
            // throw new ApiError(ApiError.ERRORS.MISSING_TOKEN);
        }

        try {
            // const verified = jwt.verify(token, config.auth.token_secret);
            // const { user_id, role_id } = verified;
            //
            // request.user_id = user_id;
            // request.role_id = role_id;

            return true;
        } catch (err) {
            // throw new ApiError(ApiError.ERRORS.INVALID_TOKEN);
        }
    }
}
