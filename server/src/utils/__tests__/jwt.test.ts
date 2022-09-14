import { signJwtForUser, verifyJwtForUser } from '../jwt';
import { setupDb, dropCollections, dropDatabase } from '../../test/db/testDb';
import { createUser } from '../../services/user.service';
import { validUserData } from '../../test/fixtures';

beforeAll(async () => {
    await setupDb();
});

afterEach(async () => {
    await dropCollections();
});

afterAll(async () => {
    await dropDatabase();
});

describe('Testing JWT utility functions', () => {
    describe('Test signJwt function', () => {
        describe('given valid data', () => {
            it('should return a valid jwt token', async () => {
                const user = await createUser(validUserData);
                const token = signJwtForUser(user);
                expect(token).toEqual(expect.any(String));
            });
        });
    });

    describe('Test verifyJwt function', () => {
        describe('given valid data', () => {
            it('should return a valid jwt token', async () => {
                const user = await createUser(validUserData);
                const token = signJwtForUser(user);
                const { valid, expired, payload } = verifyJwtForUser(token);
                expect(valid).toBe(true);
                expect(expired).toBe(false);
                expect(payload).toBeTruthy();
            });
        });
        describe('given invalid data', () => {
            it('should detect if it is invalid', () => {
                const { valid, expired, payload } =
                    verifyJwtForUser('invalid token');

                expect(valid).toBe(false);
                expect(expired).toEqual(expect.any(Boolean));
                expect(payload).toBeNull();
            });
        });
    });
});
