"use client";
import Image from "next/image";
import useApi from "@/utils/api";
import styles from "./password-reset.module.css";
import { useState } from "react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function PasswordReset() {
  const api = useApi();

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
            <h1>Сброс пароля</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>E-mail</h6>
                <input
                  type="email"
                  name="email"
                  placeholder="Введите e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button onClick={handlePasswordReset} disabled={!isValidEmail}>
                Далее
              </button>
            </div>
          </>
        )}
        {passwordReset === false && (
          <>
            <h1>Сброс пароля</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>Код подтверждение</h6>
                <input
                  type="text"
                  name="text"
                  placeholder="Введите код из письма"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button onClick={handleVerificationEmail} disabled={!isValidCode}>
                Далее
              </button>
            </div>
          </>
        )}
        {passwordReset === true && (
          <>
            <h1>Сброс пароля</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>Новый пароль</h6>
                <input
                  type="text"
                  name="text"
                  placeholder="Введите новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button onClick={handleNewPassword} disabled={!isValidPassword}>
                Далее
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
