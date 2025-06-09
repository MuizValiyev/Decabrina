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

export default function Products() {
  const params = useParams();
  const { id } = params;
  const api = useApi();

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
    queryKey: ["oneProduct", id],
    queryFn: fetchOneProduct,
    enabled: Boolean(id),
  });

  const handleAddToCart = async () => {
    try{
      const response = await api.post('cart/add/', {
        product_id: id,
        quantity: 1,
        size_id: size,
        color_id: 0,
        textile_id: 0
      });
    console.log("API Response: ", response.data);  
    }catch (error) {
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
          <>Загрузка</>
        ) : (
          <>
            <div className={styles.boxProductRow}>
              <div className={styles.boxRight}>
                <h1>{product.name}</h1>
                <h2>Описание:</h2>
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
                  <h6>Мерки</h6>
                  <h6>Объем груди</h6>
                  <h6>Объем талии</h6>
                  <h6>Объем бедер</h6>
                  <h6>Рост</h6>
                </div>
                {product.sizes.map((item) => (
                <button key={item.id} onClick={() => setSize(item.id)} className={size === item.id ? styles.boxColSizeActive : styles.boxColSize}>
                  <h6>{item.size_label}</h6>
                  <h6>{item.bust}</h6>
                  <h6>{item.waist}</h6>
                  <h6>{item.hips}</h6>
                  <h6>{item.height}</h6>
                </button>
                ))}
              </div>
              <div className={styles.boxRowPrice}>
                <p>
                  {Number(product.price)
                    .toLocaleString("ru-RU")
                    .replace(".00", "")}{" "}
                  сум
                </p>
                <p>{product.in_stock ? "В наличии" : "Нет в наличии"}</p>
              <button onClick={handleAddToCart} className={styles.inCart} disabled={size === 0 || !product.in_stock}>В корзину</button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
