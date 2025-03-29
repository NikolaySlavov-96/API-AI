import { NextFunction, Request, Response } from 'express';

import { createUser, loginUser, verifyEmail } from '../services/userService'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const isEmailExist = await verifyEmail(body?.email);
        if (!isEmailExist) {
            res.status(400).json({ message: 'Email doesn\'t exist' });
            return;
        }

        const loginResult = await loginUser(body);
        if (loginResult.status !== 200) {
            res.status(loginResult.status).json({ message: loginResult.message });
            return;
        }

        res.status(loginResult.status).json(loginResult.userData);
    } catch (err) {
        next(err);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        if (!body?.email || !body?.password) {
            res.status(400).json({ message: 'Email and password is required' });
            return;
        }

        const isEmailExist = await verifyEmail(body.email);
        if (isEmailExist) {
            res.status(400).json({ message: 'Email exist' });
            return;
        }

        const result = await createUser(body);

        res.status(result.status).json(result.message);
    } catch (err) {
        next(err);
    }
};