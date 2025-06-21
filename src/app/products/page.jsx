"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Products() {
  const api = useApi();

  const fetchProducts = async () => {
    const response = await api.get('products/products/');
    console.log("API Response: ", response.data);
    return response.data;
  }

    const {
    data: products,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    queryKey: ["productsData"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const [filterModal, setFilterModal] = useState(false);

  useEffect(() => {
    if (filterModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [filterModal]);

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxFilterAndCatalog}>
          <div className={styles.boxCatalog}>
            {products?.length > 0 ? (
            products.map((item) => (
            <Link href={`products/${item.id}`} key={item.id} className={styles.boxOneProduct}>
              <Image
                src={item.image}
                alt="product"
                width={350}
                height={350}
              />
              <h2>{item.name}</h2>
              <p>{Number(item.price).toLocaleString('ru-RU').replace('.00', "")} сум</p>
            </Link>
            ))
            ) : (<></>)}
          </div>
        </div>
      </div>
      <AnimatePresence>
      </AnimatePresence>
      <Footer />
    </>
  );
}
