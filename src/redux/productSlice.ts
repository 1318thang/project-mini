import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { productType } from "../type/productType";
import type { attributeValueFilterType } from "../type/attribute/AttributeValueFilterType";
interface ProductState {
    products: productType[];
    latestProducts: productType[]; // sản phẩm mới nhất
    homeProducts: productType[];
    resultSearch: productType[]; // kết quả tìm kiếm
    selectProduct: productType | null;
    FilterProductsByAttributes: attributeValueFilterType[];
    getProductImageRandom: productType[];
    getProductShoppingTrend: productType[];
    trends: Record<string, productType[]>; // ✅ linh hoạt cho từng loại trend
    loading: boolean;
    error: string | null;
}
const initialState: ProductState = {
    products: [],
    latestProducts: [],
    homeProducts: [],
    resultSearch: [],
    selectProduct: null,
    FilterProductsByAttributes: [],
    getProductImageRandom: [],
    getProductShoppingTrend: [],
    trends: {},
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getAllProducts: (state, action: PayloadAction<productType[]>) => {
            state.products = action.payload;
        },
        getProductLasted: (state, action: PayloadAction<productType[]>) => {
            state.latestProducts = action.payload;  // gói thành mảng
        },
        getProductHome: (
            state,
            action: PayloadAction<{ products: productType[]; reset: boolean }>
        ) => {
            if (action.payload.reset) {
                state.homeProducts = action.payload.products;
            } else {
                state.homeProducts = [...state.homeProducts, ...action.payload.products];
            }
        },
        getSearchPro: (state, action: PayloadAction<productType[]>) => {
            state.resultSearch = action.payload;
        },
        createProduct: (state, action: PayloadAction<productType>) => {
            state.products.push(action.payload);
            // nếu muốn latest luôn có sản phẩm mới nhất lên đầu
            // state.latestProducts = [action.payload, ...state.latestProducts];
            state.latestProducts = [action.payload, ...state.latestProducts].slice(0, 5);
        },
        getId: (state, action: PayloadAction<productType>) => {
            state.selectProduct = action.payload;
        },
        editProduct: (state, action: PayloadAction<productType>) => {
            state.products = state.products.map(p =>
                p.id === action.payload.id ? action.payload : p
            );
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        getFilterProductsByAttributes: (state, action: PayloadAction<attributeValueFilterType[]>) => {
            state.FilterProductsByAttributes = action.payload;
        },
        getProductsImageRandom: (state, action: PayloadAction<productType[]>) => {
            state.getProductImageRandom = action.payload;
        },
        setTrend: (state, action) => {
            const { key, data } = action.payload;
            state.trends[key] = data;
        },
    }
})
export const { getSearchPro, getAllProducts, getProductLasted, getProductHome, createProduct, getId, getFilterProductsByAttributes, editProduct, getProductsImageRandom, setTrend, setLoading } =
    productSlice.actions;
export default productSlice.reducer;
