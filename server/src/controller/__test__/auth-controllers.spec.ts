/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import { dropCollections, dropDatabase, setupDb } from '../../test/db/testDb';
import { init } from '../../test/utils/app';
import User from '../../models/user.model';
import mongoose from 'mongoose';

import { signUpData } from '../../test/fixtures/user.fixture';

const app = init();

beforeAll(async () => {
    await setupDb();
});

afterEach(async () => {
    await dropCollections();
});

afterAll(async () => {
    await dropDatabase();
});

describe('Test Auth controller', () => {
    describe('Test signup controller', () => {
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
        });

        describe('given invalid data', () => {
            it('should match both the passwords', async () => {
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/signup')
                    .send({
                        ...signUpData,
                        confirmPassword: 'IDontMatch',
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe('Passwords do not match');
            });

            it('should return 400 if email is missing', async () => {
                const { email, ...rest } = signUpData;
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/signup')
                    .send({
                        ...rest,
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe(
                    'Make sure all fields are correctly sent'
                );
            });
            it('should return 400 if username is missing', async () => {
                const { username, ...rest } = signUpData;
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/signup')
                    .send({
                        ...rest,
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe(
                    'Make sure all fields are correctly sent'
                );
            });
            it('should return 400 if  fullName is missing', async () => {
                const { fullName, ...rest } = signUpData;
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/signup')
                    .send({
                        ...rest,
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe(
                    'Make sure all fields are correctly sent'
                );
            });
        });
    });

    describe('Test login controller', () => {
        beforeAll(async () => {
            await request(app).post('/api/v1/auth/signup').send(signUpData);
        });
        describe('Given valid data', () => {
            it('should return jwt token as data', async () => {
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/login')
                    .send({
                        email: signUpData.email,
                        password: signUpData.password,
                    });

                expect(statusCode).toBe(200);

                expect(statusCode).toBe(200);
                expect(body.message).toBe('Login Successful');
                expect(body.data).toStrictEqual({
                    token: expect.any(String),
                    username: signUpData.username,
                    id: expect.any(String),
                    email: signUpData.email,
                });
            });
        });

        describe('Given invalid data', () => {
            it('should return status 400 with a message', async () => {
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/login')
                    .send({
                        email: signUpData.email,
                        password: 'iAmInvalid',
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe('Invalid credentials');
            });

            it('should return 400 if any data is missing', async () => {
                const noPassword = await request(app)
                    .post('/api/v1/auth/login')
                    .send({
                        email: signUpData.email,
                    });

                const noEmail = await request(app)
                    .post('/api/v1/auth/login')
                    .send({
                        password: signUpData.password,
                    });

                expect(noPassword.statusCode).toBe(400);
                expect(noPassword.body.message).toBe(
                    'Make sure all fields are correctly sent'
                );

                expect(noEmail.statusCode).toBe(400);
                expect(noEmail.body.message).toBe(
                    'Make sure all fields are correctly sent'
                );
            });

            it('should return 400 if non existent email used', async () => {
                const { statusCode, body } = await request(app)
                    .post('/api/v1/auth/login')
                    .send({
                        email: 'idontexist@example.com',
                        password: 'testpassword',
                    });

                expect(statusCode).toBe(400);
                expect(body.message).toBe('Invalid credentials');
            });
        });
    });
});
