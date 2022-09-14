import * as authMiddleware from '../auth.middleware';
import { Request, Response, NextFunction } from 'express';

import * as JwtUtils from '../../utils/jwt';

describe('Test Auth Middlewares', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const mockNext: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    describe('Test isAuthenticated', () => {
        it('should return 401 with response if no token is provided', () => {
            mockRequest = {
                header: jest.fn().mockReturnValue(undefined),
            };

            authMiddleware.isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(401);

            expect(mockResponse.send).toBeCalledWith({
                message: 'You are not authorized.',
                error: 'No token provided.',
            });
        });

        it('should return 401 with response if token is invalid', () => {
            mockRequest = {
                header: jest.fn().mockReturnValue('Bearer invalidToken'),
            };

            authMiddleware.isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(401);

            expect(mockResponse.send).toBeCalledWith({
                message: 'You are not authorized.',
                error: 'Invalid token.',
            });
        });

        it("should return 401 if token is not in format 'Bearer $token'", () => {
            mockRequest = {
                header: jest.fn().mockReturnValue('invalidToken'),
            };

            authMiddleware.isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(401);

            expect(mockResponse.send).toBeCalledWith({
                message: 'You are not authorized.',
                error: "Invalid token format. Use 'Bearer $token'.",
            });
        });

        it('should return 401 if token is expired', () => {
            mockRequest = {
                header: jest.fn().mockReturnValue('Bearer expiredToken'),
            };

            const mockedVerifyJwtForUser = jest
                .spyOn(JwtUtils, 'verifyJwtForUser')
                .mockReturnValue({
                    valid: false,
                    expired: true,
                    payload: {
                        id: 'userId',
                        email: 'test@test.com',
                    },
                });

            authMiddleware.isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedVerifyJwtForUser).toHaveBeenCalledWith('expiredToken');
            expect(mockedVerifyJwtForUser).toHaveBeenCalledTimes(1);

            expect(mockResponse.status).toHaveBeenCalledWith(401);

            expect(mockResponse.send).toBeCalledWith({
                message: 'You are not authorized.',
                error: 'Token expired.',
            });
        });

        it('should call next if token is valid', () => {
            mockRequest = {
                header: jest.fn().mockReturnValue('Bearer validToken'),
                body: {
                    user: {},
                },
            };
            const expectedPayload = {
                id: 'userId',
                email: 'testt@gmail.com',
            };

            const mockedVerifyJwtForUser = jest
                .spyOn(JwtUtils, 'verifyJwtForUser')
                .mockReturnValueOnce({
                    valid: true,
                    expired: false,
                    payload: expectedPayload,
                });

            authMiddleware.isAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockedVerifyJwtForUser).toHaveBeenCalled();
            expect(mockedVerifyJwtForUser).toHaveBeenCalledWith('validToken');

            expect(mockNext).toHaveBeenCalled();
        });
    });
});
