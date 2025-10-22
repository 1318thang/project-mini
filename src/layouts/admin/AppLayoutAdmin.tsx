import React from "react";
import AppHeaderAdmin from "./AppHeaderAdmin";
import AppFooterAdmin from "./AppFooterAdmin";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/header";

const AppLayoutAdmin: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header chiếm toàn bộ chiều ngang */}

            <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-md">
                <AppHeaderAdmin />
            </header>

            {/* Phần còn lại chia 2 cột: sidebar và content */}
            <div className=" flex  h-screen">

                <Sidebar />


                <main className="flex-1 bg-[#d9d9d9] p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>


            {/* Footer nếu có */}
            <footer className="bg-white shadow-inner">
                <AppFooterAdmin />
            </footer>
        </div>
    );
};

export default AppLayoutAdmin;
