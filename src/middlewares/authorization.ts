import { NextFunction, Request, Response, } from '../types';

import { verifyToken, } from '../utils';

const { HEADER_AUTHORIZATION_NAME, } = process.env;

const _authorization = () => async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers[HEADER_AUTHORIZATION_NAME ?? ''];
    const isPrivate = req.headers['private'];
    const token = Array.isArray(header) ? header[0] : header;

    if (!!token) {
        try {
            const payload = await verifyToken(token, !!isPrivate);

            req.user = payload;
            req.authenticated = true;
        } catch (err) {
            const parseError = err as Error;
            if (parseError?.message?.includes('Invalid')) {
                res.status(401).json({ message: 'Unauthorize' })
                return;
            }

            res.status(500).json({ message: 'Something went wrong' });
            return;
        }
    }

    next();
};

export default _authorization;