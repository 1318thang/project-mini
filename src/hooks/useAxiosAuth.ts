import { useEffect } from "react";
import axios from "../api/httpClient";
import { useAuth } from "./useAuth";
export const useAxiosAuth = () => {
    const { accessToken, refresh, logout } = useAuth();
    useEffect(() => {
        const requestIntercept = axios.interceptors.request.use((config) => {
            if (accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });
        const responseIntercept = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true;
                    try {
                        await refresh();
                        return axios(prevRequest);
                    } catch {
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refresh, logout]);
    return axios;
};