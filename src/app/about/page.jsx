'use client';
import Image from "next/image";
import styles from "./about.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/languageContext";

export default function About() {
  const {translate} = useLanguage();
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxAbout}>
          <Image
            src="/aboutDecabrina.svg"
            alt="about"
            width={600}
            height={500}
          />
          <h1>{translate("О нас")}</h1>
        </div>
        <div className={styles.boxInfo}>
          <p dangerouslySetInnerHTML={{__html: translate("aboutDecabrina")}}></p>
          <Image src="/about.png" alt="about" width={400} height={556}/>
        </div>
      </div>
      <Footer />
    </>
  );
}