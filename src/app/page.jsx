"use client";
import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const api = useApi();

  const fetchCategories = async () => {
    const response = await api.get("products/categories/");
    console.log("API Response: ", response.data);
    return response.data;
  };

  const {
    data: categories,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxCategories}>
          {categories?.map((item) =>
            !item.trends ? (
              <div
                key={item.id}
                className={styles.oneCategory}
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <h1>{item.name}</h1>
              </div>
            ) : (
              <Link
                key={item.id}
                href="#thrends"
                className={styles.oneCategory}
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <h1>{item.name}</h1>
              </Link>
            )
          )}
        </div>

        <div id="thrends" className={styles.boxThrends}>
          <h1>Тренды</h1>
          <div className={styles.boxScroll}>
            {categories
              ?.find((category) => category.trends)
              ?.products?.map((item) => (
                <div key={item.id} className={styles.oneThrend}>
                  <Image
                    src={item.image || ""}
                    alt="oneThrend"
                    width={316}
                    height={440}
                  />
                  <h2>{item.name}</h2>
                  <p>{Number(item.price).toLocaleString('ru-RU').replace('.00', '')} сум</p>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.boxInfo}>
          <h1>DECABRINA - это исключительно авторские работы.</h1>
          <p>
            Мы разрабатываем модели с учетом комфорта, красоты и лаконичности,
            так, что бы каждая смогла найти у нас что то свое. В нашем
            интернет-магазине вы сможете оформить заказ всего за несколько
            минут, оплатить его удобным способом и заказать доставку в любой
            город или страну.
          </p>
          <p>Наслаждайтесь покупками, не выходя из дома!</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
