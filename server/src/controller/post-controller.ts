import { Request, Response } from 'express';
import { UserDocument } from '../models/user.model';
import { createPost, getAllPosts, getPostById } from '../services/post.service';
import { likePost, unlikePost } from '../services/post.service';
import { decryptData, encryptData } from '../utils/cryptography';

export const createPostController = async (req: Request, res: Response) => {
    const { body } = req;
    const { description, visibility, user } = body;

    if (!user) {
        return res.status(401).send({
            message: 'You are unauthenticated.',
        });
    }

    if (!description || !visibility) {
        return res.status(400).send({
            message: 'Make sure all fields are correctly sent',
        });
    }

    try {
        const desc = encryptData(description, user?.id?.toString());

        const post = await createPost({
            description: desc,
            visibility,
            user: user.id,
        });
        return res.status(201).send({
            message: 'Post created successfully',
            data: post,
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'Some error occurred. Try Again.',
            error: err,
        });
    }
};

export const getAllPostsController = async (req: Request, res: Response) => {
    try {
        const p = await getAllPosts();
        const posts = p.map(post => {
            try {
                const id = post.user._id.toString();
                try {
                    const desc = decryptData(post.description, id);
                    post.description = desc;
                } catch (err) {
                    throw new Error('Error while decrytption');
                }
            } catch (err) {
                throw new Error(`Decryption Failed: ${err}`);
            }

            if (post.visibility === 'anonymous') {
                post.user = 'anonymous' as unknown as UserDocument;
            }
            return post;
        });
        res.status(200).send({
            message: 'Posts fetched successfully',
            data: posts,
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'Some error occurred. Try Again.',
            error: err,
        });
    }
};

export const getPostController = async (req: Request, res: Response) => {
    const postId = req.params.id;
    try {
        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).send({
                message: 'Post not found.',
            });
        }

        res.status(200).send({
            message: 'Post fetched successfully.',
            data: post,
        });
    } catch (err: unknown) {
        res.status(500).send({
            message: 'Some error occurred. Try Again.',
            error: err,
        });
    }
};

export const changeLikePostController = async (req: Request, res: Response) => {
    const { body } = req;
    const { postId, likeStatus, user } = body;

    try {
        if (!postId) {
            throw new Error('postId is required');
        }

        if (!likeStatus) {
            throw new Error('likeStatus is required');
        }

        if (!user) {
            throw new Error('Not authenticated');
        }

        if (likeStatus === 'like') {
            const post = await likePost(postId, user.id);
            return res.status(200).send({
                message: 'Post liked successfully',
                data: post,
            });
        }

        if (likeStatus === 'unlike') {
            const post = await unlikePost(postId, user.id);
            return res.status(200).send({
                message: 'Post unliked successfully',
                data: post,
            });
        }
        return res.status(400).send({
            message: 'Invalid like status',
        });
    } catch (err: unknown) {
        return res.status(400).send({
            message: `Error: ${err as string}`,
            error: err,
        });
    }
};

export const getMyPostsController = async (req: Request, res: Response) => {
    return res.status(501).send({
        message: 'getting my posts',
    });
};
