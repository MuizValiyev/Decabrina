"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import { motion, AnimatePresence } from "motion/react";

export default function Nav() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={styles.mainNav}>
        <div className={styles.boxNavCenter}>
          <div className={styles.boxLogo}>
            <button
              onClick={() => setModal(!modal)}
              className={styles.burgerMenu}
            >
              <Image
                src="/burger.svg"
                alt="burger menu"
                width={40}
                height={40}
              />
            </button>
            <Image
              src="/decabrinaLogo.svg"
              alt="logo"
              width={408}
              height={46}
            />
            <Image src="/logoAdaptive.svg" alt="logo" width={144} height={20} />
          </div>
          <Link href="#">продукция</Link>
          <Link href="#">о предприятии</Link>
          <Link href="#">доставка</Link>
          <div className={styles.boxSearch}>
            <button>RU</button>
            <div className={styles.boxInput}>
              <input type="seatch" placeholder="поиск" />
              <Image src="/search.svg" alt="search" width={24} height={24} />
            </div>
          </div>
          <button>
            <Image src="/cart.svg" alt="cart" width={28} height={20} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ y: -10, opacity: 0, display: "none" }}
            animate={{ y: 0, opacity: 1, display: "flex" }}
            exit={{ y: -10, opacity: 0, display: "none" }}
            transition={{ duration: 0.1 }}
            className={styles.modal}>
            <Link href="#">продукция</Link>
            <Link href="#">о предприятии</Link>
            <Link href="#">доставка</Link>
            <div className={styles.boxSearchAdaptive}>
                <input type="search" placeholder="поиск" />
                <button><Image src="/search.svg" alt="search" width={24} height={24} /></button>
            </div>
            <div className={styles.boxRowLanguage}>
                <button className={styles.oneLanguage}>RU</button>
                <button className={styles.oneLanguage}>UZ</button>
                <button className={styles.oneLanguage}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
