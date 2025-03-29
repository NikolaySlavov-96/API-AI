import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

const _errorHandling = () => {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        // console.log("🚀 ~ _errorHandling ~ err:", err)
        // console.log("🚀 ~ const_errorHandling= ~ err.stack:", err.stack)
        res.status(500).json({ message: 'Miss' });
    }
};

export default _errorHandling;