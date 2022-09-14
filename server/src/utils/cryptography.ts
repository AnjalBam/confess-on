import * as crypto from 'node:crypto';

const secretKey = process.env.ENCRYPTION_SECRET || 'secret_key';
const secretIV = 'aelwfhlaef';
const encMethod = 'aes-256-cbc';

const key = crypto
    .createHash('sha512')
    .update(secretKey)
    .digest('hex')
    .substring(0, 32);

export function encryptData(
    data,
    username = secretIV,
    encryptionMethod = encMethod,
    secret = key
) {
    const encIv = crypto
        .createHash('sha512')
        .update(username)
        .digest('hex')
        .substring(0, 16);
    const cipher = crypto.createCipheriv(encryptionMethod, secret, encIv);
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return Buffer.from(encrypted).toString('base64');
}

export function decryptData(
    encryptedData,
    username = secretIV,
    encryptionMethod = encMethod,
    secret = key
) {
    const encIv = crypto
        .createHash('sha512')
        .update(username)
        .digest('hex')
        .substring(0, 16);
    const buff = Buffer.from(encryptedData, 'base64');
    encryptedData = buff.toString('utf-8');
    const decipher = crypto.createDecipheriv(encryptionMethod, secret, encIv);
    try {
        const data =
            decipher.update(encryptedData, 'hex', 'utf8') +
            decipher.final('utf8');
        return data;
    } catch (err: unknown) {
        throw err;
    }
}
