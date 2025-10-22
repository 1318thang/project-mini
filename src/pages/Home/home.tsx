import React, { useEffect, useState, useRef } from "react";
import BannerCarousel from "../../components/home/BannerCarousel";
import PromotionSection from "../../components/home/PromotionSection";
import SectionTitle from "../../components/home/SectionTitle";
import ProductGrid from "../../components/home/ProductGrid";
import { ProRepository } from "../../api/product/productRepository";
import { getProductHome, getProductsImageRandom, setLoading } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import GroupProduct from "../../components/home/groupProduct";
import InternationalProduct from "../../components/home/InternationalProduct";
import Loading from "../../components/common/Loading";

const Home: React.FC = () => {
    const carouselImages = [
        "https://res.cloudinary.com/dzayvuc1z/image/upload/v1760975350/imageCaurosel1_1_knu1su.jpg",
        "https://res.cloudinary.com/dzayvuc1z/image/upload/v1760975335/imageCaurosel2_1_d3oihv.jpg",
        "https://res.cloudinary.com/dzayvuc1z/image/upload/v1760975747/imageCaurosel3_1_1_f7jydk.jpg"];

    const promotionImages = [
        "https://res.cloudinary.com/dzayvuc1z/image/upload/v1760976272/imagSecondary1_a13l03.jpg",
        "https://res.cloudinary.com/dzayvuc1z/image/upload/v1760976272/imageSecondary2_j48ylz.jpg"
    ];
    const dispatch = useDispatch();
    // const products = useSelector((state: RootState) => state.products.homeProducts);
    const [page, setPage] = useState(1);    // xác định trang api => IntersectionObserver kích hoạt
    const [loadingT, setLoadingT] = useState(false);    //Hiển thị loading => Trước & sau khi gọi AP
    const [error, setError] = useState("");//Lưu lỗi từ API => Khi lỗi xảy ra
    const [hasMore, setHasMore] = useState(true);  //Còn dữ liệu hay không => Khi API trả ít hơn LIMIT
    const loadMoreRef = useRef<HTMLDivElement | null>(null);// Element quan sát => Khi nó vào viewport thì gọi API
    const isFetchingRef = useRef(false); //Tránh gọi API trùng => Khi đang fetch thì không gọi nữa
    const LIMIT = 24;  //Giới hạn sản phẩm mỗi lần gọi API
    // const MAX_PRODUCTS = 26; // Giới hạn sản phẩm tối đa có thể load
    const [noData, setNoData] = useState(false); //Không có dữ liệu từ đầu => ngưng lazy load
    const { lang } = useSelector((state: RootState) => state.language);// language
    // API fetch


    const fetchProducts = async (page: number) => {
        if (isFetchingRef.current || !hasMore) return;
        isFetchingRef.current = true;

        try {
            setLoadingT(true);
            dispatch(setLoading(true));
            const data = await ProRepository.getProsHome({ page, limit: LIMIT });
            // 🔒 Nếu không có dữ liệu — chỉ chạy 1 lần và ngưng lazy load
            if (!data || data.length === 0) {
                setNoData(true);
                setHasMore(false);
                return;
            }

            if (data.length < LIMIT) setHasMore(false);
            dispatch(getProductHome({ products: data, reset: page === 1 }));
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Unknown error");
            setHasMore(false); // ⚠️ Ngắt observer luôn khi lỗi API
        } finally {
            setLoadingT(false);
            dispatch(setLoading(false));
            isFetchingRef.current = false;
        }
    };
    var fetchProductImageRandom = async () => {
        try {
            setLoadingT(true);
            var maxproduct = 21;
            const data = await ProRepository.GetProductImageRandom(maxproduct);
            console.log("random = " + data);
            dispatch(getProductsImageRandom(data));
        } catch (e: any) {

        } finally {
            setLoadingT(false);
        }
    }
    // Fetch khi page thay đổi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [latesRes, allRes] = await Promise.allSettled([
                    fetchProductImageRandom(),
                    fetchProducts(page)

                ]);
                console.log(latesRes + " - " + allRes)
            } catch (err) {
                console.error("❌ Lỗi bất ngờ:", err);
            }
        };
        fetchData();
    }, [page]);
    // IntersectionObserver
    useEffect(() => {
        // ⛔ thêm noData điều kiện ngưng observer nếu không có dữ liệu từ đầu 
        if (!loadMoreRef.current || !hasMore || noData) return;
        // Tạo observer 
        const observer = new IntersectionObserver((entries) => {
            // Khi element vào viewport và không đang fetch
            if (entries[0].isIntersecting && !isFetchingRef.current) {
                // Giới hạn số sản phẩm tối đa  
                setPage((prev) => prev + 1);
            }
        });
        // Bắt đầu quan sát
        observer.observe(loadMoreRef.current);
        // Cleanup observer khi component unmount hoặc hasMore thay đổi
        return () => observer.disconnect();
    }, [hasMore, noData]); // ⛔ thêm noData vào dependencies
    return (
        <div className="bg-[#D9D9D9] flex flex-col gap-2 py-2">
            {/* Banner */}
            <div className="flex w-full md:h-[376px] gap-1" id="banner">
                <BannerCarousel images={carouselImages} />
                <PromotionSection images={promotionImages} />
            </div>

            {/* Section title */}
            <SectionTitle text={lang === 'vi' ? 'Gợi ý hôm nay' : lang === 'en' ? 'Today’s Suggestions' : '本日のおすすめ'} />{/* // 🇯🇵 tiếng Nhật */}

            {/* Product list */}
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-[#d9d9d9] flex flex-col mx-auto md:mx-0 gap-[28px] justify-center">
                <ProductGrid />
            </div>
            {/* Loading */}
            {loadingT && <Loading />}
            {/* Sentinel */}
            {hasMore && <div ref={loadMoreRef} style={{ height: "20px" }} />}
            {!hasMore && (
                <p className="text-center text-gray-500">
                    {lang == 'vi' ? 'Không còn sản phẩm nào để hiển thị' : lang === 'en' ? 'No more products to show' : '表示する商品はありません'}. 🎉
                </p>
            )}
            <div className="text-center text-gray-500 text-[15px]  bg-white">
                <div className="py-4"><b>Essential Products</b></div>
                <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 " />
            </div>
            <GroupProduct />
            <InternationalProduct />

        </div>
    );
};

export default Home;
