import { useState, useCallback } from "react";
import { authService } from "../api/auth/authService";
type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
};
export const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        isAuthenticated: !!localStorage.getItem("accessToken"),
    });
    const login = useCallback(async (email: string, password: string) => {
        const { accessToken, refreshToken } = await authService.login(email, password);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAuth({ accessToken, refreshToken, isAuthenticated: true });
    }, []);
    const logout = useCallback(async () => {
        await authService.logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuth({ accessToken: null, refreshToken: null, isAuthenticated: false });
    }, []);
    const refresh = useCallback(async () => {
        if (!auth.refreshToken) return;
        const { accessToken } = await authService.refreshToken(auth.refreshToken);
        localStorage.setItem("accessToken", accessToken);
        setAuth((prev) => ({ ...prev, accessToken }));
    }, [auth.refreshToken]);
    return { ...auth, login, logout, refresh };
};