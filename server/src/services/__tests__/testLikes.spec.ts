import mongoose, { Query, Types } from 'mongoose';
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
    unlikePost,
} from '../post.service';

describe('Test postServices', () => {
    describe('test likePost', () => {
        it('should like a post under normal situation', async () => {
            const postData = { ...generatePostData(), save: jest.fn() };
            const userId = new mongoose.Types.ObjectId();
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockReturnValueOnce({ ...postData } as unknown as Query<
                    unknown,
                    unknown,
                    object,
                    PostDocument
                >);

            try {
                const post = await likePost(postData._id, userId);
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(post).toBeDefined();
                expect(post.likes).toContain(userId.toString());
                expect(post.likes.includes(userId.toString())).toBeTruthy();
                expect(postData.save).toHaveBeenCalledTimes(1);
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });

        it('should raise an error if post with id not found', async () => {
            const postId = new mongoose.Types.ObjectId();
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockRejectedValue(new Error('Post not found'));

            try {
                const post = await likePost(
                    postId,
                    new mongoose.Types.ObjectId()
                );
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(postId);
                expect(post).toThrow();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        });

        it('should raise an error if user already liked the post', async () => {
            const userId = new mongoose.Types.ObjectId();
            const postData = { ...generatePostData(), likes: [userId] };

            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockReturnValueOnce({
                    ...postData,
                } as unknown as Query<unknown, unknown, object, PostDocument>);

            try {
                const post = await likePost(postData._id, userId);
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(postData._id);
                expect(post).toThrow();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        });

        it('should throw error if any occur', async () => {
            const postId = new mongoose.Types.ObjectId();
            const userId = new mongoose.Types.ObjectId();
            const spyOnFindById = jest.
                spyOn(Post, 'findById')
                .mockRejectedValue(new Error('Some error occurred'));

            try {
                const post = await likePost(postId, userId);
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(postId);
                expect(post).toThrow();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })
    });

    describe('test unlikePosts', () => {
        it('should unlike a post under normal situation', async () => {
            const userId = new mongoose.Types.ObjectId();
            const postData = { ...generatePostData(), save: jest.fn() };
            postData.likes.push(userId.toString());
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockReturnValueOnce({ ...postData } as unknown as Query<
                    unknown,
                    unknown,
                    object,
                    PostDocument
                >);

            try {
                const post = await unlikePost(postData._id, userId);
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(postData._id);
                expect(post).toBeDefined();
                expect(post.likes).not.toContain(userId.toString());
                expect(post.likes.includes(userId.toString())).toBeFalsy();
                expect(postData.save).toHaveBeenCalledTimes(1);
            } catch (err) {
                expect(err).toBeUndefined();
            }
        });
        it('should raise an error if no post found', async () => {
            const postId = new mongoose.Types.ObjectId();
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockRejectedValue(new Error('Post not found'));

            try {
                const post = await likePost(
                    postId,
                    new mongoose.Types.ObjectId()
                );
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(postId);
                expect(post).toThrow();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(Error);
            }
        })
    })
});
