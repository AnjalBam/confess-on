import { Request, Response } from 'express';
import * as authControllers from '../auth-controllers';
import { Query } from 'mongoose';
import { changePasswordData, userData } from '../../test/fixtures/user.fixture';
import User, { UserDocument } from '../../models/user.model';
import * as helpers from '../helpers';

describe('Test change password', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    describe('given valid data', () => {
        it('should change password', async () => {
            mockRequest = {
                body: changePasswordData,
            };

            const vp = {
                validatePassword: jest.fn().mockReturnValueOnce(true),
                save: jest.fn(),
            };

            const spyFindOne = jest
                .spyOn(User, 'findOne')
                .mockReturnValue({ ...userData, ...vp } as unknown as Query<
                    unknown,
                    unknown,
                    UserDocument
                >);

            const spyCheckPasswords = jest
                .spyOn(helpers, 'checkPasswords')
                .mockReturnValueOnce(true);

            const spy = jest.spyOn(authControllers, 'changePassword');

            await authControllers.changePassword(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(spyFindOne).toHaveBeenCalled();
            expect(spyCheckPasswords).toHaveBeenCalled();

            expect(vp.save).toHaveBeenCalled();
            expect(vp.validatePassword).toHaveBeenCalled();

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: 'Password changed successfully',
            });

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('Given Invalid Data', () => {
        it('should return 400 if any field missing', async () => {
            mockRequest = {
                body: {
                    password: changePasswordData.password,
                },
            };

            const spyOnChangePassword = jest.spyOn(
                authControllers,
                'changePassword'
            );

            await authControllers.changePassword(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(spyOnChangePassword).toHaveBeenCalled();
            expect(spyOnChangePassword).toHaveBeenCalledWith(
                mockRequest,
                mockResponse
            );

            expect(mockResponse.send).toHaveBeenCalled();
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('should return 400 if passwords do not match', async () => {
            mockRequest = {
                body: changePasswordData,
            };

            const spyOnCheckPassword = jest
                .spyOn(helpers, 'checkPasswords')
                .mockReturnValue(false);

            await authControllers.changePassword(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(spyOnCheckPassword).toHaveBeenCalled();

            expect(mockResponse.send).toHaveBeenCalled();
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });

            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('should return 400 if user not found', async () => {
            mockRequest = {
                body: changePasswordData,
            };

            const spyOnFindOne = jest
                .spyOn(User, 'findOne')
                .mockReturnValue(
                    undefined as unknown as Query<
                        unknown,
                        unknown,
                        UserDocument
                    >
                );

            await authControllers.changePassword(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(spyOnFindOne).toHaveBeenCalled();

            expect(mockResponse.send).toHaveBeenCalled();
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });

            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });

        it('should return 400 if old password not valid', async () => {
            mockRequest = {
                body: changePasswordData,
            };

            const vp = {
                validatePassword: jest.fn().mockReturnValueOnce(false),
            };

            const spyOnFindOne = jest.spyOn(User, 'findOne').mockReturnValue({
                ...userData,
                ...vp,
            } as unknown as Query<unknown, unknown, UserDocument>);

            await authControllers.changePassword(
                mockRequest as Request,
                mockResponse as Response
            );

            expect(spyOnFindOne).toHaveBeenCalled();

            expect(mockResponse.send).toHaveBeenCalled();
            expect(mockResponse.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });

            expect(mockResponse.status).toHaveBeenCalledWith(400);
        });
    });
});
