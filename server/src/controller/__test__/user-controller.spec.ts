import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { getMyDetails, getUserDetailsController } from '../user-controller';
import * as userServices from '../../services/user.service';
import { getValidUserDoc } from '../../test/fixtures';
import { UserDocument } from '../../models/user.model';

describe('TEST USER CONTROLLER =>', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('test getUserDetailsController', () => {
        it('should return 200 and userDetails on valid request.', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };

            req = {
                params: {
                    id: userId,
                },
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
            };

            const spyOnUserService = jest
                .spyOn(userServices, 'getUserById')
                .mockResolvedValue(validUserDoc);

            await getUserDetailsController(req as Request, res as Response);

            expect(spyOnUserService).toHaveBeenCalledWith(userId);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: expect.any(Object),
            });
        });

        it('should return 401 for no user property found in body', async () => {
            req = {
                params: {},
                body: {},
            };

            await getUserDetailsController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
        });

        it('should return 400 for no userId provided', async () => {
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };

            req = {
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
                params: {},
            };

            await getUserDetailsController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 404 NOT FOUND WHEN user is not found', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };

            req = {
                params: {
                    id: userId,
                },
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
            };

            const spyOnUserService = jest
                .spyOn(userServices, 'getUserById')
                .mockResolvedValue(null);

            await getUserDetailsController(req as Request, res as Response);

            expect(spyOnUserService).toHaveBeenCalledWith(userId);

            expect(res.status).toHaveBeenCalledWith(404);

            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
        });

        it('should return 500 for any error occurred', async () => {
            const userId = new mongoose.Types.ObjectId().toString();
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };

            jest.spyOn(userServices, 'getUserById').mockRejectedValue(
                new Error('Error')
            );

            req = {
                params: {
                    id: userId,
                },
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
            };

            await getUserDetailsController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('test getMyDetailsController', () => {
        it('should return the authenticated user details upon request.', async () => {
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };

            req = {
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
            };

            const spyOnUserService = jest
                .spyOn(userServices, 'getUserById')
                .mockResolvedValue(validUserDoc);

            await getMyDetails(req as Request, res as Response);

            expect(spyOnUserService).toHaveBeenCalledWith(validUserDoc._id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: expect.any(Object),
            });
        });

        it('should return 401 if no user present in body.', async () => {
            req = {
                body: {},
            };

            await getMyDetails(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
        });

        it('should return 500 if no user id present in body.user', async () => {
            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };
            req = {
                body: {
                    user: { ...validUserDoc },
                },
            };

            await getMyDetails(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                error: expect.anything(),
            });
        });

        it('should throw 500 if user service throws some error.', async () => {
            const spyOnGetUserById = jest
                .spyOn(userServices, 'getUserById')
                .mockRejectedValue(new Error('Error Occurred'));

            const validUserDoc =
                getValidUserDoc() as unknown as UserDocument & {
                    _id: ObjectId;
                };
            req = {
                body: {
                    user: { ...validUserDoc, id: validUserDoc._id },
                },
            };

            await getMyDetails(req as Request, res as Response);

            expect(spyOnGetUserById).toHaveBeenCalledWith(validUserDoc._id);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                error: expect.any(Error),
            });
        });
    });
});
