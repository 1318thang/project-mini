import React, { useEffect, useState } from "react";
import { Filter, ChevronRight, Eye, EyeOff } from "lucide-react";
import { cn } from "../../../lib/utils";
import type { ProductCategory } from "../../../type/categoryAttribute/ProductCategory";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchProductsByCategoryAndAttribute } from "../../../redux/product/productThunk";
import type { ProductAttributeResultType } from "../../../type/product/ProductAttributeResultType";
import { AddValueOfProductByAttribute, EditToggoleActiveValue } from "../../../redux/productAttributeValue/productAttributeValueThunk";
interface CategorySelectorChildrenProps {
    categories: ProductCategory[];
}
// --- Component con ---
const CategorySelectorChildren: React.FC<CategorySelectorChildrenProps> = ({ categories }) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [localProducts, setLocalProducts] = useState<ProductAttributeResultType[]>([]);
    // --- State quản lý ---
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    // const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);
    const [selectedAttribute, setSelectedAttribute] = useState<{ id: number; name: string }>({
        id: 0,
        name: "",
    });
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newValues, setNewValues] = useState<{ [key: number]: string }>({});
    // --- Dữ liệu sản phẩm từ Redux ---
    const products = useSelector(
        (state: RootState) => state.products.getProductsByCategoryAndAttribute
    ) as ProductAttributeResultType[] | [];
    const loading = useSelector((state: RootState) => state.products.loading);
    // --- Khi danh mục thay đổi -> chọn category đầu tiên ---
    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);

    // --- Gọi API khi chọn category + attribute ---
    useEffect(() => {
        if (selectedCategory && selectedAttribute) {
            dispatch(fetchProductsByCategoryAndAttribute(selectedCategory.name, selectedAttribute.name));
        } else {
            dispatch(fetchProductsByCategoryAndAttribute("Fashion", "color"));
        }
    }, [selectedCategory, selectedAttribute, dispatch]);
    // ✅ Khi đã có category -> chọn attribute đầu tiên mặc định
    useEffect(() => {
        if (selectedCategory && selectedCategory.attributes.length > 0) {
            // Nếu chưa chọn thuộc tính hoặc đang là giá trị rỗng thì set attribute đầu tiên
            if (selectedAttribute.id === 0) {
                const firstAttr = selectedCategory.attributes[0];
                setSelectedAttribute({ id: firstAttr.id, name: firstAttr.name });
            }
        }
    }, [selectedCategory]);

    if (!categories || categories.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-500">
                Loading categories...
            </div>
        );
    }
    if (!selectedCategory) {
        return (
            <div className="flex items-center justify-center min-h-screen text-slate-500">
                No categories available
            </div>
        );
    }
    const handleToggleActive = (id: number) => {
        dispatch(EditToggoleActiveValue(id));
    };
    const handleInputChange = (productId: number, value: string) => {
        setNewValues((prev) => ({
            ...prev,
            [productId]: value,
        }));
    };
    const handleAddValue = async (productId: number) => {
        const value = newValues[productId];
        if (!value?.trim() || !selectedAttribute.id || !selectedCategory) return;
        const attributeId = selectedAttribute.id; // ✅ attributeId
        console.log("đạt nè 2025: ", {
            productId,
            attributeId,
            value
        });
        setIsLoading(true);
        try {
            await dispatch(
                AddValueOfProductByAttribute({
                    productId,
                    attributeId,
                    value: value.trim(),
                })
            );
            setNewValues((prev) => ({ ...prev, [productId]: "" })); // clear input
        } catch (error) {
            console.error("Add attribute value failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-slate-50">
            {/* --- Header --- */}
            <div className="bg-white border-b border-slate-200 px-8 py-6 shadow-sm">
                <h1 className="text-3xl font-bold text-slate-900">Product Catalog</h1>
                <p className="text-slate-600 mt-1">Manage products, attributes, and values</p>
            </div>

            <div className="flex-1 overflow-hidden flex">
                {/* --- Sidebar: Categories --- */}
                <div className="w-72 border-r border-slate-200 bg-white overflow-y-auto">
                    <div className="sticky top-0 z-10 px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Filter className="h-5 w-5 text-blue-600" />
                            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                Categories
                            </h2>
                        </div>
                    </div>

                    <nav className="p-4 space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setSelectedAttribute({ id: 0, name: "" });
                                    setExpandedProductId(null);
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border-l-4",
                                    selectedCategory.id === category.id
                                        ? "bg-blue-50 border-l-blue-600 text-blue-900 shadow-sm"
                                        : "border-l-transparent text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                <div className="font-semibold text-sm">{category.name}</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    {category.attributes.length} attributes
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* --- Category Header --- */}
                    <div className="px-8 py-6 border-b border-slate-200 bg-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900">
                                    {selectedCategory.name}
                                </h2>
                                <p className="text-slate-600 mt-2">{selectedCategory.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Content Area --- */}
                    <div className="flex-1 overflow-hidden flex gap-6">
                        {/* --- Left: Attributes --- */}
                        <div className="w-64 border-r border-slate-200 overflow-y-auto bg-slate-50">
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                                    Category Attributes ({selectedCategory.attributes.length})
                                </h3>
                                <div className="space-y-2">
                                    {selectedCategory.attributes.map((attr) => (
                                        <button
                                            key={attr.id}
                                            onClick={() => setSelectedAttribute({ id: attr.id, name: attr.name })}
                                            className={cn(
                                                "w-full text-left px-4 py-3 rounded-lg border transition-all",
                                                selectedAttribute?.name === attr.name
                                                    ? "bg-blue-100 border-blue-400 text-blue-800"
                                                    : "bg-white border-slate-200 hover:border-blue-300"
                                            )}
                                        >
                                            <div className="font-semibold text-slate-900 text-sm">
                                                {attr.name} - {attr.id}
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                    {attr.type}
                                                </span>
                                                <span className="text-xs text-slate-600">
                                                    {attr.values.length} values
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- Right: Products --- */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                Products ({products?.length || 0})
                            </h3>

                            {loading ? (
                                <p className="text-slate-500 text-sm italic">Loading...</p>
                            ) : products?.length === 0 ? (
                                <p className="text-slate-500 text-sm italic">
                                    No products found for this category and attribute.
                                </p>
                            ) : (
                                //Get Data 
                                products.map((product) => (
                                    <div
                                        key={product.productId}
                                        className="bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-all shadow-sm overflow-hidden mb-4"
                                    >
                                        <button
                                            onClick={() =>
                                                setExpandedProductId(
                                                    expandedProductId === product.productId
                                                        ? null
                                                        : product.productId
                                                )
                                            }
                                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="text-left flex-1">
                                                <h4 className="font-semibold text-slate-900">
                                                    {product.productName}
                                                </h4>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    Product ID: {product.productId}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                className={cn(
                                                    "h-5 w-5 text-slate-400 transition-transform duration-300",
                                                    expandedProductId === product.productId && "rotate-90"
                                                )}
                                            />
                                        </button>
                                        <div className="flex flex-col px-6 py-4 bg-slate-50 border-t border-slate-200 gap-3">
                                            <h5 className="text-sm font-semibold text-slate-900 mb-2">
                                                Attribute Value
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {product.attributeValues.map((attr, index) => {
                                                    const isDisabled = !attr.isActive;
                                                    return (
                                                        <span
                                                            key={attr.productAttributeValueId || index}
                                                            onClick={() => handleToggleActive(attr.productAttributeValueId)} // ✅ gọi thunk
                                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${isDisabled
                                                                ? "bg-gray-200 text-gray-400 line-through"
                                                                : "bg-blue-100 text-blue-700"
                                                                }`}
                                                            title={
                                                                isDisabled
                                                                    ? "Đang ẩn - click để bật lại"
                                                                    : "Đang hoạt động - click để tắt"
                                                            }
                                                        >
                                                            {attr.value}
                                                            {isDisabled ? <Eye size={14} /> : <EyeOff size={14} />}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            {/* 🔹 Form thêm attribute value */}
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    // value={newValue}
                                                    // onChange={(e) => setNewValue(e.target.value)}
                                                    onChange={(e) => handleInputChange(product.productId, e.target.value)} // ✅ truyền productId và value
                                                    placeholder="Enter value (example: black)"
                                                    className="border border-slate-300 rounded-lg px-3 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                                <button
                                                    disabled={isLoading}
                                                    onClick={() => handleAddValue(product.productId)} // ✅ truyền productI
                                                    className={`px-3 py-1 rounded-lg text-sm transition ${isLoading
                                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                                        }`}
                                                >
                                                    {isLoading ? "Adding..." : "+ Add"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CategorySelectorChildren;