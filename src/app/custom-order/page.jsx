"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./custom-order.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useState } from "react";

export default function CustomOrder() {
  const [oneCustomModel, setOneCustomModel] = useState("");

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <h1>Пошив на заказ</h1>
        <div className={styles.boxCustomOrder}>
        <div className={styles.boxOneCustom}>
            <p>Номер для связи</p>
            <button
              onClick={() => setOneCustomModel(1)}
              className={styles.boxOneCustomButton}>
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Модель</p>
            <button
              onClick={() => setOneCustomModel(1)}
              className={styles.boxOneCustomButton}
            >
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Ткань</p>
            <button
              onClick={() => setOneCustomModel(2)}
              className={styles.boxOneCustomButton}>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Цвет</p>
            <button
              onClick={() => setOneCustomModel(3)}
              className={styles.boxOneCustomButton}>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Размер</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват груди</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
                см
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват талии</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
                см
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват бедер</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
                см
            </button>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Рост</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
                см
            </button>
          </div>
            <div className={styles.boxOneCustom}>
            <p>Коментарий</p>
            <button
              onClick={() => setOneCustomModel(4)}
              className={styles.boxOneCustomButton}>
            </button>
          </div>
          <button className={styles.order}>Оформить заказ</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
