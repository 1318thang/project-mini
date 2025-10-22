import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
    Link,
    // useNavigate
} from "react-router-dom";

interface Props {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    trendKey: string;
    title: string;
    pageSize?: number; // ✅ thêm nếu muốn linh hoạt
}

const ProductCarousel: React.FC<Props> = ({ page, setPage, trendKey, title, pageSize = 6 }) => {
    // const navigate = useNavigate()
    const producttrend = useSelector(
        (state: RootState) => state.products.trends[trendKey] || []
    );

    // ✅ Tự động tính số trang theo số lượng sản phẩm thật
    const totalPages = Math.ceil(producttrend.length / pageSize);

    // ✅ Lấy sản phẩm hiển thị theo từng trang
    const visibleProducts = producttrend.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div id="product" className="relative px-5">
            <div>
                <h1><b>{title}</b></h1>
                <div className="flex justify-end items-center">
                    <span className="mr-2">
                        Page <span>{page + 1}</span> of <span>{totalPages}</span>
                    </span>
                    <span>| <a href="./">Start over</a></span>
                </div>
            </div>

            {/* Nút trái */}
            <div className="hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    disabled={page === 0}
                >
                    <ArrowLeft className="w-8 h-8 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow cursor-pointer" />
                </button>
            </div>

            {/* Hiển thị sản phẩm */}
            <div className="overflow-hidden">
                <ul className="flex gap-3 w-max justify-start mx-auto">
                    {visibleProducts.map((p) => (
                        <li key={p.id} className="w-[165px]">
                            <span className="flex flex-col gap-2">
                                <a href="/productdetails/">
                                    <img src={p.mainImage} alt="" className="w-full h-[165px] object-cover" />
                                </a>
                                {/* onClick={() => navigate(`/productdetail/${item.id}`)} // ✅ chuyển trang */}
                                <div className="flex flex-col gap-3">
                                    <Link to={`/productdetail/${p.id}`}>
                                        {p.name}
                                    </Link>
                                    <div className="flex flex-row">
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStar className="text-yellow-400" />
                                        <FaStarHalfAlt className="text-yellow-400" />
                                    </div>
                                    <h2><b>${p.price}</b></h2>
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Nút phải */}
            <div className="hidden xl:block absolute right-2 top-1/2 -translate-y-1/2 z-10">
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    <ArrowRight className="w-8 h-8 p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;
