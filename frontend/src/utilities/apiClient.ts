import axios from 'axios';
import { toast } from 'react-hot-toast';
import { redirect } from "react-router-dom";
import { PublicRoutes } from '../models';
import { deleteLocalStorage, getLocalStorage } from './localstorage.utility';

// Add to .env file
const BASE_URL = "https://cookunity-app-production.up.railway.app";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axios.interceptors.request.use(function (config) {
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
        if (res.status == 401) {
            toast.error("Credenciales invalidas!");

            deleteLocalStorage('user');
            deleteLocalStorage('token');
            return redirect(PublicRoutes.SIGN_IN);
        }
        if (res.status == 500) {
            toast.error("Hubo un error:" + res);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;