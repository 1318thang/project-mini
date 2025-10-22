import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
const ProductTable: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.latestProducts);
    // Hàm mở modal xem toàn bộ ảnh phụ
    return (
        <div className="mx-auto mt-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recently Added Products</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Showing the 5 most recent products added to your catalog.
                    </p>
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-medium">Image</th>
                                <th className="px-4 py-3 font-medium">Product Name</th>
                                <th className="px-4 py-3 font-medium">Added On</th>
                                <th className="px-4 py-3 font-medium">Last Updated</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-4 py-3">
                                        <img
                                            src={p.mainImage}
                                            alt="product"
                                            className="w-14 h-14 rounded-md object-cover border border-gray-200"
                                        />
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                                            <span className="text-xs text-gray-500 mt-0.5">{p.categoryName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {p.created_at ? new Date(p.created_at).toLocaleDateString("vi-VN") : ""}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {p.update_at ? new Date(p.update_at).toLocaleDateString("vi-VN") : ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
