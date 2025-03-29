import { Router, } from 'express';

import { login, register } from '../controllers/userController';

const user = Router();

user.post('/login',
    login,
);

user.post('/create',
    register,
);

export default user;