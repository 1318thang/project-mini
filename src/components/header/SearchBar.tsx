import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface Props {

}

const SearchBar: React.FC<Props> = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Điều hướng đến trang search có keyword
        navigate(`#/${encodeURIComponent(query.trim())}`);
        setQuery(""); // clear input nếu muốn
    };
    return (
        <div className="flex w-full items-stretch ml-4">
            <form
                onSubmit={handleSearch}
                className="flex w-full items-stretch rounded-md focus-within:ring-2 focus:ring-2 focus:ring-blue-400">
                <input
                    type="text"

                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-[#F6F4F4] hover:bg-[#F3F3F3] rounded-l-md px-3 py-2 focus:outline-none"
                    placeholder="tìm kiếm thông tin..."
                />
                <button type='submit' className="bg-[#F6F4F4] hover:bg-[#F3F3F3] text-gray-300 px-3 py-2 rounded-r-md transition-colors">
                    <FaSearch className="text-[20px]" />
                </button>
            </form>
            <button className="hidden md:block px-3 md:ml-4 text-gray-400 hover:text-gray-500 transition-colors">
                <a href='#/cart'>
                    <FaCartShopping className="text-[22px]" />1
                </a>
            </button>
        </div>
    );
};

export default SearchBar;