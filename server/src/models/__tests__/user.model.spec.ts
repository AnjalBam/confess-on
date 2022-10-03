/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import User from '../user.model';

import * as db from '../../test/db/testDb';
import { validUserData } from '../../test/fixtures';

beforeAll(async () => {
    await db.setupDb();
});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Test User Model', () => {
    it('should create and save a user', async () => {
        const user = new User(validUserData);

        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(validUserData.email);
        expect(user.username).toBe(validUserData.username);
        expect(user.userType).toBe(validUserData.userType);
        expect(user.bio).toBe(validUserData.bio);
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
        expect(err.errors.fullName).toBeDefined();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.username).toBeDefined();
    });

    it('should not save with and invalid email address', async () => {
        const user = new User({
            ...validUserData,
            email: 'invalid',
        });

        let err: any;

        try {
            await user.save();
        } catch (error: any) {
            err = error;
        }

        expect(user.validate()).rejects.toThrow();

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
    });

    it('should save hashed password password with salt saved.', async () => {
        const user = new User(validUserData);

        await user.save();

        expect(user.salt).toBeDefined();
    });
});
