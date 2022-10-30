import mongoose, { FilterQuery, DocumentDefinition } from 'mongoose';
import Post, { PostDocument } from '../models/post.model';
import { UserDocument } from '../models/user.model';

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
        const posts = await Post.find(
            {
                ...filter,
                visibility: { $in: ['public', 'anonymous'] },
            },
            { sort: { createdAt: -1 } }
        )
            .lean()
            .populate<{ user: UserDocument }>(
                'user',
                '-password -salt -createdAt -updatedAt'
            );
        return posts;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const likePost = async (
    postId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId
) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.likes.includes(userId.toString())) {
            throw new Error('You already liked this post');
        }
        post.likes.push(userId.toString());
        await post.save();
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const unlikePost = async (
    postId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId
) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        if (!post.likes.includes(userId.toString())) {
            throw new Error('You have not liked this post');
        }
        post.likes = post.likes.filter(
            id => id.toString() !== userId.toString()
        );
        await post.save();
        return post;
    } catch (err) {
        throw new Error(err as string);
    }
};

export const getAllPostsByUser = async (
    userId: string | mongoose.Types.ObjectId
) => {
    try {
        const posts = await Post.find(
            { user: userId },
            { sort: { createdAt: -1 } }
        ).populate<{ user: UserDocument }>(
            'user',
            '-password -salt -createdAt -updatedAt'
        );
        return posts;
    } catch (err: unknown) {
        throw err;
    }
};
