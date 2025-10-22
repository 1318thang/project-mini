import React, { useState } from 'react';
import { FaBell, FaInstagram } from 'react-icons/fa';
import { MdFacebook, MdLanguage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import { authService } from '../../api/auth/authService';
import type { LogoutResponseType } from '../../type/LogoutResponseType';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { setLanguage } from '../../redux/languageSlice'; // ✅ import

interface AuthLinksProps {
    onClickLogin: (value: string) => void;
    onClickRegister: (value: string) => void;
}

const TopBar: React.FC<AuthLinksProps> = ({ onClickLogin, onClickRegister }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { lang } = useSelector((state: RootState) => state.language);
    const [openLang, setOpenLang] = useState(false);

    const handleChangeLang = (lng: string) => {
        dispatch(setLanguage(lng)); // ✅ cập nhật Redux
        setOpenLang(false);
    };

    const handleLogout = async () => {
        try {
            const res: LogoutResponseType = await authService.logout();
            if (res.success) {
                dispatch(logout());
                alert("Logout successful");
            } else {
                alert(res.message || "Logout failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error("Logout failed:", axiosError.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div className="flex justify-center md:justify-end items-center px-2 py-1 gap-4 text-xs md:text-sm relative">
            <div className='flex items-center gap-1 cursor-pointer hover:text-blue-500'>
                <h3>{lang === 'en' ? 'Notifications' : lang === 'vi' ? 'Thông báo' : '通知'}</h3>
                <FaBell className='text-base' />
            </div>

            <div className='relative'>
                <div
                    onClick={() => setOpenLang(!openLang)}
                    className='flex items-center gap-1 cursor-pointer hover:text-blue-500'
                >
                    <h3>{lang === 'en' ? 'Language' : lang === 'vi' ? 'Ngôn ngữ' : '言語'}</h3>
                    <MdLanguage />
                </div>
                {openLang && (
                    <ul className='absolute top-6 right-0 bg-white border rounded shadow-md text-sm z-50'>
                        <li onClick={() => handleChangeLang('en')} className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>English</li>
                        <li onClick={() => handleChangeLang('vi')} className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>Tiếng Việt</li>
                        <li onClick={() => handleChangeLang('ja')} className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>日本語</li>
                    </ul>
                )}
            </div>

            <div className="flex items-center gap-1">
                {!user ? (
                    <>
                        <h3><button onClick={() => onClickLogin("login")}>{lang === 'en' ? 'Login' : lang === 'vi' ? 'Đăng nhập' : 'ログイン'}</button></h3>
                        |
                        <h3><button onClick={() => onClickRegister("register")}>{lang === 'en' ? 'Register' : lang === 'vi' ? 'Đăng kí' : '登録する'}</button></h3>
                    </>
                ) : (
                    <h3><button onClick={handleLogout}>{lang === 'en' ? 'Logout' : lang === 'vi' ? 'Thoát' : 'ログアウト'}</button></h3>
                )}
            </div>

            <div className='flex items-center gap-1'>
                <MdFacebook />
                <FaInstagram />
            </div>
        </div>
    );
};

export default TopBar;
