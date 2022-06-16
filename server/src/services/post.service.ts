import mongoose, { FilterQuery, DocumentDefinition } from 'mongoose';
import Post, { PostDocument } from '../models/post.model';

export const createPost = async (
    postData: DocumentDefinition<
        Omit<PostDocument, 'createdAt' | 'modifiedAt' | 'likes'>
    >
) => {
    try {
        const post = new Post(postData);
        await post.save();
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getPostById = async (postId: string | mongoose.Types.ObjectId) => {
    try {
        const post = await Post.findById(postId);
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getPost = async (filter: FilterQuery<PostDocument>) => {
    try {
        const post = await Post.findOne(filter);
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getAllPosts = async (filter: FilterQuery<PostDocument> = {}) => {
    try {
        const posts = await Post.find(filter).populate('user', '-password -salt -createdAt -updatedAt');
        return posts;
    } catch (err) {
        throw new Error(err as string);
    }
};
