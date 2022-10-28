import { AuthenticatedService } from '../index';

class UserService extends AuthenticatedService {
    constructor() {
        super();
    }

    public async getMyDetails(): Promise<typeof this.res> {
        const res = this.res;
        try {
            const response = await this.axiosInstance.get('/users/my-details/');
            res.status = response.status;
            res.message = response.data?.message;
            res.data = response.data?.data;
            res.success = true;
            res.error = null;
        } catch (err: unknown) {
            throw new Error(err as string);
        }
        return res;
    }

    public async getUserDetails(id: string): Promise<typeof this.res> {
        const res = this.res;
        try {
            const response = await this.axiosInstance.get(`/users/u/${id}/`);
            res.status = response.status;
            res.message = response.data?.message;
            res.data = response.data?.data;
            res.success = true;
            res.error = null;
        } catch (err: unknown) {
            throw new Error(err as string);
        }
        return res;
    }
}

export default UserService;
