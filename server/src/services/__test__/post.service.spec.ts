import Post, { PostDocument } from '../../models/post.model';
import { validPostData, validPostInput } from '../../test/fixtures';
import { createPost } from '../post.service';

describe('TEST POST SERVICE', () => {
    describe('test post create',  () => {
        it('should create a new post and return', async () => {
            const spyOnCreate = jest.spyOn(Post.prototype, 'save').mockReturnValue({
                ...validPostData
            });
            const post = await createPost(validPostInput as unknown as Omit<PostDocument, 'createdAt' | 'modifiedAt' | 'likes'>);

            expect(spyOnCreate).toHaveBeenCalled();

            expect(post).toBeDefined();
            expect(post.description).toBe(validPostData.description);
            expect(post.visibility).toBe(validPostData.visibility);
            expect(post.likes).toHaveLength(0)
        });

        it('should throw error if any occurs', async () => {
            const spyOnCreate = jest.spyOn(Post.prototype, 'save').mockRejectedValue('Error Occurred')

            try {
                const post = await createPost(validPostInput as unknown as Omit<PostDocument, 'createdAt' | 'modifiedAt' | 'likes'>);
                expect(post).toBeUndefined();
                expect(post).toThrowError('Error Occurred');
            } catch (err) {
                expect(spyOnCreate).toHaveBeenCalled();
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(Error);
            }
        })
    })  
})