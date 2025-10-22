import React, { useState } from "react";
interface ProductEditInfoModalProps {
    product: any;
    onClose: () => void;
    onSave: (updatedProduct: any) => void;
}

const ProductEditInfoModal: React.FC<ProductEditInfoModalProps> = ({
    product,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: product.name || "",
        price: product.price || 0,
        stock: product.stock || 0,
        category: product.category || "",
        description: product.description || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Trả dữ liệu mới ra ngoài
        onSave({ ...product, ...formData });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
                <div className="border-b px-5 py-3 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Chỉnh sửa thông tin</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giá</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kho</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded-md px-3 py-2 h-24"
                        />
                    </div>
                </div>

                <div className="border-t px-5 py-3 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductEditInfoModal;
