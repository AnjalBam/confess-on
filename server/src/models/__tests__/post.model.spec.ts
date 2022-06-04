import {
    userData,
    validPostData,
    validUserData,
    validPostInput,
} from '../../test/fixtures';
import Post from '../post.model';
import mongoose from 'mongoose';

import * as db from '../../test/db/testDb';

beforeAll(async () => {
    await db.setupDb();
});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});

describe('Test Post Model', () => {
    it('should create and save a new post', async () => {
        const post = new Post(validPostInput);

        const savedPost = await post.save();

        expect(savedPost._id).toBeDefined();
        expect(savedPost.description).toBe(validPostInput.description);
        expect(savedPost.visibility).toBe(validPostInput.visibility);
        expect(savedPost.user).toBe(validPostInput.user);
    });

    it('should not save without description',async () => {
        const post = new Post({
            ...validPostInput,
            description: '',
        });

        let err: any;

        try {
            await post.save();
        }
        catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
    });

    it('should not save without user', async () => {
        const post = new Post({
            ...validPostInput,
            user: '',
        });

        let err: any;

        try {
            await post.save();
        }
        catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.user).toBeDefined();
    });
    it('should have public visibility by default', async () => {
        const post = new Post({
            ...validPostInput,
            visibility: undefined,
        });

        const savedPost = await post.save();

        expect(savedPost.visibility).toBe('public');
    });

    it('should save the provided visibility', async () => {
        const post = new Post({
            ...validPostInput,
            visibility: 'private',
        });

        const savedPost = await post.save();

        expect(savedPost.visibility).toBe('private');
    });
});
