import { AxiosError, AxiosInstance } from "axios";
import { initialSignupData, loginInitialData } from "constant";
import axiosInstance from "utils/axios";

import { Cookies } from "react-cookie";
import { Router } from "next/router";

const cookies = new Cookies();

class AuthenticationService {
    private axiosInstance: AxiosInstance;
    private res: {
        data: any;
        message: string;
        error: any;
        status: number | undefined;
        success: boolean;
    };
    constructor() {
        this.axiosInstance = axiosInstance;
        this.res = {
            data: null,
            error: null,
            message: "",
            status: undefined,
            success: false,
        };
    }

    public login = async (
        credentials: typeof loginInitialData
    ): Promise<typeof this.res> => {
        try {
            const response = await this.axiosInstance.post(
                "/auth/login",
                credentials
            );
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

    public signup = async (
        signUpData: typeof initialSignupData
    ): Promise<typeof this.res> => {
        try {
            const response = await this.axiosInstance.post(
                "/auth/signup",
                signUpData
            );
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

    public logout = (): typeof this.res => {
        try {
            cookies.remove("token");
            return {
                data: {},
                message: "Logged out successfully.",
                error: null,
                success: true,
                status: 200,
            };
        } catch (error: any) {
            throw error;
        }
    };
}

export default AuthenticationService;
