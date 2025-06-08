'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.css";

import { useState } from "react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxOneProduct}>
          <div className={styles.boxLeft}>
            <h1>Название</h1>
            <div className={styles.boxColProductSize}>
              <p>Размер: XS</p>
              <h6>Объем груди: 80-85</h6>
              <h6>Объем талии: 60-65</h6>
              <h6>Объем бедер: 90-95</h6>
              <h6>Рост: 160-165</h6>
            </div>
            <div className={styles.boxRowAddOrRemove}>
              <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                <Image src="/minus.svg" alt="plus" width={24} height={24}/>
              </button>
              <h6>{quantity}</h6>
              <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= 5}>
                <Image src="/plus.svg" alt="plus" width={24} height={24}/>
              </button>
            </div>
            <div className={styles.boxRowPrice}>
              <p>цена</p>
              <p>$500</p>
            </div>
          </div>
          <div className={styles.boxRight}>
            <Image
              src="/oneProduct.png"
              alt="Product"
              width={400}
              height={556}
            />
          </div>
        </div>
        <div className={styles.boxRowSelectAll}>
          <Link href="/order" className={styles.order}>
            Оформить заказ
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
