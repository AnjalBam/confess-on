/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';
import { dropCollections, dropDatabase } from '../../../test/db/testDb';
import { init } from '../../../test/utils/app';
import User from '../../../models/user.model';
import mongoose from 'mongoose';

import { signUpData } from '../../../test/fixtures/user.fixture';

let app: Express.Application;

beforeAll(async () => {
    app = await init();
});

afterEach(async () => {
    await dropCollections();
});

afterAll(async () => {
    await dropDatabase();
});

describe('Test SignUp controller', () => {
    describe('given valid data', () => {
        it('Should create a new user, set status 201, create a user to database', async () => {
            const { body, statusCode } = await request(app)
                .post('/api/v1/auth/signup')
                .send(signUpData);

            const user = await User.findOne({ email: signUpData.email });

            expect(statusCode).toBe(201);
            expect(body.message).toBe('SignUp Successful');
            expect(body.data).toStrictEqual({
                _id: expect.any(String),
                bio: signUpData.bio,
                email: signUpData.email,
                fullName: signUpData.fullName,
                userType: signUpData.userType,
                username: signUpData.username,
            });
            if (!user) return true;
            expect(user._id).toBeInstanceOf(mongoose.Types.ObjectId);
        });

        it('should set password using set method', async () => {
            await request(app).post('/api/v1/auth/signup').send(signUpData);

            const user = await User.findOne({ email: signUpData.email });
            if (user) {
                expect(user.salt).toBeDefined();
            }
        });
    });

    describe('given invalid data', () => {
        it('should match both the passwords', async () => {
            const { statusCode, body } = await request(app)
                .post('api/v1/auth/signup')
                .send({
                    ...signUpData,
                    confirmPassword: 'IDontMatch',
                });

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Passwords do not match');
        });

        it('should return 400 if email is missing', async () => {
            const {email, ...rest} = signUpData
            const { statusCode, body } = await request(app)
                .post('api/v1/auth/signup')
                .send({
                    ...rest,
                });

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Make sure all fields are correctly sent')
        })
        it('should return 400 if username is missing', async () => {
            const {username, ...rest} = signUpData
            const { statusCode, body } = await request(app)
                .post('api/v1/auth/signup')
                .send({
                    ...rest,
                });

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Make sure all fields are correctly sent')
        })
        it('should return 400 if  fullName is missing', async () => {
            const {fullName, ...rest} = signUpData
            const { statusCode, body } = await request(app)
                .post('api/v1/auth/signup')
                .send({
                    ...rest,
                });

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Make sure all fields are correctly sent')
        })


        it('should return 400 if userType is missing', async () => {
            const {userType, ...rest} = signUpData
            const { statusCode, body } = await request(app)
                .post('api/v1/auth/signup')
                .send({
                    ...rest,
                });

            expect(statusCode).toBe(400);
            expect(body.message).toBe('Make sure all fields are correctly sent')
        })
    });
});
