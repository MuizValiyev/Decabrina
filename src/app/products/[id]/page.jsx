"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useParams, notFound } from "next/navigation";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const params = useParams();
  const { id } = params;
  const api = useApi();

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
                <div className={styles.boxRowPrice}>
                  <p>
                    {Number(product.price)
                      .toLocaleString("ru-RU")
                      .replace(".00", "")}{" "}
                    сум
                  </p>
                  <p>{product.in_stock ? "В наличии" : "Нет в наличии"}</p>
                </div>
                <button className={styles.inCart}>В корзину</button>
              </div>
              <div className={styles.boxLeft}>
                <Image src={product.image} alt="product" width={400}height={556}/>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
