"use client";
import Image from "next/image";
import useApi from "@/utils/api";
import styles from "./password-reset.module.css";
import { useState } from "react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/languageContext";

export default function PasswordReset() {
  const api = useApi();
  const {translate, language} = useLanguage();

  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [passwordReset, setPasswordReset] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const [code, setCode] = useState("");
  const isValidCode = code.length === 6;

  const [newPassword, setNewPassword] = useState("");
  const isValidPassword = newPassword.length >= 8;
  

  const handlePasswordReset = async () => {
    try {
      const response = await api.post("users/password-reset/", {
        email: email,
      });
      console.log(response.data);
      setPasswordReset(false);
      setSessionId(response.data.session_id);
    } catch (error) {
      console.error(error);
    }
  };


  const handleVerificationEmail = async () => {
    try{
      const response = await api.post("users/password-reset/confirm/", {
        session_id: sessionId,
        otp_code:code,
      });
      setPasswordReset(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    };
  };

  const handleNewPassword = async () => {
    try{
     const response = await api.post("users/new-password/", {
        session_id: sessionId,
        new_password: newPassword,
     }) 
     console.log(response.data);
     window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        {passwordReset == null && (
          <>
            <h1>{translate("Сброс пароля")}</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>E-mail</h6>
                <input
                  type="email"
                  name="email"
                  placeholder={translate("Введите e-mail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button onClick={handlePasswordReset} disabled={!isValidEmail}>
                {translate("Далее")}
              </button>
            </div>
          </>
        )}
        {passwordReset === false && (
          <>
            <h1>{translate("Сброс пароля")}</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>{translate("Код подтверждение")}</h6>
                <input
                  type="text"
                  name="text"
                  placeholder={translate("Введите код из письма")}
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button onClick={handleVerificationEmail} disabled={!isValidCode}>
                {translate("Далее")}
              </button>
            </div>
          </>
        )}
        {passwordReset === true && (
          <>
            <h1>{translate("Сброс пароля")}</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>{translate("Новый пароль")}</h6>
                <input
                  type="text"
                  name="text"
                  placeholder={translate("Введите новый пароль")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button onClick={handleNewPassword} disabled={!isValidPassword}>
                {translate("Далее")}
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
