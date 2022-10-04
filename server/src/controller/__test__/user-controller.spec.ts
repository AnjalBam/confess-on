import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import { getUserDetailsController } from '../user-controller';
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
    });
});
