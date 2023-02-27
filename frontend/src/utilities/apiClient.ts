import axios from 'axios';
import { toast } from 'react-hot-toast';
import { redirect } from "react-router-dom";
import { PublicRoutes } from '../models';
import { deleteLocalStorage, getLocalStorage } from './localstorage.utility';
import { Enviroment } from '../../enviroment';

// Add to .env file
const BASE_URL = Enviroment.baseUrl || "http://localhost:4000";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

axiosClient.interceptors.request.use(function (config) {
    const token = getLocalStorage('token');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        let res = error.response;
        if (res.data.path.startsWith("/auth")) return Promise.reject(res);

        if (res.status == 401) {
            window.location.href = '/'
            deleteLocalStorage('user');
            deleteLocalStorage('token');
        }
        if (res.status == 500) {
            toast.error("Hubo un error:" + res);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;