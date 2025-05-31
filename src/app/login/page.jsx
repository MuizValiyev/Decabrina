"use client";
import Image from "next/image";
import styles from "./login.module.css";
import { useState } from "react";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Login() {
  const [login, setLogin] = useState(1);

  const [email, setEmail] = useState("");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const isValidName = firstName === "" || lastName === "";

  const [password, setPassword] = useState("");
  const isValidPassword = password.length >= 8;

  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        {login === 1 && (
          <>
            <h1>Вход или регистрация</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>E-mail</h6>
                <input
                  type="email"
                  placeholder="Введите e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button onClick={() => setLogin(2)} disabled={!isValidEmail}>
                Далее
              </button>
            </div>
          </>
        )}
        {login === 2 && (
          <>
            <h1>Регистрация</h1>
            <div className={styles.boxForm}>
              <div className={styles.boxOneInput}>
                <h6>Имя</h6>
                <input
                  type="text"
                  placeholder="Введите имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.boxOneInput}>
                <h6>Фамилия</h6>
                <input
                  type="text"
                  placeholder="Введите фамилию"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.boxButtons}>
                <button onClick={() => setLogin(1)}>Назад</button>
                <button onClick={() => setLogin(3)} disabled={isValidName}>Далее</button>
              </div>
            </div>
          </>
        )}
        {login === 3 && (
            <>
                <h1>Верификация</h1>
                <div className={styles.boxForm}>
                    <div className={styles.boxOneInput}>
                        <h6>Пароль</h6>
                        <input type="text" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={styles.boxButtons}>
                        <button onClick={() => setLogin(2)}>Назад</button>
                        <button onClick={() => setLogin(4)} disabled={!isValidPassword}>Войти</button>
                    </div>
                </div>
            </>
        )}
      </div>
      <Footer />
    </>
  );
}
