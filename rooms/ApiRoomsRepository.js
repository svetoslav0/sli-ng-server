import { ApiRepository } from '../common/ApiRepository.js';

class ApiRoomsRepository extends ApiRepository {
    /**
     * @param data
     * @returns {Promise<void>}
     */
    async create(data) {
        const query = `
            INSERT INTO rooms (name,
                               code,
                               date,
                               user_id)
            VALUES (?, ?, ?, ?);
        `;

        const params = [
            data.name,
            data.code,
            data.date,
            data.user_id
        ];

        await this._query(query, params);
    }
}

export default ApiRoomsRepository;
