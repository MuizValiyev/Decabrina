"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./products.module.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Products() {
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
          <div className={styles.filter}>
            <h1>Фильтр</h1>
            <div className={styles.boxFilter}>
              <h2>Ткань</h2>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <h2>Ткань</h2>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <h2>Ткань</h2>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
              <div className={styles.boxOneTypeFilter}>Вид ткани</div>
            </div>
          </div>
          <button
            onClick={() => setFilterModal(!filterModal)}
            className={styles.openFilter}
          >
            Фильтр
          </button>
          <div className={styles.boxCatalog}>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
            <div className={styles.boxOneProduct}>
              <Image
                src="/oneProduct.png"
                alt="product"
                width={350}
                height={350}
              />
              <h2>Название</h2>
              <p>цена</p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {filterModal && (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0, display: "none" }}
              animate={{ y: 0, opacity: 1, display: "flex" }}
              exit={{ y: -20, opacity: 0, display: "none" }}
              transition={{ duration: 0.1 }}
              className={styles.mainFilterAdaptive}>
              <div className={styles.filterAdaptiveRow}>
                <div className={styles.boxFilterAdaptive2}>
                <h1>Фильтр</h1>
                <div className={styles.boxFilter}>
                  <h2>Ткань</h2>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <h2>Ткань</h2>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <h2>Ткань</h2>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                  <div className={styles.boxOneTypeFilter}>Вид ткани</div>
                </div>
              </div>
              <button
                onClick={() => setFilterModal(false)}
                className={styles.closeFilter}
              >
                <Image src="/close.svg" alt="close" width={40} height={40} />
              </button>
              </div>
              <button className={styles.filterApply} onClick={() => setFilterModal(false)}>
                применить фильтр
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
