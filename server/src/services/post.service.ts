import Post, { PostDocument } from '../models/post.model';

export const createPost = async (
    postData: Omit<PostDocument, 'createdAt' | 'modifiedAt' | 'likes'>
) => {
    try {
        const post = new Post(postData);
        await post.save();
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getPostById = async (postId: string) => {
    try {
        const post = await Post.findById(postId);
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
}
