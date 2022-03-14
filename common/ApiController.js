export class ApiController {
    /**
     * @param request
     * @param response
     * @param next
     */
    constructor(request, response, next) {
        /**
         * @protected
         */
        this._request = request || {};
        this._response = response;
        this._next = next;
        this._query = Object.assign(request.query || {}, request.body || {});
        /**
         * @protected
         */
        this._repository = request.repository;
    }

    /**
     * @param value
     * @returns {boolean}
     * @protected
     */
    _parse_numeric_value_to_boolean(value) {
        if (!isNaN(value)) {
            return !!(+value);
        }

        return !!value;
    }
}
