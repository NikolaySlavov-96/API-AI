import { NextFunction, Request, Response, } from '../types';

const _isAuthenticated = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.authenticated) {
            res.status(400).json({ message: 'Can you log In' });
            return;
        }
        next();
    };
};

export default _isAuthenticated;