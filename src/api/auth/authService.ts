import type { LoginResponseType } from "../../type/LoginResponseType";
import type { RefreshResponseType } from "../../type/RefreshResponseType";
import type { UserType } from "../../type/UserType";
import httpClient from "../httpClient";
import { jwtDecode } from "jwt-decode";
import axios
    // , { AxiosError }
    from "axios";
interface TokenPayload {
    sub: string;
    email: string;
    role: "Admin" | "User";
}
export const authService = {
    login: async (email: string, password: string): Promise<LoginResponseType> => {
        try {
            // ép kiểu cho res để TypeScript hiểu đúng
            const res = await httpClient.post("Auth/login", { email, password }) as LoginResponseType;
            // console.log("authService = " + JSON.stringify(res, null, 2));
            if (!res.accessToken || !res.refreshToken) {
                throw new Error("Login response missing accessToken or refreshToken");
            }
            const decoded = jwtDecode<TokenPayload>(res.accessToken);

            // const decode1 = jwtDecode<TokenPayload>(res.refreshToken);
            const user: UserType = {
                id: 0,
                email: decoded.email,
                Role: res.role,
            };
            console.log("user role = ", res.role);

            return {
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                role: res.role,
                id: res.id,
                user,
            };
        } catch (err) {
            console.error("Login failed:", err);
            throw err; // để hook xử lý lỗi hiển thị UI
        }
    },
    refreshToken: async (refreshToken: string): Promise<RefreshResponseType> => {
        try {
            const res = await httpClient.post<RefreshResponseType>("Auth/refresh-token", { refreshToken });
            return res.data; // ✅ chỉ lấy data
        } catch (error) {
            console.error(error);
            throw error; // để hook xử lý lỗi hiển thị UI
        }

    },

    logout: async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("refreshToken logout: " + refreshToken);
        if (!refreshToken) {
            console.warn("Không tìm thấy refresh token trong localStorage.");
            return { success: false, message: "Không có refresh token." };
        }
        try {

            const res = await httpClient.post("/Auth/logout", refreshToken, {
                headers: { "Content-Type": "application/json" },
            });
            return { success: true, data: res.data };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("🚫 Lỗi khi logout:", error.response?.data || error.message);
                return {
                    success: false,
                    message: error.response?.data?.message || "Logout thất bại",
                };
            } else if (error instanceof Error) {
                console.error("🚫 Lỗi hệ thống:", error.message);
                return { success: false, message: error.message };
            } else {
                console.error("🚫 Lỗi không xác định:", error);
                return { success: false, message: "Có lỗi xảy ra" };
            }
        }

    },
};
