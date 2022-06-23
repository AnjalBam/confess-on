import {
    changeLikePostController,
    createPostController,
    getAllPostsController,
    getPostController,
} from '../post-controller';
import * as postService from '../../services/post.service';
import { Request, Response } from 'express';
import {
    generatePostDataArray,
    generatePostData,
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
            const postData = generatePostData();
            const spyOnCreatePost = jest
                .spyOn(postService, 'createPost')
                .mockResolvedValue(
                    postData as unknown as PostDocument & { _id: string }
                );
            await createPostController(req as Request, res as Response);

            expect(spyOnCreatePost).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: postData,
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

            try {
                await createPostController(req as Request, res as Response);
            } catch (err: unknown) {
                expect(spyOnCreatePost).toHaveBeenCalledWith(validPostInput);

                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith({
                    message: expect.any(String),
                    error: expect.any(Error),
                });
            }
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

    describe('getPostController', () => {
        it('should get a post with status 200', async () => {
            const postId = new mongoose.Types.ObjectId();
            req = {
                params: {
                    id: postId.toString(),
                },
            };

            const postData = {
                ...generatePostData(),
                _id: postId,
            };

            const spyOnGetPost = jest
                .spyOn(postService, 'getPostById')
                .mockResolvedValue({
                    postData,
                } as unknown as PostDocument & { _id: unknown });

            await getPostController(req as Request, res as Response);

            expect(spyOnGetPost).toHaveBeenCalled();
            expect(spyOnGetPost).toHaveBeenCalledWith(postId.toString());

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
                data: expect.any(Object),
            });
        });

        it('should return 500 and error if any occurs', async () => {
            const postId = new mongoose.Types.ObjectId();
            req = {
                params: {
                    id: postId.toString(),
                },
            };

            const spyOnGetPost = jest
                .spyOn(postService, 'getPostById')
                .mockRejectedValue(new Error('Invalid'));

            try {
                await getPostController(req as Request, res as Response);
            } catch (err: unknown) {
                expect(spyOnGetPost).toHaveBeenCalled();
                expect(spyOnGetPost).toHaveBeenCalledWith(postId);

                expect(res.send).toHaveBeenCalledWith({
                    message: expect.any(String),
                    error: expect.any(Error),
                });
                expect(res.status).toHaveBeenCalledWith(500);
            }
        });
    });

    describe('test changeLikePostController', () => {
        it('should like the post and return 200 on success', async () => {
            const postData = generatePostData();
            const spyOnLikePost = jest
                .spyOn(postService, 'likePost')
                .mockResolvedValue(
                    postData as unknown as PostDocument & { _id: string }
                );
            req = {
                body: {
                    likeStatus: 'like',
                    user: {
                        id: new mongoose.Types.ObjectId(),
                    },
                    postId: postData._id,
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            await changeLikePostController(req as Request, res as Response);

            expect(spyOnLikePost).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalled();
        });

        it('should unlike the post and return 200 on success', async () => {
            const postData = generatePostData();
            const userId = new mongoose.Types.ObjectId();
            const spyOnLikePost = jest
                .spyOn(postService, 'unlikePost')
                .mockResolvedValue({
                    ...postData,
                    likes: [userId],
                } as unknown as PostDocument & { _id: string });
            req = {
                body: {
                    likeStatus: 'unlike',
                    user: {
                        id: userId,
                    },
                    postId: postData._id,
                },
            };

            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            await changeLikePostController(req as Request, res as Response);

            expect(spyOnLikePost).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalled();
        });

        it('should return 400 and message if invalid likeStatus is sent', async () => {
            const post = generatePostData();

            req = {
                body: {
                    likeStatus: 'invalid',
                    user: {
                        id: new mongoose.Types.ObjectId(),
                    },
                    postId: post._id,
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await changeLikePostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                message: expect.any(String),
            });
        });

        it('should send 400 error if any postId is missing', async () => {
            req = {
                body: {
                    likeStatus: 'like',
                    user: {
                        id: new mongoose.Types.ObjectId(),
                    },
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            }

            await changeLikePostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
        });
        
        it('should send 400 error if no user found in body', async () => {
            const postData = generatePostData();

            req = {
                body: {
                    postId: postData._id,
                    likeStatus: 'like',
                }
            }

            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            }

            await changeLikePostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
        })

        it('should send 400 error if no likeStatus is sent in params', async () => {
            const postData = generatePostData();

            req = {
                body: {
                    user: {
                        id: new mongoose.Types.ObjectId(),
                    },
                    postId: postData._id,
                }
            }

            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            }

            await changeLikePostController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalled();
        })


    });
});
