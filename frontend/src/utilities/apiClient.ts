import axios from 'axios';
import { LocalStorageManager } from './localStorageManager';
import { redirect } from "react-router-dom";
import { PublicRoutes } from '../models';

const BASE_URL = "http://localhost:4000";

const axiosClient = axios.create({
    baseURL: BASE_URL,// process.env.BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axios.interceptors.request.use(function (config) {
    const localStorageManager = new LocalStorageManager();
    const token = localStorageManager.getToken();
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
            const localStorageManager = new LocalStorageManager();
            localStorageManager.deleteToken();
            return redirect(PublicRoutes.SIGN_IN);
        }
        console.error("Looks like there was a problem.Status Code:" + res.status);
        return Promise.reject(error);
    }
);

export default axiosClient;