import React, { useEffect, useMemo } from 'react';
import CategorySelectorChildren from '../../../components/admin/DynamicForm/CategorySelectorChildren';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchCategoryAttributeJson } from '../../../redux/category/categoryThunk';
import type { ProductCategory } from '../../../type/categoryAttribute/ProductCategory';

// --- Component chính ---
const CategorySelector: React.FC = () => {
    // ✅ Dữ liệu mẫu khởi tạo tại đây
    const dispatch = useDispatch<AppDispatch>();
    const categoryAttributeJson = useSelector(
        (state: RootState) => state.categories.categoryAttributeJson
    );
    useEffect(() => {
        dispatch(fetchCategoryAttributeJson());
    }, [dispatch]);
    // Parse JSON string thành object nếu có
    const categories = useMemo(() => {
        if (!categoryAttributeJson) return [] as ProductCategory[];
        try {
            // return JSON.parse(categoryAttributeJson); // ✅ chuyển string -> object
            return categoryAttributeJson as unknown as ProductCategory[];
        } catch (err) {
            console.error("❌ Lỗi parse JSON:", err);
            return [];
        }
    }, [categoryAttributeJson]);
    console.log("categories:", categories);

    return (
        <div>
            {/* ✅ Truyền danh mục vào component con */}
            <CategorySelectorChildren categories={categories} />
        </div>
    );
};

export default CategorySelector;
