import React, { useState, useEffect } from "react";
import type { LoginResponseType } from "../../type/auth/LoginResponseType";
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
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState("");

    // ✅ Hàm đánh giá độ mạnh của mật khẩu
    const checkPasswordStrength = (pwd: string) => {
        let score = 0;
        if (!pwd) return 0;

        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        // score tối đa là 5
        setPasswordStrength(score);

        if (score <= 2) setPasswordStatus("Yếu 😓");
        else if (score === 3 || score === 4) setPasswordStatus("Trung bình 🙂");
        else if (score === 5) setPasswordStatus("Mạnh 💪");
    };
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
                status: "succeeded",
                message: "Login successful"
            }));     // ✅ lưu vào Redux luôn
            // 🔹 Redirect trước

            var userString = localStorage.getItem("user");
            if (userString) {
                // const user = JSON.parse(userString); // chuyển lại thành object
            }
            if (res.user.Role != null) {
                const userRole = res.user.Role;
                if (userRole === "Admin") navigate("/dashboard");
                else navigate("#/");
                // 🔹 Đóng modal với delay animation (nếu muốn)
                setTimeout(() => onClose(), 300); // 300ms tương ứng duration transiti
            }

        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ✅ Kiểm tra mật khẩu đủ mạnh chưa
        if (passwordStrength < 4) {
            alert("Mật khẩu chưa đủ mạnh! Vui lòng thêm chữ hoa, số hoặc ký tự đặc biệt.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
            const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
            console.log("đang chờ phản hồi ...");
            const res = await authService.register({ name, email, password });
            console.log("📦 Response from backend:", res); // 👈 kiểm tra ở đây

            if (res.success) {
                alert("Register successful! You can now login.");
                switchMode("login");
            } else {
                alert("Register fail! You try again.");
                setError(res.message || "Register failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };
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
                            <form onSubmit={handleRegister}>
                                <input type="text" name="name" placeholder="Họ và tên"
                                    className="w-full border rounded px-3 py-2 mb-3" />
                                <input type="email" name="email" placeholder="Email"
                                    className="w-full border rounded px-3 py-2 mb-3" />

                                {/* ✅ Input password + Strength bar */}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    className="w-full border rounded px-3 py-2 mb-1"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                />

                                {/* Thanh trạng thái */}
                                <div className="h-2 w-full bg-gray-200 rounded mb-2">
                                    <div
                                        className={`h-full rounded transition-all duration-300 
                                ${passwordStrength <= 2
                                                ? "bg-red-500 w-1/4"
                                                : passwordStrength === 3
                                                    ? "bg-yellow-500 w-2/4"
                                                    : passwordStrength === 4
                                                        ? "bg-blue-500 w-3/4"
                                                        : "bg-green-500 w-full"
                                            }`}
                                    ></div>
                                </div>

                                {/* Text trạng thái */}
                                <p className={`text-sm mb-3 ${passwordStrength <= 2 ? "text-red-600" : passwordStrength === 3 ? "text-yellow-600" : "text-green-600"}`}>
                                    {password ? `Độ mạnh: ${passwordStatus}` : ""}
                                </p>

                                {/* ✅ Disable nút nếu mật khẩu yếu */}
                                <button
                                    className={`w-full py-2 rounded text-white transition-all duration-300 
                            ${passwordStrength < 4
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600"
                                        }`}
                                    type="submit"
                                    disabled={passwordStrength < 4 || loading}
                                >
                                    {loading ? "Registering..." : "Sign Up"}
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
