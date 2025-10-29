import {
    //  ArrowLeft, ArrowRight,
    LayoutGrid, List
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { ProRepository } from '../../api/product/productRepository';
import SearchInfo from '../../components/home/search/SearchInfo';
import { useDispatch } from 'react-redux';
import { getFilterProductsByAttributes, getSearchPro } from '../../redux/product/productSlice';
import FilterInfo from '../../components/home/search/FilterInfo';
import ListInfo from '../../components/home/search/listInfo';
const SearchResult: React.FC = () => {
    const { keyword } = useParams<{ keyword: string }>();
    console.log("keyword = " + keyword);
    const [view, setView] = useState("grid");
    const dispatch = useDispatch();
    const [quantityFind, setQuantityFind] = useState(0);
    const [filtersFromChild, setFiltersFromChild] = useState<any>(null);
    // lấy giá trị filter 
    const fetchFilterProductsByAttributes = async () => {
        try {
            const data = await ProRepository.ValueFilterProductsByAttributes(keyword!);

            dispatch(getFilterProductsByAttributes(data));
        } catch (error) {
            console.log("Not data Error!!");
        } finally {

        }
    }
    const fetchSearchResult = async () => {
        try {
            if (keyword == "undefined" && keyword == null) {
                return [];
            }
            const data = await ProRepository.searchProByName(keyword!, filtersFromChild);
            dispatch(getSearchPro(data));
            setQuantityFind(data.length)
            // console.log("data search: ", data);
            return data;
        } catch (error) {

        }
    }
    const handleFiltersChange = (filters: any) => {
        // Ở đây bạn có thể gọi API hoặc dispatch redux để lọc sản phẩm
        // setFiltersFromChild(filters.selectedOptions); // Lưu lại nếu cần sử dụng sau
        setFiltersFromChild(filters);
        console.log("Filters từ component FilterInfo  gửi lên:", filtersFromChild);

    };
    useEffect(() => {
        fetchSearchResult();
        fetchFilterProductsByAttributes();
    }, [keyword, filtersFromChild]);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] md:grid-cols-[150px_0.75fr] gap-6 px-20 py-5 ">
            < div className='hidden md:block bg-white px-2 rounded' >
                <FilterInfo keyword={keyword} onFiltersChange={handleFiltersChange} />
            </div >
            <div className='hidden md:flex flex-col  gap-2 '>
                <div className='hidden md:flex flex-row items-center  bg-white px-2 py-1 gap-4 rounded'>
                    <div className=''>
                        <p><b>title: {keyword}</b></p>
                        <p>Find quantity({quantityFind}) product of "{keyword} (Show remaining quantity)"</p>
                    </div>
                    <div className='flex flex-row items-center ml-auto mr-2 '>
                        <p>Sort by: </p>
                        <input type="text" className='bg-gray-100 rounded' />
                    </div>
                    <div className='flex flex-row items-center'>
                        <p>View</p>
                        <LayoutGrid
                            className={`cursor-pointer ${view === "grid" ? "text-black" : "text-gray-400"}`}
                            onClick={() => setView("grid")}
                        />
                        <List
                            className={`cursor-pointer ${view === "list" ? "text-black" : "text-gray-400"}`}
                            onClick={() => setView("list")}
                        />
                    </div>
                </div>
                <div className={`grid gap-2 bg-white ${view === "grid" ? "grid-cols-4" : "grid-cols-1"
                    }`}>
                    {/* product list */}
                    {view === "grid" && <SearchInfo />}
                    {view === "list" && <ListInfo />}
                </div>
            </div>
            <div className='block md:hidden'>
                <ListInfo />
            </div>

        </div >

    );
};

export default SearchResult;