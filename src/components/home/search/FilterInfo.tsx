import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
// import { filtersByCategory } from '../../../config/filtersConfig';
// import { useLocation, useNavigate } from 'react-router-dom';
interface Props {
    keyword: string | undefined;
    onFiltersChange?: (filters: any) => void;
}
const FilterInfo: React.FC<Props> = ({ keyword, onFiltersChange }) => {
    console.log(keyword)
    // const products = useSelector((state: RootState) => state.products.resultSearch);
    const ValuesAtributes = useSelector((state: RootState) => state.products.FilterProductsByAttributes);
    const [filtersState, setFiltersState] = useState({
        price: 2800,
        priceRange: { min: 3, max: 2800 },
        selectedOptions: {} as Record<string, string[]>,
    });
    const [showAllStates, setShowAllStates] = useState<Record<string, boolean>>({});
    const toggleShowAll = (name: string) => {
        setShowAllStates(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };
    const handleCheckboxChange = (title: string, option: string) => {
        setFiltersState(prev => {
            const prevOptions = prev.selectedOptions[title] || [];
            if (prevOptions.includes(option)) {
                // Bỏ tick
                return {
                    ...prev,
                    selectedOptions: {
                        ...prev.selectedOptions,
                        [title]: prevOptions.filter(o => o !== option)
                    }
                };
            } else {
                // Thêm tick
                return {
                    ...prev,
                    selectedOptions: {
                        ...prev.selectedOptions,
                        [title]: [...prevOptions, option]
                    }
                };
            }
        });
    };

    // ✅ Khi kéo input range
    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value);
        setFiltersState((prev) => ({
            ...prev,
            priceRange: { ...prev.priceRange, max: newMax }, // ✅ cập nhật đúng field
        }));
    };
    // ✅ Khi nhấn nút Go
    const handleApplyPriceFilter = () => {
        if (onFiltersChange) {
            onFiltersChange(filtersState); // Gửi toàn bộ filters lên cha
        }
    };
    // ✅ Khi click vào các link “a”
    const handleClickPriceRange = (min: number, max: number | null) => {
        setFiltersState((prev) => ({
            ...prev,
            priceRange: { min, max: max ?? 999999 }, // nếu null → "above"
        }));
    };
    useEffect(() => {
        console.log("Các filter hiện tại:", filtersState.selectedOptions);
        if (onFiltersChange) {
            onFiltersChange(filtersState); // 🔹 Gửi toàn bộ state lên cha
        }
    }, [filtersState.selectedOptions, filtersState.priceRange]);
    return (
        <>
            <h4>Recently use filter</h4>
            <p>All Discount</p>
            <br />
            <div className='px-2 '>
                <hr />
            </div>
            <br />
            <p><b>Price</b></p>
            <p><b>${filtersState.priceRange.min} - ${filtersState.priceRange.max}</b></p>
            {/* thanh slider */}
            <div className='flex flex-row justify-center items-center gap-2'>
                <input
                    type="range"
                    min={3}
                    max={2800}
                    value={filtersState.priceRange.max}
                    onChange={handlePriceRangeChange}  // <-- Gọi hàm ở trên
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                />
                <button onClick={handleApplyPriceFilter} className='border rounded-full px-3'>Go</button>
            </div>
            <div className='py-1'>
                <p><a onClick={() => handleClickPriceRange(3, 45)}>Up to $45</a></p>
                <p><a onClick={() => handleClickPriceRange(45, 90)}>$45 to $90</a></p>
                <p><a onClick={() => handleClickPriceRange(90, 150)}>$90 to $150</a></p>
                <p><a onClick={() => handleClickPriceRange(150, 200)}>$150 to $200</a></p>
                <p><a onClick={() => handleClickPriceRange(200, null)}>$200 to above</a></p>
            </div>
            <div className='py-2'>
                <p><b>Customer Reviews</b></p>
                <div className="flex flex-row">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStarHalfAlt className="text-yellow-500" />
                </div>
            </div>
            {Object.entries(
                ValuesAtributes.reduce((acc, item) => {
                    const key = item.attributeName;
                    if (!acc[key]) acc[key] = [];
                    if (!acc[key].includes(item.attributeValue)) {
                        acc[key].push(item.attributeValue);
                    }
                    return acc;
                }, {} as Record<string, string[]>)
            ).map(([name, values]) => {
                const showAll = showAllStates[name] || false;
                const displayedValues = showAll ? values : values.slice(0, 5);
                return (
                    <div key={name} className="py-2">
                        <p><b>{name}</b></p>

                        {displayedValues.map((val) => (
                            <div key={val}>
                                <input
                                    type="checkbox"
                                    checked={filtersState.selectedOptions[name]?.includes(val) || false}
                                    onChange={() => handleCheckboxChange(name, val)}
                                />
                                <label className="px-2">{val}</label>
                            </div>
                        ))}

                        {values.length > 5 && (
                            <button
                                className="text-blue-600 text-sm mt-1 hover:underline font-semibold"
                                onClick={() => toggleShowAll(name)}
                            >
                                {showAll ? "See less" : "See more"}
                            </button>
                        )}
                    </div>
                );
            })}
        </>
    );
};
export default FilterInfo;