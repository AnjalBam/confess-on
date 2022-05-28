import axios from 'axios'
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cookies.get('token')
    }
});

export default axiosInstance;