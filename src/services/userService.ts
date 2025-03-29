import { Request } from 'express';

import db from '../models';

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
    return { status: 200, message: { userId: result?.dataValues?.id } }
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

    return {
        status: 200,
        userData: {
            userId: userData.id,
            email: userData.email
        }
    };
};