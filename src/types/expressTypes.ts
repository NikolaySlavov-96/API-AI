import { NextFunction, Request as EXReq, Response, } from 'express';

interface IUser {
    userId: string;
}

interface Request extends EXReq {
    user?: IUser;
    authenticated?: boolean;
}

export {
    NextFunction,
    Response,
    Request,
};