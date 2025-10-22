import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { openModal } from "../redux/uiSlice";
import type { RootState } from "../redux/store";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children, requiredRole }: any) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirected = useRef(false); // tránh redirect lặp
    useEffect(() => {
        if (!user && !redirected.current) {
            redirected.current = true;

            // 1️⃣ Bật modal login ngay
            dispatch(openModal("login"));
            console.log("🔹 ProtectedRoute: openModal('login') dispatched");
            // 2️⃣ Chờ React commit 1 frame rồi mới redirect
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 0); // chỉ 0ms nhưng đảm bảo Redux state đã cập nhật
        } else if (
            user &&
            requiredRole &&
            !redirected.current
        ) {
            const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
            if (!roles.includes(user.role)) {
                console.log("🟠 user exists but wrong role:", user.role);
                redirected.current = true;
                navigate("/", { replace: true });
            }
        }
    }, [user, requiredRole, dispatch, navigate, location.pathname]);
    // Không render children nếu chưa đúng quyền
    // ❌ Không render children nếu chưa có user hoặc role sai
    if (
        !user ||
        (requiredRole &&
            !(
                Array.isArray(requiredRole)
                    ? requiredRole.includes(user.role)
                    : user.role === requiredRole
            ))
    ) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
