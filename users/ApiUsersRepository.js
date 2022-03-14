import { ApiRepository } from '../common/ApiRepository.js';

class ApiUsersRepository extends ApiRepository {
    /**
     * @param {string} username
     * @param {string} hash
     * @returns {Promise<void>}
     */
    async add(username, hash) {
        const query = `
            INSERT INTO
                users (
                    username,
                    password
                )
            VALUES (?, ?)
        `;

        await this._query(query, [username, hash]);
    }

    /**
     * @param {string} username
     * @returns {Promise<null|*>}
     */
    async get_user_by_username(username) {
        const query = `
            SELECT
                id,
                username,
                password
            FROM
                users
            WHERE
                username = ?
        `;

        const result = await this._query(query, [username]);

        if (result.length == 1) {
            return result[0];
        }

        return null;
    }
}

export default ApiUsersRepository;
