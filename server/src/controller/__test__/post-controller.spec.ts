import {
    createPostController,
    getAllPostsController,
} from '../post-controller';
import * as postService from '../../services/post.service';
import { Request, Response } from 'express';
import {
    generatePostDataArray,
    validPostData,
    validPostInput,
} from '../../test/fixtures';
import mongoose from 'mongoose';
import { PostDocument } from '../../models/post.model';

describe('Test Post Controllers', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });
    describe('createPostController', () => {
        it('should create a post on sending valid data', async () => {
            req = {
                body: {
                    ...validPostInput,
                    user: new mongoose.Types.ObjectId(),
                },
            };
            const spyOnCreatePost = jest
                .spyOn(postService, 'createPost')
                .mockResolvedValue(
                    validPostData as unknown as PostDocument & { _id: string }
                );
            await createPostController(req as Request, res as Response);

            expect(spyOnCreatePost).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: validPostData,
            });
            expect(res.status).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should send status 400 on sending invalid data', async () => {
            req = {
                body: {
                    description: validPostInput.description,
                    user: new mongoose.Types.ObjectId(),
                },
            };
            await createPostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
        });

        it('should send 401 unauthorized if no user found in body', async () => {
            req = {
                body: {
                    ...validPostInput,
                    user: undefined,
                },
            };

            await createPostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
        });

        it('should send 500 if any error occur during creation', async () => {
            req = {
                body: validPostInput,
            };
            const spyOnCreatePost = jest
                .spyOn(postService, 'createPost')
                .mockRejectedValue(new Error('Invalid'));

            await createPostController(req as Request, res as Response);

            expect(spyOnCreatePost).toHaveBeenCalledWith(validPostInput);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                error: expect.any(Error),
            });
        });
    });

    describe('getAllPostsController', () => {
        it('should return 200 status and return data', async () => {
            const spyOnGetAllPosts = jest
                .spyOn(postService, 'getAllPosts')
                .mockResolvedValue(
                    generatePostDataArray() as unknown as (PostDocument & {
                        _id: unknown;
                    })[]
                );
            await getAllPostsController(req as Request, res as Response);

            expect(spyOnGetAllPosts).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: expect.any(Array),
            });
        });

        it('should return 500 if any error occurs', async () => {
            const spyOnGetAllPosts = jest
                .spyOn(postService, 'getAllPosts')
                .mockRejectedValue(new Error('Invalid'));

            await getAllPostsController(req as Request, res as Response);

            expect(spyOnGetAllPosts).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                error: expect.any(Error),
            });
        });
    });
});
