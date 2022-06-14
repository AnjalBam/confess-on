import { Request, Response } from 'express';
import { createPost, getAllPosts, getPostById } from '../services/post.service';

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
        const post = await createPost({
            description,
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
        const posts = await getAllPosts();
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
            return res.status(400).send({
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
