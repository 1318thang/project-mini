import React from 'react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import zaloIcon from '../../../public/iconZalo.png';

interface Props {

}

const AppFooter: React.FC<Props> = () => {
    return (
        <div className=' grid grid-cols-[55%_45%] bg-[#f5f5f5] shadow-md  px-2 py-1 text-[5px] sm:text-[11px] lg:text-[15px]'>
            <div className='flex md:flex-row  px-4  '>
                <ul className="py-4 md:p-4 px-1">
                    <li><h2><b>COMPANY INFO</b></h2></li>
                    <li><b>About HBO</b></li>
                    <li><b>Product Blogger</b></li>
                    <li><b>Careers</b></li>
                </ul>
                <ul className="py-4 md:p-4 px-1 md:ml-6">
                    <li><h2><b>HELP & SUPPORT</b></h2></li>
                    <li><b>Shipping Info</b></li>
                    <li><b>Returns</b></li>
                    <li><b>Refund</b></li>
                    <li><b>How to order</b></li>
                    <li><b>How to track</b></li>
                    <li><b>Size Guide</b></li>
                    <li className='whitespace-nowrap'><b>Social Responesility</b></li>
                    <li><b>HBO VIP</b></li>
                </ul>
                <ul className="py-4 md:p-4 ">
                    <li><h2><b>CUSTOMER CARE</b></h2></li>
                    <li><b>Contact us</b></li>
                    <li><b>Payment Method</b></li>
                    <li><b>Bonus Point</b></li>
                </ul>
            </div>
            <div className='px-4  '>
                <div id="title" className='py-4'>
                    <h1><b>FIND US ON</b></h1>
                    <div className="flex items-center gap-2 ">
                        <FaFacebook className="w-[25.58px] h-[25.58px]" />
                        <FaInstagram className="w-[25.58px] h-[25.58px]" />
                        <FaTiktok className="w-[25.58px] h-[25.58px]" />
                        <img src={zaloIcon} alt="Zalo" className="w-[25.58px] h-[25.58px]" />
                    </div>
                </div>
                <div id="find" className="hidden md:block">
                    <h1><b>SIGN UP FOR HBO STYPE NEWS</b></h1>
                    <form className="bg-white flex w-full max-w-lg items-center rounded-md overflow-hidden border border-black">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 outline-none  "
                            placeholder="tìm kiếm...."
                        />
                        <button
                            type="submit"
                            className="bg-black px-4 py-2  text-white   "
                        >
                            Subscribe
                        </button>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default AppFooter;