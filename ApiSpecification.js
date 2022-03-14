import { config } from './common/config/config.js';

const API_VERSION = '1.0.0';
const DEV_CONTACT_EMAIL = 'svet.nedelchev@gmail.com';
const LOCAL_APP_HOST = `localhost:${config.server_port}`

export const ApiSpecification = () => {
    return {
        swagger: '2.0',
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
            '/users/register': {
                post: {
                    tags: [
                        'Users'
                    ],
                    summary: 'Register new users',
                    description: 'Register new users with provided username, password and confirmPassword',
                    operationId: 'postUsersRegister',
                    parameters: [
                        {
                            $ref: '#/parameters/registerUsername'
                        },
                        {
                            $ref: '#/parameters/registerPassword'
                        },
                        {
                            $ref: '#/parameters/registerConfirmPassword'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Registration was successful',
                            schema: {
                                $ref: '#/definitions/UserRegister'
                            }
                        },
                        400: {
                            description: 'Bad Request',
                            schema: {
                                $ref: '#/definitions/BadRequest'
                            }
                        }
                    }
                }
            },
            '/users/login': {
                post: {
                    tags: [
                        'Users'
                    ],
                    summary: 'Users login',
                    description: 'Login providing username and password',
                    operationId: 'postUsersLogin',
                    parameters: [
                        {
                            $ref: '#/parameters/loginUsername'
                        },
                        {
                            $ref: '#/parameters/loginPassword'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Login was successful',
                            schema: {
                                $ref: '#/definitions/UserLogin'
                            }
                        },
                        400: {
                            description: 'Bad Request',
                            schema: {
                                $ref: '#/definitions/BadRequest'
                            }
                        }
                    }
                }
            },
            '/rooms': {
                post:  {
                    tags: [
                        'Rooms'
                    ],
                    summary: 'Create new room',
                    description: 'Create new room with its name and date',
                    operationId: 'postRooms',
                    parameters: [
                        {
                            $ref: '#/parameters/token'
                        },
                        {
                            $ref: '#/parameters/roomName'
                        },
                        {
                            $ref: '#/parameters/roomDate'
                        }
                    ],
                    responses: {
                        201: {
                            description: 'Creating the room was successful',
                            schema: {
                                $ref: '#/definitions/CreatedRoom'
                            }
                        },
                        400: {
                            description: 'Bad Request',
                            schema: {
                                $ref: '#/definitions/BadRequest'
                            }
                        }
                    }
                }
            }
        },
        parameters: {
            token: {
                name: 'token',
                in: 'query',
                description: 'User token to auth the user',
                required: true,
                type: 'string'
            },
            registerUsername: {
                name: 'username',
                in: 'body',
                description: 'Username of the user. Will login with this username',
                required: true,
                schema: {
                    type: 'string'
                }
            },
            registerPassword: {
                name: 'password',
                in: 'body',
                description: 'Password of the user',
                required: true,
                schema: {
                    type: "string"
                }
            },
            registerConfirmPassword: {
                name: 'confirmPassword',
                in: 'body',
                description: 'Confirm Password of the user. Must be the same as the password param',
                required: true,
                schema: {
                    type: "string"
                }
            },
            loginUsername: {
                name: 'username',
                in: 'body',
                description: 'Username that was used during the registration',
                required: true,
                schema: {
                    type: 'string'
                }
            },
            loginPassword: {
                name: 'password',
                in: 'body',
                description: 'Password of that user',
                required: true,
                schema: {
                    type: 'string'
                }
            },
            roomName: {
                name: 'name',
                in: 'body',
                description: 'The name of the room',
                required: true,
                schema: {
                    type: 'string'
                }
            },
            roomDate: {
                name: 'date',
                in: 'body',
                description: 'The date of the event room',
                required: true,
                schema: {
                    type: 'string'
                }
            }
        },
        definitions: {
            UserRegister: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        description: 'Shows weather the registration was successful'
                    }
                }
            },
            UserLogin: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                        description: 'Generated token used to access restricted data and actions'
                    }
                }
            },
            CreatedRoom: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string',
                        description: 'Generated code of the room'
                    }
                }
            },
            BadRequest: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Message with description of the issue'
                    }
                }
            }
        }
    };
};
