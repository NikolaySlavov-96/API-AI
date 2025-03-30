import { Request } from 'express';

import db from '../models';

import { createToken } from '../utils';

export const verifyEmail = async (email: string) => {
    const isExistEmail = await db.User.findOne({ where: { email, } })
    if (isExistEmail) {
        return true;
    }

    return false;
};

export const createUser = async (body: Request['body']) => {
    const { email, password } = body;

    const result = await db.User.create({ email, password });

    const userId = result?.dataValues?.id;
    const token = createToken(userId);

    return { status: 200, message: { userId, accessToken: token, } }
};


export const loginUser = async (body: Request['body']) => {
    const { email, password } = body;

    const userData = await db.User.findOne({
        where: { email, },
        raw: true,
        nest: true,
    })

    if (userData.password !== password) {
        return { status: 400, message: 'User name or password is incorrect' };
    }

    const userId = userData.id;
    const token = createToken(userId);

    return {
        status: 200,
        userData: {
            userId: userId,
            email: userData.email,
            accessToken: token,
        }
    };
};