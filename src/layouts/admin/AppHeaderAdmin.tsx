import React from 'react';
import { Logo } from '../../components/header';
import { FaBell, FaMoon } from 'react-icons/fa';
import imgAdmin from '../../../public/admin.jpg';
const AppHeaderAdmin: React.FC = () => {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md ">
            <div className="flex items-center justify-between p-4 ">
                <Logo className="w-8 h-8" />
            </div>
            {/* Search */}
            <div className='flex-1 mx-4 max-w-lg'>
                <input type="text" placeholder='search or type commad...' className='w-full border rounded-lg px-3 py-2 focus:outline-none' />
            </div>
            <div className="flex items-center gap-4">
                <FaMoon className="cursor-pointer" />
                <FaBell className="cursor-pointer" />
                <img src={imgAdmin} alt="profile" className="w-8 h-8 rounded-full" />
            </div>
        </div >
    );
};
export default AppHeaderAdmin;