"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useParams, notFound } from "next/navigation";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/languageContext";

export default function Products() {
  const params = useParams();
  const { id } = params;
  const api = useApi();
  const {translate, language} = useLanguage("");

  const [size, setSize] = useState(0);

  const fetchOneProduct = async () => {
    const response = await api.get(`products/products/${id}`);
    console.log("API Response: ", response.data);
    return response.data;
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["oneProduct", id, language],
    queryFn: fetchOneProduct,
    enabled: Boolean(id),
  });

  const fetchCartItems = async () => {
    const response = await api.get("cart/");
    console.log("API Response cart: ", response.data);
    return response.data;
  };

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["cart", language],
    queryFn: fetchCartItems,
    enabled: true,
  });

  const handleAddToCart = async () => {
    try {
      const response = await api.post("cart/add/", {
        product_id: id,
        quantity: 1,
        size_id: size,
        color_id: 0,
        textile_id: 0,
      });
      console.log("API Response: ", response.data);
      refetchCart();
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const cartItem = cartData?.find(
    (item) => item.product.id === Number(id) && item.size.id === size
  );

  const handleRemoveFromCart = async () => {
    try{
      const response = await api.post('cart/update-quantity/', {
        cart_item_id: cartItem.id,
        action:'-',
      });
      console.log(response.data);
      refetchCart();
    } catch(error) {
      console.error(error);
    };
  };

  const handleDeleteItem = async (cartItem) => {
    try{
      const response = await api.delete(`cart/cart/delete/${cartItem.id}/`);
      console.log(response.data);
      await refetchCart();
    }catch(error) {
      console.error(error);
    };
  };


  if (!id || !/^\d+$/.test(id)) {
    notFound();
    return null;
  }

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        {isLoading ? (
          <>{translate("Загрузка")}</>
        ) : (
          <>
            <div className={styles.boxProductRow}>
              <div className={styles.boxRight}>
                <h1>{product.name}</h1>
                <h2>{translate("Описание:")}</h2>
                <p>{product.description}</p>
              </div>
              <div className={styles.boxLeft}>
                <Image
                  src={product.image}
                  alt="product"
                  width={400}
                  height={556}
                />
              </div>
            </div>

            <div className={styles.boxCol}>
              <div className={styles.boxRowSizes}>
                <div className={styles.boxColSize}>
                  <h6>{translate("Мерки")}</h6>
                  <h6>{translate("Объем груди")}</h6>
                  <h6>{translate("Объем талии")}</h6>
                  <h6>{translate("Объем бедер")}</h6>
                  <h6>{translate("Рост")}</h6>
                </div>
                {product.sizes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSize(item.id)}
                    className={size === item.id
                        ? styles.boxColSizeActive
                        : styles.boxColSize}>
                    <h6>{item.size_label}</h6>
                    <h6>{item.bust}</h6>
                    <h6>{item.waist}</h6>
                    <h6>{item.hips}</h6>
                    <h6>{item.height}</h6>
                  </button>
                ))}
              </div>
              <div className={styles.boxRowPrice}>
               <div className={styles.boxRow}>
                <p>
                  {Number(product.price)
                    .toLocaleString("ru-RU")
                    .replace(".00", "")}{" "}
                  {translate("сум")}
                </p>
                <p>{product.in_stock ? translate("В наличии") : translate("Нет в наличии")}</p> 
               </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cartItem ? "inCart" : "notInCart"}
                    initial={{ width: 150, opacity:0 }}
                    animate={{ width: cartItem ? 'auto' : 150, opacity:1 }}
                    exit={{ width: 150, opacity:0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      overflow: "hidden",
                      transformOrigin: "right",
                      display: "flex",
                      justifyContent: "end",
                    }}
                    className={styles.boxRowAddOrGoToCart}>
                    {cartItem ? (
                      <>
                      <button onClick={() => handleDeleteItem(cartItem)} className={styles.deleteProd}>{translate("Удалить")}</button>
                        <div className={styles.boxRowAddOrRemove}>
                          <button
                            onClick={handleRemoveFromCart} disabled={cartItem.quantity <= 1}>
                            <Image
                              src="/minus.svg"
                              alt="minus"
                              width={24}
                              height={24}
                            />
                          </button>
                          <h6>{cartItem.quantity}</h6>
                          <button
                            onClick={handleAddToCart}
                            disabled={cartItem.quantity >= 5}>
                            <Image
                              src="/plus.svg"
                              alt="plus"
                              width={24}
                              height={24}
                            />
                          </button>
                        </div>
                        <Link href="/cart/"><h6>{translate("Перейти")}</h6></Link>
                      </>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className={styles.inCart}
                        disabled={size === 0 || !product.in_stock}
                      >
                        {translate("В корзину")}
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
