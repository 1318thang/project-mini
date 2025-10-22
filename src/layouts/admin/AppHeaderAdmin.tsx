import React from 'react';
import { Logo } from '../../components/header';
import { FaBell, FaMoon } from 'react-icons/fa';
import imgAdmin from '../../../public/admin.jpg';
// import { useDispatch } from 'react-redux';

interface AdminHeaderProps {

}

const AppHeaderAdmin: React.FC<AdminHeaderProps> = () => {
    // const dispath = useDispatch();

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md ">
            {/* <button onClick={() => dispath(toggleSidebar())} className='items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border'>
                <FaBars className='text-xl ' />
            </button> */}
            <div className="flex items-center justify-between p-4 ">
                <Logo className="w-8 h-8" />
            </div>
            {/* Search */}
            <div className='flex-1 mx-4 max-w-lg'>
                <input type="text"
                    placeholder='search or type commad...'
                    className='w-full border rounded-lg px-3 py-2 focus:outline-none'
                />
            </div>
            <div className="flex items-center gap-4">
                <FaMoon className="cursor-pointer" />
                <FaBell className="cursor-pointer" />
                <img
                    src={imgAdmin}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </div >
    );
};

export default AppHeaderAdmin;