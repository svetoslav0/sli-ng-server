import { config } from './common/config/config.js';

const API_VERSION = '1.0.0';
const DEV_CONTACT_EMAIL = 'svet.nedelchev@gmail.com';
const LOCAL_APP_HOST = `localhost:${config.server_port}`

export const ApiSpecification = () => {
    return {
        swagger: '2.0.0',
        info: {
            description: 'This API should serve for the needs of the SLI-NG project. Client source can be found here: https://github.com/svetoslav0/sli-ng-client',
            version: API_VERSION,
            title: 'SLI-NG',
            contact: {
                email: DEV_CONTACT_EMAIL
            }
        },
        host: LOCAL_APP_HOST,
        tags: [
            {
                name: 'Users',
                description: 'Paths that are related with different operations with Users'
            },
            {
                name: 'Rooms',
                description: 'Paths that are related with different operations with Rooms'
            }
        ],
        paths: {

        },
        definitions: {

        }
    };
};
