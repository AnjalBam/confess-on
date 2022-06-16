import { AxiosError, AxiosInstance } from 'axios';
import axiosInstance from 'utils/axios';

import { Cookies } from 'react-cookie';
import { Router } from 'next/router';
import { routes } from 'constant';
import { ResponseType, PostData } from 'services/services.types';

const cookies = new Cookies();

export class AuthenticatedService {
    protected axiosInstance: AxiosInstance;
    protected res: ResponseType;
    constructor() {
        this.axiosInstance = axiosInstance;
        this.res = {
            data: null,
            error: null,
            message: '',
            status: undefined,
            success: false,
        };

        this.setupAuthToken();
        this.setAuthInterceptors();
    }

    private setupAuthToken = () => {
        this.axiosInstance.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${cookies.get('token')}`;
    };

    private setAuthInterceptors = () => {
        this.axiosInstance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (!error.response) return error;

                if (error.response.status === '401' || '403') {
                    console.log('Unauthorized');
                    cookies.remove('token');
                    window.location.replace(routes.login);
                }

                return error;
            }
        );
    };
}

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
}

export default PostsService;
