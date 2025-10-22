import httpClient from "./httpClient";
export const apiService = {
    get: <T>(url: string, options?: any): Promise<T> =>
        httpClient.get(url, options),

    post: <T>(url: string, data?: any): Promise<T> =>
        httpClient.post(url, data),

    put: <T>(url: string, data?: any): Promise<T> =>
        httpClient.put(url, data),
    delete: <T>(url: string, config?: any): Promise<T> =>
        httpClient.delete(url, config),
    patch: <T>(url: string, data?: any): Promise<T> =>
        httpClient.patch(url, data),
};
