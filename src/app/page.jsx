"use client";
import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

import useApi from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/languageContext";

export default function Home() {
  const {translate, language} = useLanguage();
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
    queryKey: ["categories", language],
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
          <Link href="/custom-order/" className={styles.oneCategoryOrder}>
            <h1>{translate("На заказ")}</h1>
            <Image src="/customOrder.png" alt="customOrder" width={843} height={750}/>
          </Link>
        </div>

        <div id="thrends" className={styles.boxThrends}>
          <h1>{translate("Тренды")}</h1>
          <div className={styles.boxScroll}>
            {categories
              ?.find((category) => category.trends)
              ?.products?.slice(0,4).map((item) => (
                <Link href={`products/${item.id}`} key={item.id} className={styles.oneThrend}>
                  <Image
                    src={item.image || ""}
                    alt="oneThrend"
                    width={316}
                    height={440}
                  />
                  <h2>{item.name}</h2>
                  <p>{Number(item.price).toLocaleString('ru-RU').replace('.00', '')} {translate("сум")}</p>
                </Link>
              ))}
          </div>
        </div>

        <div className={styles.boxInfo}>
          <h1>{translate('DECABRINA - это исключительно авторские работы.')}</h1>
          <p>
            {translate("Мы разрабатываем модели с учетом комфорта")}
          </p>
          <p>{translate("Наслаждайтесь покупками, не выходя из дома!")}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
