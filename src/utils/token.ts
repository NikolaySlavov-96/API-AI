import base64url from 'base64url';
import crypto from 'crypto';
import { JwtPayload, sign, SignOptions, VerifyOptions, verify, } from 'jsonwebtoken';

const { tokenSigningKey, tokenIssuer, tokenAudience } = process.env;

// const verifyOption: VerifyOptions = {
//     algorithms: ['HS512'],
//     issuer: tokenIssuer,
//     audience: tokenAudience,
// };

const jwtVerify = (token: string) => {
    if (!tokenSigningKey) {
        throw new Error('Invalid data!');
    }
    return verify(token, tokenSigningKey);
};

const signOption: SignOptions = {
    algorithm: 'HS512',
    issuer: tokenIssuer,
    audience: tokenAudience,
}

const jwtSign = (payload: string, expires?: string) => {
    if (!tokenSigningKey) {
        throw new Error('Invalid data!');
    }
    // expires && (option.expiresIn = expires);
    return sign(payload, tokenSigningKey);
};

// Custom verifyDotNetToken
const verifyCustomDotNetTokenHS512 = (token: string) => {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
    }

    const [encodedHeader, encodedPayload, signature] = tokenParts;
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    const signat = crypto.createHmac('sha512', tokenSigningKey ?? '').update(signingInput).digest();
    const expectedSignature = base64url.encode(signat);

    if (expectedSignature !== signature) {
        throw new Error('Invalid signature');
    }

    const payload = JSON.parse(base64url.decode(encodedPayload));

    const userId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return { userId };
};

// Exported
export const _verifyToken = (token: string, isPrivate: boolean): { userId: string } => {
    if (!isPrivate) {
        return verifyCustomDotNetTokenHS512(token);
    }
    const verifyToken = jwtVerify(token);
    return { userId: verifyToken.toString() }
};

export const _createToken = (data: string, expire?: string) => {
    const accessToken = jwtSign(data, expire);
    return accessToken;
};