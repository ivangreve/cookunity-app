import jwt_decode from 'jwt-decode';

export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const setTokenLocalStorage = (value: any) => {
    localStorage.setItem("token", value);
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key) as string;
}

export const deleteLocalStorage = (key: string) => {
    return localStorage.removeItem(key);
}

export const getRole = () => {
    const token = getLocalStorage("token");
    if (!token) return;
    const tokenInfo = getDecodedAccessToken(token);
    return tokenInfo["role"]
}

const getDecodedAccessToken = (token: string): any => {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
}