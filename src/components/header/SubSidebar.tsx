import React from "react";
import { FaChevronLeft } from "react-icons/fa";

interface SubSidebarProps {
    parentKey: string;
    onClose: () => void;
    navigate: (path: string) => void;
    onNavigateFromSubSidebar?: () => void;
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
        dashboard: [{ label: "Overview", path: "/dashboard" }],
    };

    const subMenus = subMenuMap[parentKey] || [];

    const handleSubItemClick = (path: string) => {
        if (onNavigateFromSubSidebar) onNavigateFromSubSidebar();
        navigate(path);
    };

    return (
        <aside className="w-56 md:w-64 bg-gray-50 border-l h-full p-5 shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-700 text-lg capitalize">
                    {parentKey}
                </h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-blue-600 transition"
                >
                    <FaChevronLeft />
                </button>
            </div>

            <ul className="space-y-2">
                {subMenus.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 rounded-lg hover:bg-blue-100 cursor-pointer text-gray-700 hover:text-blue-700 transition"
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
