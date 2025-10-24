// ProductDetail.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "../../components/home/productDetails/ProductImages";
import ProductInfo from "../../components/home/productDetails/ProductInfo";
import ProductPurchase from "../../components/home/productDetails/ProductPurchase";
import ProductCarousel from "../../components/home/productDetails/ProductCarousel";
// import img3 from "../../../public/carousel3.jpg";
import {
    useDispatch,
    // useSelector 
} from "react-redux";
// import type { RootState } from "../../redux/store";
import type { productType } from "../../type/productType";
import { ProRepository } from "../../api/product/productRepository";
import {
    getId,
    // getProductHome,
    //  getProductLasted,
    setTrend
} from "../../redux/productSlice";

// const product = Array.from({ length: 21 }, (_, i) => ({
//     id: i + 1,
//     name: `Product ${i + 1}`,
//     price: 23000 + "VND",
//     img: img3,
//     rating: 4.5,
// }));

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const productdetails = async (): Promise<productType> => {
        try {
            setLoading(true);
            console.log(loading);
            const getdata = await ProRepository.getProId(Number(id));
            // dispatch slice với mảng
            // console.table(getdata);
            dispatch(getId(getdata));
            return getdata;
        } catch (e) {
            console.log(error);
            console.error(e);
            setError("Not data");
            throw new Error("Get product lated failed");
        } finally {
            setLoading(false);
        }
    };

    // Tách page cho từng carousel
    const [pageTop, setPageTop] = useState(0);
    const [pageBottom, setPageBottom] = useState(0);

    const [isMobile, setIsMobile] = useState(false);
    // const pageSize = 7;
    console.log(isMobile);
    // const totalPages = Math.ceil(product.length / pageSize);
    const fetchProductDeals = useCallback(async (key: string, max: number) => {
        try {
            const data = await ProRepository.GetProductImageRandom(max);
            console.log("random =", data);
            // dispatch(getProductsImageRandom(data));
            dispatch(setTrend({ key, data })); // ✅ Lưu dữ liệu theo key
        } catch (e) {
            console.error("Lỗi fetchProductDeals:", e);
        }
    }, [dispatch]);
    useEffect(() => {
        const fetchData = async () => {
            const [
            ] = await Promise.allSettled([
                productdetails(),
                fetchProductDeals("productTrendTop", 10),
                fetchProductDeals("productTrenBottom", 15)
                // fetchProductShoppingTrend(),
            ])
        }
        fetchData();
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);

    }, [id]);

    // const currentProductsTop = isMobile
    //     ? product
    //     : product.slice(pageTop * pageSize, pageTop * pageSize + pageSize);

    // const currentProductsBottom = isMobile
    //     ? product
    //     : product.slice(pageBottom * pageSize, pageBottom * pageSize + pageSize);

    return (
        <div className="bg-white p-2">
            <div className="grid grid-cols-3 xl:grid-cols-[539px_505px_324px] md:grid-cols-[2fr_1.5fr_1fr] gap-3 justify-center items-start">
                <ProductImages />
                <ProductInfo />
                <ProductPurchase />
            </div>

            <br />
            <div className="px-3">
                <hr className="h-1 border-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full" />
            </div>
            <br />

            {/* Carousel trên */}
            <ProductCarousel
                page={pageTop}
                setPage={setPageTop}
                trendKey="productTrendTop"
                title="You may also like"
            />

            <ProductCarousel
                page={pageBottom}
                setPage={setPageBottom}

                trendKey="productTrenBottom"
                title="Trending now"
            />

        </div>
    );
};

export default ProductDetail;
