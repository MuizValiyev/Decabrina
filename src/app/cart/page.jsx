"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.css";

import { useState } from "react";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import OrderModal from "@/components/orderModel";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Cart() {
  const api = useApi();

  const [modalOpen, setModalOpen] = useState(false);

  const fetchCartItems = async () => {
    const response = await api.get("cart/");
    console.log("API Response: ", response.data);
    return response.data;
  };

  const {
    data: cartItem,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
    enabled: true,
  });

  const handleAddToCart = async (item) => {
    try {
      const response = await api.post("cart/add/", {
        product_id: item.product.id,
        quantity: 1,
        size_id: item.size.id,
        color_id: 0,
        textile_id: 0,
      });
      console.log("API Response: ", response.data);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (item) => {
    try {
      const response = await api.post("cart/update-quantity/", {
        cart_item_id: item.id,
        action: "-",
      });
      console.log("API Response: ", response.data);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFromCart = async (item) => {
    try {
      const response = await api.delete(`cart/cart/delete/${item.id}/`);
      console.log("API Response delete item: ", response.data);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        {isLoading ? (
          <>Загрузка</>
        ) : (
          <AnimatePresence mode="wait">
            {cartItem.map((item) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              key={item.id}
              className={styles.boxOneProduct}>
              <div className={styles.boxLeft}>
                <Link href={`products/${item.product.id}`}>
                  <h1>{item.product.name}</h1>
                </Link>
                <div className={styles.boxColProductSize}>
                  <p>Размер: {item.size.size_label}</p>
                  <h6>Объем груди: {item.size.bust}</h6>
                  <h6>Объем талии: {item.size.waist}</h6>
                  <h6>Объем бедер: {item.size.hips}</h6>
                  <h6>Рост: {item.size.height}</h6>
                </div>
                <div className={styles.boxRowPrice}>
                  <div className={styles.boxRowAddOrRemove}>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      disabled={item.quantity <= 1}>
                      <Image
                        src="/minus.svg"
                        alt="minus"
                        width={24}
                        height={24}
                      />
                    </button>
                    <h6>{item.quantity}</h6>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.quantity >= 5}
                    >
                      <Image
                        src="/plus.svg"
                        alt="plus"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteFromCart(item)}
                    className={styles.boxRemoveFromCart}
                  >
                    <h6>Удалить</h6>
                  </button>
                </div>
                <div className={styles.boxRowPrice}>
                  <p>цена</p>
                  <p>
                    {Number(item.product.price)
                      .toLocaleString("ru-RU")
                      .replace(".00", "")}{" "}
                    сум
                  </p>
                </div>
              </div>
              <Link
                href={`products/${item.product.id}`}
                className={styles.boxRight}
              >
                <Image
                  src={item.product.image}
                  alt="Product"
                  width={400}
                  height={556}
                />
              </Link>
            </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div className={styles.boxRowSelectAll}>
          <button onClick={() => setModalOpen(true)} disabled={!cartItem || cartItem.length === 0} className={styles.order}>
            Оформить заказ
          </button>
        </div>
      </div>
      <Footer />
      <OrderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} refetch={refetch}/>
    </>
  );
}
