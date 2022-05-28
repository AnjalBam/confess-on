import { AxiosError, AxiosInstance } from "axios";
import { loginInitialData } from "constant";
import axiosInstance from "utils/axios";

class AuthenticationService {
    private axiosInstance: AxiosInstance;
    private res: {
        data: any;
        error: any;
        status: number | undefined;
        success: boolean;
    };
    constructor() {
        this.axiosInstance = axiosInstance;
        this.res = {
            data: null,
            error: null,
            status: undefined,
            success: false,
        };
    }

    public login = async (credentials: typeof loginInitialData) => {
        try {
            const response = await this.axiosInstance.post(
                "/auth/login",
                credentials
            );
            this.res.data = response.data;
            this.res.error = null;
            this.res.status = response.status;
            this.res.success = true;
        } catch (error: any) {
            this.res.data = null;
            this.res.error = error;
            this.res.status = error.response.status;
            this.res.success = false;
        }
        return this.res;
    };
}

export default AuthenticationService;
