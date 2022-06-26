import { Query, Types } from 'mongoose';
import Post, { PostDocument } from '../../models/post.model';
import {
    generatePostData,
    generatePostDataArray,
    validPostData,
    validPostInput,
} from '../../test/fixtures';
import {
    createPost,
    getPostById,
    getPost,
    getAllPosts,
    likePost,
} from '../post.service';

describe('TEST POST SERVICE', () => {
    describe('test post create', () => {
        it('should create a new post and return', async () => {
            const spyOnCreate = jest
                .spyOn(Post.prototype, 'save')
                .mockReturnValue({
                    ...validPostData,
                });
            try {
                const post = await createPost(
                    validPostInput as unknown as Omit<
                        PostDocument,
                        'createdAt' | 'modifiedAt' | 'likes'
                    >
                );

                expect(spyOnCreate).toHaveBeenCalled();

                expect(post).toBeDefined();
                expect(post.description).toBe(validPostData.description);
                expect(post.visibility).toBe(validPostData.visibility);
                expect(post.likes).toHaveLength(0);
            } catch (err: unknown) {
                expect(err).toBeUndefined();
            }
        });

        it('should throw error if any occurs', async () => {
            const spyOnCreate = jest
                .spyOn(Post.prototype, 'save')
                .mockRejectedValue('Error Occurred creation');

            try {
                const post = await createPost(
                    validPostInput as unknown as Omit<
                        PostDocument,
                        'createdAt' | 'modifiedAt' | 'likes'
                    >
                );
                expect(post).toBeUndefined();
                expect(post).toThrowError('Error Occurred creation');
            } catch (err) {
                expect(spyOnCreate).toHaveBeenCalled();
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        });
    });

    describe('getPostById', () => {
        it('should get a post by id', async () => {
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockReturnValueOnce({
                    ...validPostData,
                    likes: [],
                } as unknown as Query<unknown, unknown, object, PostDocument>);
            try {
                const post = await getPostById(validPostData._id);

                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(validPostData._id);

                expect(post).toBeDefined();
                expect(post?.description).toBe(validPostData.description);
                expect(post?.visibility).toBe(validPostData.visibility);
                expect(post?.likes).toHaveLength(0);
            } catch (err: unknown) {
                expect(err).toBeUndefined();
            }
        });

        it('should throw error if any occur', async () => {
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockRejectedValueOnce('Error Occurred findPostByID');

            try {
                const post = await getPostById(validPostData._id);
                expect(post).toBeUndefined();
                expect(post).toThrowError('Error Occurred findPostByID');
            } catch (err) {
                expect(spyOnFindById).toHaveBeenCalled();
                expect(spyOnFindById).toHaveBeenCalledWith(validPostData._id);
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        });
    });

    describe('getPost', () => {
        it('should get a post with filters', async () => {
            const spyOnFind = jest.spyOn(Post, 'findOne').mockReturnValueOnce({
                ...validPostData,
                likes: [],
            } as unknown as Query<unknown, unknown, object, PostDocument>);

            try {
                const filter = {
                    _id: validPostData._id,
                    user: new Types.ObjectId(),
                };
                const post = await getPost(filter);

                expect(spyOnFind).toHaveBeenCalledTimes(1);
                expect(spyOnFind).toHaveBeenCalledWith(filter);

                expect(post).toBeDefined();
                expect(post?.description).toBe(validPostData.description);
                expect(post?.visibility).toBe(validPostData.visibility);
                expect(post?.likes).toHaveLength(0);
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });

        it('should throw error if any occur', async () => {
            const spyOnFind = jest
                .spyOn(Post, 'findOne')
                .mockRejectedValueOnce('Error Occurred find');

            try {
                const filter = {
                    _id: validPostData._id,
                    user: new Types.ObjectId(),
                };
                const post = await getPost(filter);
                expect(post).toBeUndefined();
                expect(post).toThrow('Error Occurred find');
                expect(spyOnFind).toHaveBeenCalled();
            } catch (err) {
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        });
    });

    describe('test getAllPosts', () => {
        it('should fetch all the posts by default', async () => {
            const spyOnFind = jest
                .spyOn(Post, 'find')
                .mockReturnValue({
                    ...generatePostDataArray()
                } as unknown as Query<
                    unknown[],
                    unknown,
                    object,
                    PostDocument
                >);
                
            try {
                const posts = await getAllPosts();
                expect(spyOnFind).toHaveBeenCalledTimes(1);
                expect(posts.length).toBe(10);
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });

        it('should throw error if any occur', async () => {
            // const spyOnFind = jest
            //     .spyOn(Post, 'find')
            //     .mockRejectedValueOnce('Error Occurred spyOnFind');
            // try {
            //     const posts = await getAllPosts();
            //     expect(posts).toBeUndefined();
            //     expect(posts).toThrowError('Error Occurred spyOnFind');
            //     expect(spyOnFind).toHaveBeenCalled();
            // } catch (err: unknown) {
            //     expect(err).toBeDefined();
            //     expect(err).toBeInstanceOf(Error);
            // }
        });

        it('should fetch all the posts by filter if passed any', async () => {
            const spyOnFind = jest
                .spyOn(Post, 'find')
                .mockReturnValue(
                    generatePostDataArray() as unknown as Query<
                        unknown[],
                        unknown,
                        object,
                        PostDocument
                    >
                );

            try {
                const filter = {
                    user: new Types.ObjectId(),
                };
                const posts = await getAllPosts(filter);
                expect(spyOnFind).toHaveBeenCalled();
                expect(spyOnFind).toHaveBeenCalledWith(filter);
                expect(posts.length).toBe(10);
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });
    });
});
