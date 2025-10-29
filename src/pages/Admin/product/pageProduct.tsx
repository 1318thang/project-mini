import React, { useEffect, useState } from 'react';
import ProductTable from '../../../components/admin/product/productTable';
import ProductForm from '../../../components/admin/product/productForm';
import ProductFilter from '../../../components/admin/product/productFilter';
import { useDispatch } from 'react-redux';
import type { productType } from '../../../type/product/productType';
import { ProRepository } from '../../../api/product/productRepository';
import { createProduct, getAllProducts, getProductLasted } from '../../../redux/product/productSlice';
import { signalRService } from '../../../api/signalR/signalRService';
interface Props {

}

const PageProduct: React.FC<Props> = () => {
    const [activeTab, setActiveTab] = useState<'table' | 'form' | 'filter'>('table');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const [product, setProduct] = useState<productType[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>(""); // group hiện tại
    console.log(product.toString + "" + loading + "" + error);
    const productAll = async (): Promise<productType[]> => {
        try {
            setLoading(true);
            const data = await ProRepository.getProsAll();
            // console.log("productAll: ", data);
            dispatch(getAllProducts(data));
            setProduct(data);
            return data;
        } catch (e) {
            console.error(e);
            setError("Not data");
            // throw new Error("Get product lated failed");
            return [];
        } finally {
            setLoading(false);
            setError("Not data");
            throw new Error("Get product All failed");
        }
    }
    const productLates = async (): Promise<productType[]> => {
        try {
            setLoading(true);
            const getdata = await ProRepository.getProsLate();
            // dispatch slice với mảng
            // console.log("productLates : ", getdata);
            dispatch(getProductLasted(getdata));
            return getdata;
        } catch (e) {
            console.error(e);
            setError("Not data");
            throw new Error("Get product lated failed");
        } finally {
            setLoading(false);
        }
    };
    const createPro = async (newPro: FormData) => {
        try {
            setLoading(true);
            const data = await ProRepository.createPro(newPro);
            dispatch(createProduct(data));
            setProduct(prev => [...prev, data]);
            // 🔹 Join group nếu category thay đổi
            const category = newPro.get("category") as string;
            if (currentCategory !== category) {
                if (currentCategory) signalRService.leaveGroup(currentCategory);
                signalRService.joinGroup(category);
                setCurrentCategory(category);
            }
        } catch (e) {
            setError("Did not create data");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        let isMounted = true;
        const handleReceiveProduct = (newProduct: productType) => {
            console.log("hello word");
            if (!isMounted) return;
            console.log("📩 Nhận sản phẩm mới:", newProduct);
            setProduct(prev => [...prev, newProduct]);
            dispatch(createProduct(newProduct));
        };
        const init = async () => {
            try {
                // console.log("🚀 Khởi tạo SignalR và tải dữ liệu...");
                // 1️⃣ Kết nối SignalR
                await signalRService.start();
                // 2️⃣ Đăng ký listener
                signalRService.on("ReviceProduct", handleReceiveProduct);
                // 3️⃣ Gọi 2 API song song
                const [latesRes, allRes] = await Promise.allSettled([
                    productLates(),
                    productAll()
                ]);
                if (!isMounted) return;

                if (latesRes.status === "fulfilled") {
                    console.log("🆕 Dữ liệu sản phẩm mới nhất:", latesRes.value);
                }
                if (allRes.status === "fulfilled") {
                    console.log("📦 Dữ liệu toàn bộ sản phẩm:", allRes.value);
                    setProduct(allRes.value);
                }
                console.log("✅ Hoàn tất khởi tạo dữ liệu & kết nối SignalR");
            } catch (error) {
                console.error("❌ Lỗi khi khởi tạo dữ liệu:", error);
            }
        };
        init();
        // 4️⃣ Cleanup — tránh leak kết nối và state
        return () => {
            // console.log("🧹 Cleanup SignalR và listener...");
            isMounted = false;
            signalRService.off("ReviceProduct", handleReceiveProduct);
            signalRService.stop();
        };
    }, []);
    const renderContent = () => {
        switch (activeTab) {
            case 'table':
                return <ProductTable />;
            case 'form':
                return <ProductForm onCreate={createPro} />;
            case 'filter':
                return <ProductFilter />;
            default:
                return null;
        }
    }
    const tabs = [
        { key: "table", label: "Table" },
        { key: "form", label: "Form" },
        { key: "filter", label: "Filter" },
    ];
    return (
        <div className="w-full">
            <div className="flex gap-2 mb-6 px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as "table" | "form" | "filter")}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium 
        ${activeTab === tab.key
                                ? "bg-gray-800 text-white shadow"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="  p-4 ">
                {/* {loading && <p>Đang tải dữ liệu...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && renderContent()} */}

                {renderContent()}

            </div>
        </div>
    );
};
export default PageProduct;