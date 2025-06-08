"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./custom-order.module.css";

import useApi from "@/utils/api";
import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function CustomOrder() {
  const api = useApi();

  // ------------------------------ POST Request Data ------------------------------
  const [model, setModel] = useState();
  const [phone, setPhone] = useState("+998");
  const [color, setColor] = useState();
  const [textile, setTextile] = useState();
  const [size, setSize] = useState();
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [height, setHeight] = useState("");
  const [comment, setComment] = useState("");
  // ------------------------------ POST Request Data end ------------------------------

  const [modelName, setmodelName] = useState("");
  const [colorName, setColorName] = useState("");
  const [textileName, setTextileName] = useState("");
  const [sizeName, setSizeName] = useState("");
  const [popup, setPopup] = useState(0);

  const [error, setError] = useState("");
  const [succsess, setSuccsess] = useState("");

  const isValid =
    model &&
    color &&
    textile &&
    size &&
    phone.length === 13 &&
    bust > 0 &&
    bust < 300 &&
    waist > 0 &&
    waist < 300 &&
    hips > 0 &&
    hips < 300 &&
    height > 0 &&
    height < 300;

  const resetForm = () => {
    setModel("");
    setPhone("+998");
    setColor("");
    setTextile("");
    setSize("");
    setBust("");
    setWaist("");
    setHips("");
    setHeight("");
    setComment("");
    setmodelName("");
    setSizeName("");
    setColorName("");
    setTextileName("");
  };
  // ------------------------------ APIs GET ------------------------------
  const fetchColors = async () => {
    const response = await api.get("api/custom-orders/colors/");
    return response.data;
  };
  const { data: colorsData } = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
    enabled: true,
  });

  const fetchModel = async () => {
    const response = await api.get("api/custom-orders/models/");
    return response.data;
  };
  const { data: modelsData } = useQuery({
    queryKey: ["models"],
    queryFn: fetchModel,
    enabled: true,
  });

  const fetchTextile = async () => {
    const response = await api.get("api/custom-orders/textile/");
    return response.data;
  };
  const { data: textileData } = useQuery({
    queryKey: ["textile"],
    queryFn: fetchTextile,
    enabled: true,
  });

  const fetchSize = async () => {
    const response = await api.get("api/custom-orders/sizes/");
    return response.data;
  };
  const { data: sizeData } = useQuery({
    queryKey: ["size"],
    queryFn: fetchSize,
    enabled: true,
  });
  // ------------------------------ APIs GET end ------------------------------
  // ------------------------------ API POST ------------------------------
  const createCustomOrder = async () => {
    try {
      const response = await api.post("api/custom-orders/orders/create/", {
        phone: phone,
        model: model,
        textile: textile,
        color: color,
        size: size,
        bust: bust,
        waist: waist,
        hips: hips,
        height: height,
        comment: comment,
      });
      console.log(response.data);
      setSuccsess("Заказ успешно оформлен!");
      resetForm();
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  // ------------------------------ API POST end ------------------------------

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <h1>Пошив на заказ</h1>
        <div className={styles.boxCustomOrder}>
          <div className={styles.boxOneCustom}>
            <p>Номер для связи</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={phone}
              onChange={(e) => {
                e.target.value.replace(/[^\d+]/g, "");
                setPhone(e.target.value);
              }}
              maxLength={13}
            />
          </div>
          <div className={styles.boxOneCustom}>
            <p>Модель</p>
            <button
              onClick={() => setPopup(popup === 1 ? 0 : 1)}
              className={styles.boxOneCustomButton}
            >
              <h6>{modelName}</h6>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
            <AnimatePresence>
              {popup === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={styles.boxAllTypes}
                >
                  {modelsData?.map((item) => (
                    <button
                      onClick={() => (
                        setModel(item.id), setmodelName(item.name), setPopup(0)
                      )}
                      key={item.id}
                      className={styles.oneType}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Цвет</p>
            <button
              onClick={() => setPopup(popup === 2 ? 0 : 2)}
              className={styles.boxOneCustomButton}
            >
              <h6>{colorName}</h6>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
            <AnimatePresence>
              {popup === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={styles.boxAllTypes}
                >
                  {colorsData?.map((item) => (
                    <button
                      onClick={() => (
                        setColor(item.id), setColorName(item.name), setPopup(0)
                      )}
                      key={item.id}
                      className={styles.oneType}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Ткань</p>
            <button
              onClick={() => setPopup(popup === 3 ? 0 : 3)}
              className={styles.boxOneCustomButton}
            >
              <h6>{textileName}</h6>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
            <AnimatePresence>
              {popup === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={styles.boxAllTypes}
                >
                  {textileData?.map((item) => (
                    <button
                      onClick={() => (
                        setTextile(item.id),
                        setTextileName(item.name),
                        setPopup(0)
                      )}
                      key={item.id}
                      className={styles.oneType}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Размер</p>
            <button
              onClick={() => setPopup(popup === 4 ? 0 : 4)}
              className={styles.boxOneCustomButton}
            >
              <h6>{sizeName}</h6>
              <Image
                src="/arrowBottom.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
            <AnimatePresence>
              {popup === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.1 }}
                  className={styles.boxAllTypes}
                >
                  {sizeData?.map((item) => (
                    <button
                      onClick={() => (
                        setSize(item.id), setSizeName(item.label), setPopup(0)
                      )}
                      key={item.id}
                      className={styles.oneType}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват груди</p>
            <div className={styles.boxinput}>
              <input
                type="text"
                placeholder="максимум 3 символа"
                inputMode="numeric"
                pattern="\d*"
                value={bust}
                onChange={(e) => {
                  e.target.value.replace(/\D/g, "");
                  setBust(e.target.value);
                }}
              />
              см
            </div>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват талии</p>
            <div className={styles.boxinput}>
              <input
                type="text"
                placeholder="максимум 3 символа"
                inputMode="numeric"
                pattern="\d*"
                value={waist}
                onChange={(e) => {
                  e.target.value.replace(/\D/g, "");
                  setWaist(e.target.value);
                }}
              />
              см
            </div>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Обхват бедер</p>
            <div className={styles.boxinput}>
              <input
                type="text"
                placeholder="максимум 3 символа"
                inputMode="numeric"
                pattern="\d*"
                value={hips}
                onChange={(e) => {
                  e.target.value.replace(/\D/g, "");
                  setHips(e.target.value);
                }}
              />
              см
            </div>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Рост</p>
            <div className={styles.boxinput}>
              <input
                type="text"
                placeholder="максимум 3 символа"
                inputMode="numeric"
                pattern="\d*"
                value={height}
                onChange={(e) => {
                  e.target.value.replace(/\D/g, "");
                  setHeight(e.target.value);
                }}
              />
              см
            </div>
          </div>
          <div className={styles.boxOneCustom}>
            <p>Коментарий</p>
            <div className={styles.boxinput}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <AnimatePresence>
            {error || succsess ? (
            <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} transition={{duration:0.1}} className={styles.errorOrSuccsess}>
              <h6>{error || succsess}</h6>
            </motion.div>
            ) : null}
          </AnimatePresence>
          <button
            onClick={createCustomOrder}
            disabled={!isValid}
            className={styles.order}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
