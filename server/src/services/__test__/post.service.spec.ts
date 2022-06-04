import { Query } from 'mongoose';
import Post, { PostDocument } from '../../models/post.model';
import { validPostData, validPostInput } from '../../test/fixtures';
import { createPost, getPostById } from '../post.service';

describe('TEST POST SERVICE', () => {
    describe('test post create', () => {
        it('should create a new post and return', async () => {
            const spyOnCreate = jest
                .spyOn(Post.prototype, 'save')
                .mockReturnValue({
                    ...validPostData,
                });
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
        });

        it('should throw error if any occurs', async () => {
            const spyOnCreate = jest
                .spyOn(Post.prototype, 'save')
                .mockRejectedValue('Error Occurred');

            try {
                const post = await createPost(
                    validPostInput as unknown as Omit<
                        PostDocument,
                        'createdAt' | 'modifiedAt' | 'likes'
                    >
                );
                expect(post).toBeUndefined();
                expect(post).toThrowError('Error Occurred');
            } catch (err) {
                expect(spyOnCreate).toHaveBeenCalled();
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        });
    });

    describe('get a post', () => {
        it('should get a post by id', async () => {
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockReturnValueOnce({
                    ...validPostData,
                    likes: [],
                } as unknown as Query<unknown, unknown, object, PostDocument>);
            const post = await getPostById(validPostData._id);

            expect(spyOnFindById).toHaveBeenCalledTimes(1);
            expect(spyOnFindById).toHaveBeenCalledWith(validPostData._id);

            expect(post).toBeDefined();
            expect(post?.description).toBe(validPostData.description);
            expect(post?.visibility).toBe(validPostData.visibility);
            expect(post?.likes).toHaveLength(0);
        });

        it('should throw error if any occur', async () => {
            const spyOnFindById = jest
                .spyOn(Post, 'findById')
                .mockRejectedValue('Error Occurred');

            try {
                const post = await getPostById(validPostData._id);
                expect(post).toBeUndefined();
                expect(post).toThrowError('Error Occurred');
            } catch (err) {
                expect(spyOnFindById).toHaveBeenCalledTimes(1);
                expect(spyOnFindById).toHaveBeenCalledWith(validPostData._id);
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        })
    });
});
