import React from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { Outlet } from 'react-router-dom';

interface Props {

}

const AppLayout: React.FC<Props> = () => {
    return (
        <div className='flex flex-col min-h-screen '>
            {/* // <div className='scale-90 sm:scale-100 origin-top p-4'> */}
            <header className='fixed top-0 left-0 w-full z-50 bg-white shadow-md  '>
                <AppHeader />
            </header>
            <main className='flex-1 w-full  bg-[#d9d9d9] pt-[130px] md:pt-[95px]'>
                <Outlet /> {/* //home */}
            </main>
            <footer className='w-full mt-auto'>
                <AppFooter />
            </footer>

        </div>

    );
};

export default AppLayout;