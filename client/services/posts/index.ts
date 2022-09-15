import { AxiosError, AxiosInstance } from 'axios';
import axiosInstance from 'utils/axios';

import { Cookies } from 'react-cookie';
import { Router } from 'next/router';
import { routes } from 'constant';
import { ResponseType, PostData } from 'services/services.types';
import { AuthenticatedService } from 'services';

class PostsService extends AuthenticatedService {
    public getPosts = async (): Promise<typeof this.res> => {
        try {
            const response = await this.axiosInstance.get('/posts');
            this.res.message = response.data?.message;
            this.res.data = response.data?.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: any) {
            throw error;
        }
        return this.res;
    };

    public addPost = async (postData: PostData): Promise<ResponseType> => {
        try {
            const response = await this.axiosInstance.post('/posts', postData);
            this.res.message = response.data?.message;
            this.res.data = response.data?.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: unknown) {
            throw error;
        }

        return this.res;
    };

    public likePost = async (postId: string): Promise<ResponseType> => {
        try {
            const response = await this.axiosInstance.patch('/posts/p/like', {
                postId,
                likeStatus: 'like',
            });
            this.res.message = response.data?.message;
            this.res.data = response.data?.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: unknown) {
            throw error;
        }
        return this.res;
    };

    public unlikePost = async (postId: string): Promise<ResponseType> => {
        try {
            const response = await this.axiosInstance.patch('/posts/p/like', {
                postId,
                likeStatus: 'unlike',
            });
            this.res.message = response.data?.message;
            this.res.data = response.data?.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: unknown) {
            throw error;
        }
        return this.res;
    };
}

export default PostsService;
