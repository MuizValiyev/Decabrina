"use client";
import Image from "next/image";
import styles from "./orderModel.module.css";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useApi from "@/utils/api";

export default function ({ isOpen, onClose, refetch }) {
  const api = useApi();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const fetchUserId = async () => {
    const response = await api.get("users/me/");
    console.log("API Response user id: ", response.data);
    return response.data;
  };
  const { data: userID } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchUserId,
    enabled: true,
  });

  const [phone, setPhone] = useState("+998");
  const [city, setCity] = useState("");
  const [address, setAdderss] = useState("");

  const handleOrder = async () => {
    try {
      const response = await api.post("orders/create/", {
        user: userID.user_id,
        phone: phone,
        city: city,
        address: address,
      });
      console.log(response.data);
      await onClose();
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.mainModal} onClick={(e) => e.stopPropagation()}>
        <h2>Оформление заказа</h2>
        <div className={styles.boxInputs}>
          <h6>Номер для связи</h6>
          <input
            type="text"
            value={phone}
            maxLength={13}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h6>Город</h6>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <h6>Адрес</h6>
          <input
            type="text"
            value={address}
            onChange={(e) => setAdderss(e.target.value)}
          />
        </div>
        <button onClick={handleOrder}>Оформить заказ</button>
      </div>
    </div>
  );
}
