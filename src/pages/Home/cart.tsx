import React, { useCallback, useEffect, useState } from "react";
import CartHeader from "../../components/home/cart/CartHeader";
import CartItem from "../../components/home/cart/CartItem";
import CartSummary from "../../components/home/cart/CartSummary";
import CartDeals from "../../components/home/cart/CartDeals";
import ProductCarousel from "../../components/home/productDetails/ProductCarousel";
import { CartRepository } from "../../api/cart/cartRepository";
import type { cartItemType } from "../../type/cartItemType";
import { getCartByUser, removeCartById, setLoading, updateCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { ProRepository } from "../../api/product/productRepository";
import {
    // getProductsImageRandom, 
    setTrend
} from "../../redux/productSlice";

// const product = Array.from({ length: 21 }, (_, i) => ({
//     id: i + 1,
//     name: `Product ${i + 1}`,
//     price: 23000 + "VND",
//     img: img3,
//     rating: 4.5,
// }));
const Cart: React.FC = () => {
    const dispatch = useDispatch();
    // Tách page cho từng carousel
    const [pageTop, setPageTop] = useState(0);
    const [pageBottom, setPageBottom] = useState(0);

    // const [isMobile, setIsMobile] = useState(false);
    // const pageSize = 7;
    // const totalPages = Math.ceil(product.length / pageSize);
    // const currentProductsTop = isMobile
    //     ? product
    //     : product.slice(pageTop * pageSize, pageTop * pageSize + pageSize);

    // const currentProductsBottom = isMobile
    //     ? product
    //     : product.slice(pageBottom * pageSize, pageBottom * pageSize + pageSize);

    // const [loading, setLoadingT] = useState(true);
    // Call cart by userId
    const user = JSON.parse(localStorage.getItem("user")!);
    const userid = user.id;// emulator userId
    const [items, setItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalSub, setTotalSub] = useState(0);
    const GetCartByUser = async (): Promise<cartItemType[] | undefined> => {
        try {
            // setLoadingT(true);
            const datas = await CartRepository.GetCartByUser(userid);
            dispatch(getCartByUser(datas));
            //Total price of cart
            const totalPrice = datas.reduce((acc, item) => {
                return acc + Number(item.productPrice);
            }, 0);
            setTotal(totalPrice);
            const totalPriceSub = datas.reduce((acc, item) => {
                return acc + Number(item.productPrice) * Number(item.quantity);
            }, 0);
            setTotalSub(totalPriceSub);
            setItems(datas.length);

            return datas
            // dispatch(setLoading(true));      // tắt skeleton
        } catch (e: any) {
            console.log(e);
        } finally {
            // setLoadingT(false);
            dispatch(setLoading(false));      // tắt skeleton
        }

    }
    const removeCartByIdOfUser = async (id: number) => {
        try {
            setLoading(true);
            await CartRepository.RemoveCartByIdOfUser(id);
            dispatch(removeCartById(id));
            await GetCartByUser();
        } catch (error) {
            console.log(error);
        } finally {
            // setLoadingT(false);
            dispatch(setLoading(false));      // tắt skeleton
        }
    }
    const updateCartById = async (data: cartItemType): Promise<void> => {
        try {
            dispatch(setLoading(true)); // ✅ Dùng Redux loading
            if (data.userId && data.productId) {
                const updated = await CartRepository.UpdatedCart(data);
                dispatch(updateCart(updated)); // ✅ Dùng dữ liệu trả về (nếu có)
                await GetCartByUser();
            } else {
                console.warn("Invalid cart data: userId or productId missing");
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
        } finally {
            dispatch(setLoading(false)); // ✅ Tắt skeleton/loading
        }
    };
    const fetchProductDeals = useCallback(async (key: string, max: number) => {
        try {
            const data = await ProRepository.GetProductImageRandom(max);
            // console.log("random =", data);
            // dispatch(getProductsImageRandom(data));
            dispatch(setTrend({ key, data })); // ✅ Lưu dữ liệu theo key
        } catch (e) {
            console.error("Lỗi fetchProductDeals:", e);
        }
    }, [dispatch]);
    // const fetchProductShoppingTrend = useCallback(async () => {
    //     try {
    //         const data = await ProRepository.GetProductImageRandom(21);
    //         console.log("random =", data);
    //         dispatch(getProductShoppingTrend(data));
    //     } catch (e) {
    //         console.error("Lỗi fetchProductShoppingTrend:", e);
    //     }
    // }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const [
            ] = await Promise.allSettled([
                GetCartByUser(),
                fetchProductDeals("productDeals", 4),
                fetchProductDeals("productTrendTop", 15),
                fetchProductDeals("productTrenBottom", 21)
                // fetchProductShoppingTrend(),
            ])
        }
        fetchData();
    }, [])
    return (
        <div className="bg[#d9d9d9] p-2  md:pr-3.5">
            <div className="bg[#d9d9d9] grid grid-cols-1 md:grid-cols-[65%_35%]  md:p-2 gap-2">
                {/* LEFT */}
                <div>
                    <div className=" bg-white flex flex-col gap-2 md:p-4 rounded-[2px] p-3">
                        <CartHeader />
                        <div>

                            <CartItem onDelete={removeCartByIdOfUser} onEdit={updateCartById}

                            />
                        </div>
                        <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
                        <p className="flex justify-end">Subtotal ({items} item): ${total}</p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className=" flex flex-col gap-2">
                    <CartSummary subtotal={totalSub} />
                    <CartDeals
                        trendKey="productDeals"
                        title="You may also like"
                    />
                </div>

            </div>
            <div className="bg-white">
                <ProductCarousel
                    page={pageTop}
                    setPage={setPageTop}
                    trendKey="productTrendTop"
                    title="You may also like"
                />
                <br /><br />
                <div className="px-2">
                    <hr className="h-1 border-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full" />
                </div>
                <br /><br />
                <ProductCarousel
                    page={pageBottom}
                    setPage={setPageBottom}

                    trendKey="productTrenBottom"
                    title="Trending now"
                />
            </div>
        </div>
    );
};

export default Cart;
