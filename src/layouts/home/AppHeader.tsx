import React from "react";
import { TopBar, Logo, SearchBar } from "../../components/header";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/uiSlice";

const AppHeader: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <div className="bg-white shadow-md w-full">
            <TopBar
                onClickLogin={() => dispatch(openModal("login"))}
                onClickRegister={() => dispatch(openModal("register"))}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-2">
                <Logo className="" />
                <SearchBar />
            </div>
        </div>
    );
};

export default AppHeader;
