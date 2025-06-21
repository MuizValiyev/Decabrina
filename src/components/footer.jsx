import Image from "next/image";
import Link from "next/link";

import styles from "./footer.module.css";
import { useLanguage } from "@/context/languageContext";

export default function Footer() {
    const {translate} = useLanguage();
    return(
        <>
            <div className={styles.boxFooter}>
                <div className={styles.boxRowFooter}>
                    <div className={styles.boxColumnFooter}>
                        <Link href="/">{translate("главная")}</Link>
                        <Link href="/products">{translate("продукция")}</Link>
                        <Link href="/about">{translate("о предприятии")}</Link>
                        <Link href="/delivery">{translate("доставка")}</Link>
                    </div>

                    <div className={styles.boxColumnFooter}>
                        <Link href="tel:+998901314440">+998 90 131 44 40</Link>
                        <p href="#">{translate("наши соц сети")}</p> 
                        <div className={styles.boxSocials}>
                            <Link href="https://t.me/decabrinaofficial"><Image src="/telegram.svg" alt="telegram" width={24} height={24}/></Link>
                            <Link href="#"><Image src="/telegram.svg" alt="telegram" width={24} height={24}/></Link>
                            <Link href="https://www.instagram.com/decabrina.uz"><Image src="/insta.svg" alt="insta" width={24} height={24}/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}