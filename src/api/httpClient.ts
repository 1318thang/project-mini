import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
// Tạo instance axios
const httpClient = axios.create({
    // baseURL: "https://bold-wind-c8e3.1318thang.workers.dev/api/",
    baseURL: "https://localhost:7140/api/",
    timeout: 15000,
});
// Interceptor request
httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Đảm bảo headers luôn có giá trị đúng type
        config.headers = config.headers ?? {} as any; // ép kiểu tạm thời
        // Nếu data là FormData, axios tự set multipart/form-data
        if (!(config.data instanceof FormData)) {
            (config.headers as any)["Content-Type"] = "application/json";
        }
        // Thêm token nếu cần
        const token = localStorage.getItem("accessToken");
        if (token) (config.headers as any).Authorization = `Bearer ${token}`;

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);
// Interceptor response
httpClient.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        const originalRequest = error.config as any;
        // Nếu 401 (token hết hạn) → thử refre  sh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.warn("⚠️ Refresh token missing → logout");
                window.location.href = "#/login"; // hoặc dispatch logout
                return Promise.reject(error);
            }
            try {
                // const res = await axios.post("https://localhost:7140/api/Auth/refresh-token", {
                //     refreshToken,
                // });
                const res = await axios.post("https://bold-wind-c8e3.1318thang.workers.dev/api/Auth/refresh-token", {
                    refreshToken,
                });
                const newAccessToken = (res.data as any).accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                // Cập nhật header cũ
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                // Gửi lại request cũ
                return httpClient(originalRequest);
            } catch (refreshErr) {
                console.error("🔒 Refresh token failed:", refreshErr);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "#/login";
                return Promise.reject(refreshErr);
            }
        }

        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default httpClient;
