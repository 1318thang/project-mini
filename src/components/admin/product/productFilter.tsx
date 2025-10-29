import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import type { productType } from "../../../type/productType";
import { FileText } from "lucide-react";
import Modal from "../../common/modal";
import { signalRService } from "../../../api/signalR/signalRService";
import { createProduct } from "../../../redux/product/productSlice";
import ShowImages from "./Modal/ShowImages";
import ProductEditInfoModal from "./Modal/ProductEditInfoModal";
import ProductEditModal from "./Modal/ProductEditModal";
import { ProRepository } from "../../../api/product/productRepository";
interface FilterValues {
    name: string;
    category: string;
    minStock?: number;
    maxStock?: number;
    minPrice?: number;
    maxPrice?: number;
    startDate?: string;
    endDate?: string;
    status: string;
}

const ProductFilter: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        name: "",
        category: "",
        minStock: undefined,
        maxStock: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        startDate: "",
        endDate: "",
        status: "",
    });

    const products = useSelector((state: RootState) => state.products.products);
    // console.log("Main Image 23123" + products.map(p => p.mainImage));
    const dispatch = useDispatch();
    // 🖼️ State cho modal xem ảnh phụ
    const [showImages, setShowImages] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [editingInfo, setEditingInfo] = useState<any | null>(null);

    // 🔹 Kết nối SignalR và realtime update
    // Chạy 1 lần khi mount
    useEffect(() => {
        signalRService.start();

        const handleNewProduct = (product: productType) => {
            console.log("📦 New Product:", product);
            dispatch(createProduct(product));
        };

        signalRService.on("ReviceProduct", handleNewProduct);

        return () => {
            signalRService.off("ReviceProduct", handleNewProduct);
        };
    }, [dispatch]);

    // Riêng join/leave group
    useEffect(() => {
        if (filters.category) {
            signalRService.joinGroup(filters.category);
        }
        return () => {
            if (filters.category) {
                signalRService.leaveGroup(filters.category);
            }
        };
    }, [filters.category]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value === "" ? undefined : value, // tránh chuỗi rỗng cho số
        }));
    };
    const handleApply = () => {
        // console.log("Apply Filter:", filters);
        setCurrentPage(1); // reset về trang đầu khi filter
    };
    const handleReset = () => {
        setFilters({
            name: "",
            category: "",
            minStock: undefined,
            maxStock: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            startDate: "",
            endDate: "",
            status: "",
        });
        setCurrentPage(1);
    };
    //------------------------ Update Product Info Modal -----------------
    const [product, setProduct] = useState<productType[]>([]);

    const handleSaveUpdate = async (updatedProduct: productType) => {
        try {
            const res = await ProRepository.updatePro(updatedProduct.id, updatedProduct);
            setProduct(prev =>
                prev.map(p => (p.id === res.id ? res : p))
            );
            console.log(product)
            alert("Cập nhật sản phẩm thành công!");
            setEditingInfo(false);
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại, vui lòng thử lại!");
        }
    };


    //------------------------ Lọc dữ liệu -----------------
    const filteredProducts = products.filter((p) => {
        if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
        if (filters.category && p.categoryName !== filters.category) return false;
        if (filters.minPrice && p.price < filters.minPrice) return false;
        if (filters.maxPrice && p.price > filters.maxPrice) return false;
        if (filters.minStock && p.stock < filters.minStock) return false;
        if (filters.maxStock && p.stock > filters.maxStock) return false;
        if (filters.startDate && new Date(p.created_at) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(p.created_at) > new Date(filters.endDate)) return false;
        return true;
    });

    //------------------------ Phân trang -----------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    //------------------------ Phân trang -----------------

    const [selectedProduct, setSelectedProduct] = useState<productType | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (product: productType) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };
    const openImageModal = (images: string[]) => {
        setSelectedImages(images);
        setShowImages(true);
    };
    return (
        <div className="p-4 bg-white rounded shadow flex flex-col gap-4  overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-300 flex justify-between items-center">
                <h3 className="font-bold mb-4">Product Filter (Realtime)</h3>
                <p className="text-sm text-gray-500">Tổng: {products.length} sản phẩm</p>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Secondary Image</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Stock</th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th className="px-4 py-3 font-medium">Created</th>
                            <th className="px-4 py-3 font-medium">Updated</th>
                            <th className="px-4 py-3 font-medium">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((p) => (
                            <tr className="border-b hover:bg-gray-50 transition" key={p.id}>
                                <td className="flex items-center gap-3 px-4 py-3">
                                    <img
                                        src={p.mainImage}
                                        alt="Product"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 line-clamp-2 md:line-clamp-none">{p.name}</p>
                                        <p className="text-sm text-gray-500">{p.categoryName}</p>
                                    </div>
                                </td>
                                {/* Ảnh phụ */}
                                <td className="px-4 py-3">
                                    <div className="flex gap-2 items-center">
                                        {p.subImages?.slice(0, 1).map((img: string, i: number) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`sub-${i}`}
                                                className="w-10 h-10 rounded object-cover border"
                                            />
                                        ))}
                                        {p.subImages && p.subImages.length > 1 && (
                                            <button
                                                onClick={() => openImageModal(p.subImages)} // mở modal xem tất cả
                                                className="w-10 h-10 flex items-center justify-center text-xs text-gray-600 border rounded hover:bg-gray-100"
                                            >
                                                +{p.subImages.length - 1}
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-700">${p.price}</td>
                                <td className="px-4 py-3 text-gray-700">{p.stock}</td>
                                {/* decription */}
                                <td className="px-4 py-3 text-gray-700">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="p-2 rounded hover:bg-gray-100"
                                    >
                                        <FileText className="w-5 h-5 text-gray-600" />
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {p.created_at
                                        ? new Date(p.created_at).toLocaleDateString("vi-VN")
                                        : ""}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {p.update_at
                                        ? new Date(p.update_at).toLocaleDateString("vi-VN")
                                        : ""}
                                </td>
                                {/* Hành động */}
                                <td className=" ">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingProduct(p)} // chỉnh ảnh
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                        >
                                            Edit Images
                                        </button>

                                        <button
                                            onClick={() => setEditingInfo(p)} // chỉnh thông tin
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                        >
                                            Edit Info
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedProduct?.name}
            >
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: selectedProduct?.description || "",
                    }}
                />
            </Modal>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Bộ lọc */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="border p-2 rounded"
                />
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Category</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Sport">Sport</option>
                </select>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice ?? ""}
                    onChange={handleChange}
                    placeholder="Min Price"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice ?? ""}
                    onChange={handleChange}
                    placeholder="Max Price"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="minStock"
                    value={filters.minStock ?? ""}
                    onChange={handleChange}
                    placeholder="Min Stock"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="maxStock"
                    value={filters.maxStock ?? ""}
                    onChange={handleChange}
                    placeholder="Max Stock"
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleApply}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Apply Filter
                </button>
                <button
                    onClick={handleReset}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Reset Filter
                </button>
            </div>
            {/* Modal chỉnh sửa */}
            {editingProduct && (
                <ProductEditModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(updated) => {
                        console.log("Save:", updated);
                        setEditingProduct(null);
                    }}
                />
            )}
            {editingInfo && (
                <ProductEditInfoModal
                    product={editingInfo}
                    onClose={() => setEditingInfo(null)}
                    onSave={handleSaveUpdate} // dùng hàm chung handleSave
                />
            )}
            {showImages && (
                <ShowImages
                    setShowImages={setShowImages}
                    selectedImages={selectedImages}
                />
            )}
        </div>
    );
};

export default ProductFilter;
