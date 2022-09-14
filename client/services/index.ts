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
                if (!error.response) return Promise.reject(error);

                if (
                    error.response.statusText
                        .toLowerCase()
                        .includes('unauthorized') ||
                    error.response.statusText
                        .toLowerCase()
                        .includes('forbidden')
                ) {
                    console.log('Unauthorized');
                    cookies.remove('token');
                    window.location.replace(routes.login);
                }

                return Promise.reject(error);
            }
        );
    };

    public testConnection = async (): Promise<ResponseType> => {
        try {
            const response = await this.axiosInstance.get('/connection-test');
            this.res.message = response.data?.message;
            this.res.data = response.data?.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: unknown | AxiosError) {
            throw error;
        }
        return this.res;
    };
}
