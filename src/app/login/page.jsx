"use client";
import Image from "next/image";
import styles from "./login.module.css";
import { useState } from "react";

import useApi from "@/utils/api";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cookies from "js-cookie";

export default function Login() {
  const api = useApi();

  const [login, setLogin] = useState(null);

  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const [password, setPassword] = useState("");
  const isValidPassword = password.length >= 8;
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isValidName = firstName !== "" && lastName !== "" && password.length >= 8;
  
  const handleCheckEmail = async () => {
    try {
      const response = await api.post("users/check-email/", {
        email: email,
      });
      console.log(response.data);
      setLogin(response.data.registered);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistred = async () => {
    try {
      const response = await api.post("users/register/", {
        email:email,
        first_name: firstName,
        last_name:lastName,
        password:password,
      });
      console.log(response.data);
      setLogin(response.data.registered);
      Cookies.set("access_token", response.data.tokens.access, { expires: 7 });
      Cookies.set("refresh_token", response.data.tokens.refresh, { expires: 7 });
      window.location.href = '/';
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  
  const handleLogin = async () => {
    try {
      const response = await api.post("users/login/", {
        email: email,
        password: password,
      });
      console.log(response.data);
      window.location.href = '/';
      Cookies.set("access_token", response.data.tokens.access, { expires: 7 });
      Cookies.set("refresh_token", response.data.tokens.refresh, { expires: 7 });
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        {login === null && (
          <>
            <h1>Вход или регистрация</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>E-mail</h6>
                <input
                  type="email" name="email"
                  placeholder="Введите e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button onClick={handleCheckEmail} disabled={!isValidEmail}>
                Далее
              </button>
            </div>
          </>
        )}
        {login === false && (
          <>
            <h1>Регистрация</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>Имя</h6>
                <input
                  type="name"
                  name="name"
                  placeholder="Введите имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.boxOneInput}>
                <h6>Фамилия</h6>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Введите фамилию"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.boxOneInput}>
                <h6>Пароль</h6>
                <input
                  type="text"
                  placeholder="Придумайте пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.boxButtons}>
                <button onClick={() => setLogin(null)}>Назад</button>
                <button onClick={handleRegistred} disabled={!isValidName}>
                  Далее
                </button>
              </div>
            </div>
          </>
        )}
        {login === true && (
          <>
            <h1>Вход</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>Пароль</h6>
                <input
                  type="text"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.boxButtons}>
                <button onClick={() => setLogin(null)}>Назад</button>
                <button onClick={handleLogin} disabled={!isValidPassword}>
                  Войти
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
