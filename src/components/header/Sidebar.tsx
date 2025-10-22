import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setActiveItem } from "../../redux/sidebarSlice";
import { FaBox, FaTachometerAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubSidebar from "./SubSidebar";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isExpanded, activeItem } = useSelector(
        (state: RootState) => state.sidebar
    );
    const [activeParent, setActiveParent] = useState<string | null>(null);
    // ✅ Bộ đếm thời gian theo dõi hành vi người dùng
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const ignoreNextRouteChange = useRef(false); // ✅ cờ kiểm soát việc đóng sidebar
    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
        { key: "Infomation", label: "Item", icon: <FaBox /> },
    ];

    const handleParentClick = (item: any) => {
        dispatch(setActiveItem(item.key));
        // Khi người dùng click → reset lại timer
        resetInactivityTimer();
        if (item.path) {
            navigate(item.path);
            setActiveParent(null);
        } else {
            setActiveParent((prev) => (prev === item.key ? null : item.key));
        }
    };
    // ✅ Reset hoặc khởi tạo lại bộ đếm 20 giây
    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

        inactivityTimer.current = setTimeout(() => {
            setActiveParent(null); // 🔥 Auto đóng sidebar con sau 20 giây
        }, 20000); // 20 giây
    };
    // 🔥 Đảm bảo sidebar con đóng khi đổi route
    useEffect(() => {
        if (ignoreNextRouteChange.current) {
            ignoreNextRouteChange.current = false; // bỏ qua lần đổi route này
            return;
        }
        setActiveParent(null);
    }, [location.pathname]);
    // ✅ Theo dõi hành vi người dùng (di chuột hoặc click)
    useEffect(() => {
        if (activeParent) {
            resetInactivityTimer();

            const handleUserActivity = () => resetInactivityTimer();

            // Theo dõi hành vi trong toàn sidebar
            window.addEventListener("mousemove", handleUserActivity);
            window.addEventListener("click", handleUserActivity);

            return () => {
                window.removeEventListener("mousemove", handleUserActivity);
                window.removeEventListener("click", handleUserActivity);
                if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            };
        }
    }, [activeParent]);


    // ✅ Callback nhận tín hiệu từ SubSidebar
    const handleNavigateFromSubSidebar = () => {
        ignoreNextRouteChange.current = true;
    };
    return (

        <div className="flex">
            <aside
                className={`${isExpanded ? "w-14 text-[10px] md:w-34 md:text-[15px]" : "w-15"
                    } bg-white shadow-md h-screen transition-all duration-300 flex flex-col border-r`}
            >
                <nav className="flex-1 p-2 space-y-1">
                    {menuItems.map((item) => (
                        <div
                            key={item.key}
                            className={`flex flex-col items-center gap-3 p-2 rounded-md cursor-pointer transition
                    ${activeItem === item.key
                                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                            onClick={() => handleParentClick(item)}
                        >
                            {item.icon}
                            {isExpanded && <span className="font-medium">{item.label}</span>}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Sidebar con */}
            {activeParent && (
                <SubSidebar
                    parentKey={activeParent}
                    onClose={() => setActiveParent(null)}
                    navigate={navigate}
                    onNavigateFromSubSidebar={handleNavigateFromSubSidebar} // ✅ truyền thêm prop này
                />
            )}
        </div>


    );
};

export default Sidebar;
