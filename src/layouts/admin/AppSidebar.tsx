import React from 'react';
// import { FaChartBar, FaTable, FaUser } from 'react-icons/fa';

interface Props {

}

const AppSidebar: React.FC<Props> = () => {
    return (
        <div></div>
        // <aside
        //     className={`bg-blue-700 text-white w-64 p-4 h-screen fixed top-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        //         } transition-transform duration-300 md:translate-x-0`}
        // >
        //     <h1 className="text-2xl font-bold mb-6">TailAdmin</h1>
        //     <nav>
        //         <a href="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-blue-600">
        //             <FaChartBar /> Dashboard
        //         </a>
        //         <a href="/users" className="flex items-center gap-2 p-2 rounded hover:bg-blue-600">
        //             <FaUser /> Users
        //         </a>
        //         <a href="/tables" className="flex items-center gap-2 p-2 rounded hover:bg-blue-600">
        //             <FaTable /> Tables
        //         </a>
        //     </nav>
        // </aside>
    );
};

export default AppSidebar;