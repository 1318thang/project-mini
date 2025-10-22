import React, { useState, useEffect } from "react";
import type { LoginResponseType } from "../../type/LoginResponseType";
import { authService } from "../../api/auth/authService";
import { loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    page: "login" | "register" | null; // ✅ cho phép null

}

const ModalDaisy: React.FC<ModalProps> = ({ open, onClose, page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [mode, setMode] = useState<"login" | "register">("login");
    const [animating, setAnimating] = useState<"login-out" | "register-out" | null>(null);
    const [current, setCurrent] = useState<"login" | "register" | null>(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [loginData, setLoginData] = useState<LoginResponseType | null>(null);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(loading + "" + error + "" + loginData)
        try {
            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
            const res: LoginResponseType = await authService.login(email, password);
            setLoginData(res);               // ✅ lưu toàn bộ model
            dispatch(loginSuccess({
                accessToken: res.accessToken,
                refreshToken: res.refreshToken,
                user: {
                    ...res.user,
                    role: res.role, // ✅ Thêm thủ công nếu thiếu
                    id: res.id,
                },
            }));     // ✅ lưu vào Redux luôn
            // 🔹 Redirect trước

            var _accessToken = localStorage.getItem("accessToken");
            var _refreshToken = localStorage.getItem("refreshToken");

            var userString = localStorage.getItem("user");
            if (userString) {
                const user = JSON.parse(userString); // chuyển lại thành object
                console.log(user.email); // 👉 "dat@gmail.com"
                console.log(user.role);  // 👉 "User"
                console.log(user.id);    // 👉 4
            }
            console.log("_refresherToken: " + _refreshToken);
            console.log("_accessToken: " + _accessToken);
            console.log("User info: ", res.user.email, res.user.Role, res.user.id);
            if (res.user.Role != null) {
                const userRole = res.user.Role;
                if (userRole === "Admin") navigate("/dashboard");
                else navigate("/");
                // 🔹 Đóng modal với delay animation (nếu muốn)
                setTimeout(() => onClose(), 300); // 300ms tương ứng duration transiti
            }

        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (open) { // nếu open = true thì mở modal    
            console.log(open)
            if (page === "login" || page === "register") {
                setCurrent(page); // ✅ giờ TypeScript chắc chắn giá trị hợp lệ
                setFadeIn(true);
            }
        } else {
            setFadeIn(false);
        }
    }, [open])
    if (!open) return null;

    const switchMode = (newMode: "login" | "register") => {
        if (newMode === current) return;
        setAnimating(current === "login" ? "login-out" : "register-out");

        // Sau 700ms (thời gian animation), đổi mode
        setTimeout(() => {
            setCurrent(newMode);
            setAnimating(null);
            setFadeIn(false); // reset
            setTimeout(() => setFadeIn(true), 50); // trigger fade-in
        }, 700);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div className=" relative rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10
                bg-gradient-to-br from-blue-100 to-green-100">
                {/* Header */}
                <div className="flex justify-end items-center  pb-2">

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-[30px] font-bold "
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className=" mt-4 relative overflow-hidden h-[350px]">
                    {/* Login Form */}
                    {(current === "login" || animating === "login-out") && (
                        <div
                            className={`absolute inset-0 transition-all duration-700 transform
                                            ${animating === "login-out"
                                    ? "translate-y-full opacity-0" // chạy xuống và biến mất
                                    : current === "login" // nếu là trang login
                                        ? fadeIn // mờ dần
                                            ? "translate-y-0 opacity-100" // login mờ dần rồi hiện rõ
                                            : "translate-y-full opacity-0" // trạng thái ban đầu trước khi fadeIn

                                        : "translate-y-full opacity-0" // không phải login thì ẩn
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <h1 className="text-2xl font-bold font-sans text-gray-800 tracking-wide">
                                    Login
                                </h1>
                            </div>
                            <br />
                            <br />
                            <form onSubmit={handleLogin}>
                                <input name="email" type="text" placeholder="Email hoặc SĐT" className="w-full border rounded px-3 py-2 mb-3" />
                                <input name="password" type="password" placeholder="Mật khẩu" className="w-full border rounded px-3 py-2 mb-3" />
                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                                    Submit
                                </button>
                            </form>
                            <p className="mt-3 text-sm text-center">
                                Don't you have account?{" "}
                                <button onClick={() => switchMode("register")} className="text-blue-500 hover:underline">
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    )}

                    {/* Register Form */}
                    {(current === "register" || animating === "register-out") && (
                        <div
                            className={`absolute inset-0 transition-all duration-700 transform
                            ${animating === "register-out"
                                    ? "translate-y-full opacity-0" // chạy xuống và biến mất
                                    : current === "register"
                                        ? fadeIn
                                            ? "translate-y-0 opacity-100" // mờ dần rồi hiện rõ
                                            : "translate-y-full opacity-0" // ban đầu ẩn đi, chuẩn bị fadeIn
                                        : "translate-y-full opacity-0" // không phải login thì ẩn

                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <h1 className="text-2xl font-bold font-sans text-gray-800 tracking-wide">
                                    Register
                                </h1>
                            </div>
                            <br />
                            <form action="">
                                <input type="text" placeholder="Họ và tên" className="w-full border rounded px-3 py-2 mb-3" />
                                <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
                                <input type="password" placeholder="Mật khẩu" className="w-full border rounded px-3 py-2 mb-3" />
                                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
                                    Sign Up
                                </button>
                            </form>
                            <p className="mt-3 text-sm text-center">
                                Already have an account?{" "}
                                <button onClick={() => switchMode("login")} className="text-blue-500 hover:underline">
                                    Login in Now
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default ModalDaisy;
