import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setActiveItem } from "../../redux/sidebarSlice";
import { FaBox, FaTachometerAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubSidebar from "./SubSidebar";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isExpanded, activeItem } = useSelector(
        (state: RootState) => state.sidebar
    );

    const [activeParent, setActiveParent] = useState<string | null>(null);
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const ignoreNextRouteChange = useRef(false);

    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
        { key: "Infomation", label: "Item", icon: <FaBox /> },
    ];

    const handleParentClick = (item: any) => {
        dispatch(setActiveItem(item.key));
        resetInactivityTimer();
        if (item.path) {
            navigate(item.path);
            setActiveParent(null);
        } else {
            setActiveParent((prev) => (prev === item.key ? null : item.key));
        }
    };

    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            setActiveParent(null);
        }, 20000);
    };

    useEffect(() => {
        if (ignoreNextRouteChange.current) {
            ignoreNextRouteChange.current = false;
            return;
        }
        setActiveParent(null);
    }, [location.pathname]);

    useEffect(() => {
        if (activeParent) {
            resetInactivityTimer();
            const handleUserActivity = () => resetInactivityTimer();
            window.addEventListener("mousemove", handleUserActivity);
            window.addEventListener("click", handleUserActivity);
            return () => {
                window.removeEventListener("mousemove", handleUserActivity);
                window.removeEventListener("click", handleUserActivity);
                if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            };
        }
    }, [activeParent]);

    const handleNavigateFromSubSidebar = () => {
        ignoreNextRouteChange.current = true;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar cha */}
            <aside
                className={`${isExpanded ? "w-60" : "w-20"}
        bg-white shadow-md border-r h-full flex flex-col transition-all duration-300`}
            >
                <div className="flex-1 p-3 space-y-2">
                    {menuItems.map((item) => (
                        <div
                            key={item.key}
                            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all
                ${activeItem === item.key
                                    ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-600"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                            onClick={() => handleParentClick(item)}
                            title={item.label}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {isExpanded && <span>{item.label}</span>}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Sidebar con */}
            <AnimatePresence>
                {activeParent && (
                    <motion.div
                        initial={{ x: 60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 60, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SubSidebar
                            parentKey={activeParent}
                            onClose={() => setActiveParent(null)}
                            navigate={navigate}
                            onNavigateFromSubSidebar={handleNavigateFromSubSidebar}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
