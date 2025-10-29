//file productAttributeValueThunk.ts
import { ProductAttributeValueRepository } from "../../api/productAttributeValue/productAttributeValueRepo";
import type { ProductAttributeValueOneType } from "../../type/productAttributesValue/ProductAttributeValueOneType";
import { addAttributeValueToProduct, toggleProductAttributeInProducts } from "../product/productSlice";
import type { AppDispatch } from "../store";
import { addAttributeValueSuccess, toggleActiveSuccess } from "./productAttributeValueSlice";

export const EditToggoleActiveValue = (id: number) => async (dispatch: AppDispatch) => {
    // 1) optimistic update: cập nhật ngay trong products (UI sẽ phản hồi)
    dispatch(toggleProductAttributeInProducts({ valueId: id }));
    // ⚡ cập nhật trước
    dispatch(toggleActiveSuccess(id));
    try {
        await ProductAttributeValueRepository.EditToggoleActiveValue(id); // gọi API
    } catch (error) {
        console.error(error);
        // rollback: đảo lại trạng thái trong products và trong productAttributeValue slice
        dispatch(toggleProductAttributeInProducts({ valueId: id }));
        dispatch(toggleActiveSuccess(id));
    }
};


export const AddValueOfProductByAttribute = (data: ProductAttributeValueOneType) => async (dispatch: AppDispatch) => {
    try {
        var result = await ProductAttributeValueRepository.AddValueOfProductByAttribute(data); // gọi API
        // ✅ 1. Cập nhật slice attributeValue (lưu thông tin giá trị mới)
        dispatch(addAttributeValueSuccess(result));

        // ✅ 2. Cập nhật slice product để hiển thị ngay
        dispatch(addAttributeValueToProduct({
            productId: data.productId,
            newValue: {
                productAttributeValueId: result.productAttributeValueId ?? Date.now(), // fallback nếu backend chưa trả id
                value: data.value,
                isActive: true
            }
        }));
    } catch (error) {
        console.error(error);

    }
};
