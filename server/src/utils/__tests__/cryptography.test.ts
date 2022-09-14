import { decryptData, encryptData } from '../cryptography';

describe('Test Encryption and Decryption functions', () => {
    describe('test encryptData', () => {
        it('should return encrypted string', () => {
            const dataToEncrypt = 'Test data to encrypt';
            const username = 'testUsername';

            const encryptedData = encryptData(dataToEncrypt, username);

            expect(encryptedData).toStrictEqual(expect.any(String));
        });
    });

    describe('test decryptData', () => {
        let data: string;
        let username: string;
        let dataToDecrypt: string;
        beforeEach(() => {
            data = 'test data';
            username = 'username';
            dataToDecrypt = encryptData(data, username);
        });

        it('should decrypt data if valid', () => {
            const decryptedData = decryptData(dataToDecrypt, username);

            expect(decryptedData).toStrictEqual(data);
        });

        it('should raise error if invalid', () => {
            try {
                decryptData(dataToDecrypt, 'invalidUsername')
            } catch (err: any) {
                expect(err).toBeDefined();
            }
        })
    });
});
