import mongoose from 'mongoose';
import User from './user';

import * as db from '../db/testDb';

const userData = {
    full_name: 'Test User',
    email: 'test@email.com',
    password: 'password',
    username: 'testuser',
    userType: 'user',
    bio: "Test User's bio",
};

beforeAll(async() => {
    await db.setupDb();
})

afterEach(async () => {
    await db.dropCollections();
})

afterAll( async () => {
    await db.dropDatabase();
})

describe('Test User Model', () => {
    it('should create and save a user', async () => {
        const user = new User(userData);

        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(user.username).toBe(userData.username);
        expect(user.userType).toBe(userData.userType);
        expect(user.bio).toBe(userData.bio);
        expect(user.salt).toBeUndefined();
    });

    it('should not save without required fields', async () => {
        const user = new User({
            bio: "Test User's bio",
        });
        let err: any;

        try {
            await user.save();
        } catch (error: any) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.full_name).toBeDefined();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.username).toBeDefined();
    });

    it("should not save with and invalid email address", async () => {
        const user = new User({
            ...userData,
            email: 'invalid',
        });

        let err: any;

        try {
            await user.save();
        } catch (error: any) {
            err = error;
        }

        expect(user.validate()).rejects.toThrow()

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    })
});
