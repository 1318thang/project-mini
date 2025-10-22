import React from "react";
import { FaChevronLeft } from "react-icons/fa";

interface SubSidebarProps {
    parentKey: string;
    onClose: () => void;
    navigate: (path: string) => void;
    onNavigateFromSubSidebar?: () => void; // ✅ thêm prop mới
}

const SubSidebar: React.FC<SubSidebarProps> = ({
    parentKey,
    onClose,
    navigate,
    onNavigateFromSubSidebar,
}) => {
    const subMenuMap: Record<string, { label: string; path: string }[]> = {
        Infomation: [
            { label: "Product", path: "/product" },
            { label: "Color", path: "/colorPro" },
            { label: "Size", path: "/sizePro" },
        ],
        dashboard: [{ label: "digram", path: "/dashboard" }],
    };

    const subMenus = subMenuMap[parentKey] || [];
    const handleSubItemClick = (path: string) => {
        // ✅ Báo cho Sidebar biết: “đây là click từ SubSidebar”
        if (onNavigateFromSubSidebar) onNavigateFromSubSidebar();

        // ✅ Điều hướng tới trang con
        navigate(path);

        // ❌ KHÔNG đóng ngay lập tức
        // Nếu bạn vẫn muốn sidebar con đóng sau khi navigate xong, có thể thêm:
        // setTimeout(onClose, 300);
    };
    return (
        <aside className="w-40 md:w-60 bg-gray-50 border-l h-screen p-4 shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700 capitalize">{parentKey}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <FaChevronLeft />
                </button>
            </div>

            <ul className="space-y-2">
                {subMenus.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 rounded-md hover:bg-blue-100 cursor-pointer text-gray-700"
                        // onClick={() => {
                        //     // onClose(); // đóng ngay lập tức
                        //     setTimeout(() => navigate(item.path), 100);
                        // }}
                        onClick={() => handleSubItemClick(item.path)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SubSidebar;
