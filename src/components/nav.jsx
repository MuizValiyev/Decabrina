"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";
import { motion, AnimatePresence } from "motion/react";
import Cookies from "js-cookie";
import { useLanguage } from "@/context/languageContext";
import LanguageSwitcher from "./language";

export default function Nav() {
  const {translate, language, setLanguage } = useLanguage();
  const [modal, setModal] = useState(false);
  const [accountOrCart, setAccountOrCart] = useState(1);

  useEffect(() => {
    if (Cookies.get("access_token")) {
      setAccountOrCart(2);
    }
  }, []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

    const changeLanguage = (lang) => {
        setLanguage(lang)
        handleLanguageModal()
    }

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
            <Link href={"/"} className={styles.boxLogoLink}>
              <Image
                src="/decabrinaLogo.svg"
                alt="logo"
                width={408}
                height={46}
              />
              <Image
                src="/logoAdaptive.svg"
                alt="logo"
                width={144}
                height={20}
              />
            </Link>
          </div>
          <Link href="/products" className={styles.oneLinkNav}>
            {translate("продукция")}
          </Link>
          <Link href="/about" className={styles.oneLinkNav}>
            о предприятии
          </Link>
          <Link href="/delivery" className={styles.oneLinkNav}>
            доставка
          </Link>
          <div className={styles.boxSearch}>
            <LanguageSwitcher />
            <>
              {accountOrCart !== 1 ? (
                <Link href="/cart">
                  <Image src="/cart.svg" alt="cart" width={28} height={20} />
                </Link>
              ) : (
                <Link href="/login" className={styles.boxAccount}>
                  <Image src="/login.svg" alt="login" width={24} height={24} />
                </Link>
              )}
            </>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ y: -10, opacity: 0, display: "none" }}
            animate={{ y: 0, opacity: 1, display: "flex" }}
            exit={{ y: -10, opacity: 0, display: "none" }}
            transition={{ duration: 0.1 }}
            className={styles.modal}
          >
            <Link href="/products">продукция</Link>
            <Link href="/about">о предприятии</Link>
            <Link href="/delivery">доставка</Link>
            <div className={styles.boxRowLanguage}>
              <button onClick={() => changeLanguage("ru")} className={styles.oneLanguage}>RU</button>
              <button onClick={() => changeLanguage("uz")} className={styles.oneLanguage}>UZ</button>
              <button onClick={() => changeLanguage("en")} className={styles.oneLanguage}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
