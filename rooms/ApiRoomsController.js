import { CONSTANTS } from '../common/config/CONSTANTS.js';
import { ApiController } from '../common/ApiController.js';
import { ApiError } from '../common/ApiError.js';

export class ApiRoomsController extends ApiController {
    /**
     * @returns {Promise<{code: string}>}
     */
    async create() {
        this._validate_create_parameters();
        const code = this._generate_room_code();

        const data = {
            name: this._query.name,
            code,
            date: this._query.date,
            user_id: this._request.user_id
        };

        await this._repository.rooms.create(data);
        return { code };
    }

    /**
     * @private
     */
    _validate_create_parameters() {
        const { name, date } = this._query;

        if (!name) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'name' });
        }

        if (name.length > CONSTANTS.RESTRICTIONS.MAX_ROOM_NAME_LENGTH) {
            throw new ApiError(
                ApiError.ERRORS.FIELD_MAX_LENGTH,
                {
                    FIELD: 'name', LENGTH: CONSTANTS.RESTRICTIONS.MAX_ROOM_NAME_LENGTH
                });
        }

        if (!date) {
            throw new ApiError(ApiError.ERRORS.FIELD_IS_REQUIRED, { FIELD: 'date' });
        }

        // TODO: Validate date
    }

    /**
     * @returns {string}
     * @private
     */
    _generate_room_code() {
        return Math.random()
            .toString(36)
            .replace(/[^a-z1-9]+/g, '')
            .substr(0, 4)
            .toUpperCase();
    }
}
