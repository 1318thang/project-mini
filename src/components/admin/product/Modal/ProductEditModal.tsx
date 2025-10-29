import React, { useState } from "react";
import type { productType } from "../../../../type/product/productType";
import { ProRepository } from "../../../../api/product/productRepository";
import type {
    // SecondaryImage,
    subImages
} from "../../../../type/SubImages";
// import { uploadToCloudinary } from "../../../../utils/uploadToCloudinary";

interface ProductEditModalProps {
    product: productType | null;
    onClose: () => void;
    onSave: (updatedProduct: productType) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, onClose }) => {

    const [mainImage, setMainImage] = useState(product?.mainImage || "");
    console.log("ProductEditModal mainImage:", mainImage);
    const ids = product?.ids || [];
    console.log("ProductEditModal ids:", ids);
    // const [secondaryImages, setSecondaryImages] = useState<string[]>(product?.secondaryImage || []);
    // const [secondaryImages, setSecondaryImages] = useState<SecondaryImage[]>([]);
    const [secondaryImages, setSecondaryImages] = useState<subImages[]>(
        product?.subImages?.map((img: string, idx: number) => ({
            imageUrl: img,
            id: product.ids[idx], // dùng ids từ productType
        })) || []
    );
    const [selectedSecondaryImages, setSelectedSecondaryImages] = useState<number[]>([]);

    const handleSecondaryImageChange = (index: number, value: string) => {
        const updated = [...secondaryImages];
        updated[index] = { ...updated[index], imageUrl: value }; // ✅ giữ id, chỉ update imageUrl
        setSecondaryImages(updated);
    };
    const handleSelectImage = (index: number) => {
        if (selectedSecondaryImages.includes(index)) {
            setSelectedSecondaryImages(selectedSecondaryImages.filter(i => i !== index));
        } else {
            setSelectedSecondaryImages([...selectedSecondaryImages, index]);
        }
    };
    const handleDeleteSelected = async () => {
        try {
            const idsToDelete = selectedSecondaryImages.map(i => secondaryImages[i].id);
            await ProRepository.deleteProductImages(idsToDelete);

            // Cập nhật state frontend
            setSecondaryImages(secondaryImages.filter((_, idx) => !selectedSecondaryImages.includes(idx)));
            setSelectedSecondaryImages([]);
        } catch (error) {
            console.error("Failed to delete selected images", error);
        }
    };

    if (!product) return null;
    //Thêm ảnh phụ nhiều ảnh cùng lúc cho product  ------------------------------------------------
    const productId = product.id;
    // State để lưu trữ file ảnh mới chọn từ input

    const [files, setFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    // Khi chọn ảnh mới (1 hoặc nhiều)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        // ✅ Lấy danh sách file mới chọn
        const selectedFiles = Array.from(e.target.files);

        // ✅ Gộp với danh sách file cũ (để có thể thêm nhiều lần)
        const allFiles = [...files, ...selectedFiles];
        setFiles(allFiles);

        // ✅ Tạo preview cho ảnh mới và gộp với ảnh cũ
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...newPreviews]);
    };

    // Upload tất cả ảnh lên Cloudinary và lưu vào DB
    const handleAddMultipleSecondaryImages = async () => {
        if (files.length === 0) return;
        setLoading(true);
        try {
            // 1️⃣ Upload tất cả ảnh song song
            // const uploadPromises = files.map((file) => uploadToCloudinary(file));
            // const urls = await Promise.all(uploadPromises);

            // 2️⃣ Gửi danh sách URL sang backend để lưu vào DB
            await ProRepository.addProductImages(productId, files);

            alert("✅ Thêm ảnh phụ thành công!");
            setFiles([]);
            setPreviewImages([]);
        } catch (err) {
            console.error("❌ Lỗi khi thêm ảnh phụ:", err);
            alert("Thêm ảnh phụ thất bại!");
        } finally {
            setLoading(false);
        }
    };

    // Xóa 1 ảnh phụ khỏi danh sách
    const handleRemoveImage = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white w-[600px] rounded-xl shadow-lg p-6 max-h-[550px] overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Product: {product.name}</h2>

                {/* Ảnh chính */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Main Image</label>
                    <input
                        type="text"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        placeholder="Enter main image URL"
                        className="w-full border p-2 rounded"
                    />
                    {mainImage && (
                        <img src={mainImage} alt="Main" className="w-32 h-32 mt-2 object-cover rounded" />
                    )}
                </div>

                {/* Ảnh phụ */}
                {/* Ảnh phụ */}
                <div>
                    <label className="block font-medium mb-2">Secondary Images</label>

                    {/* Nút Delete Selected */}
                    {selectedSecondaryImages.length > 0 && (
                        <button
                            onClick={() => {
                                // Xóa ảnh đã chọn khỏi state
                                const updatedImages = secondaryImages.filter((_, idx) => !selectedSecondaryImages.includes(idx));
                                setSecondaryImages(updatedImages);
                                setSelectedSecondaryImages([]);
                                handleDeleteSelected();
                                // Gọi API backend nếu bạn có
                                // const idsToDelete = selectedSecondaryImages.map(i => secondaryImages[i].id);
                                // deleteProductImages(idsToDelete);
                            }}
                            className="mb-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Selected
                        </button>
                    )}

                    {secondaryImages.map((img, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2">
                            <input
                                type="text"
                                value={img.imageUrl}
                                onChange={(e) => handleSecondaryImageChange(index, e.target.value)}
                                placeholder={`Secondary Image ${index + 1}`}
                                className="flex-1 border p-2 rounded"
                            />
                            {img && <img src={img.imageUrl} alt="" className="w-16 h-16 rounded object-cover" />}
                            <input
                                type="checkbox"
                                checked={selectedSecondaryImages.includes(index)}
                                onChange={() => handleSelectImage(index)}
                            />
                        </div>
                    ))}
                </div>
                {/* //Thêm anh phụ nhiều ảnh cùng lúc cho product - Start*/}
                {/* === Thêm nhiều ảnh phụ mới === */}
                {/* === Thêm nhiều ảnh phụ mới === */}
                <div className="mb-6 border-t pt-4">
                    <label className="block font-medium mb-3 text-gray-700">
                        Add New Secondary Images
                    </label>

                    {/* Chọn nhiều file */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="mb-3"
                    />

                    {/* Preview ảnh */}
                    {previewImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-4 max-h-64 overflow-y-auto">
                            {previewImages.map((url, idx) => (
                                <div
                                    key={idx}
                                    className="relative border rounded-lg overflow-hidden group"
                                >
                                    <img
                                        src={url}
                                        alt={`Preview ${idx}`}
                                        className="object-cover w-full h-24"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute top-1 right-1 bg-white/80 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Nút thêm ảnh */}
                    {previewImages.length > 0 && (
                        <button
                            onClick={handleAddMultipleSecondaryImages}
                            disabled={loading}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? "Uploading..." : "Add to Product"}
                        </button>
                    )}
                </div>
                {/* //Thêm anh phụ nhiều ảnh cùng lúc cho product - End*/}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductEditModal;
