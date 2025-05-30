import Image from "next/image";
import Link from "next/link";

import styles from "./footer.module.css";

export default function Footer() {
    return(
        <>
            <div className={styles.boxFooter}>
                <div className={styles.boxRowFooter}>
                    <div className={styles.boxColumnFooter}>
                        <Link href="/">главная</Link>
                        <Link href="#">продукция</Link>
                        <Link href="#">о предприятии</Link>
                        <Link href="#">доставка</Link>
                    </div>

                    <div className={styles.boxColumnFooter}>
                        <Link href="tel:+998901314440">+998 90 131 44 40</Link>
                        <p href="#">наши соц сети</p> 
                        <div className={styles.boxSocials}>
                            <Link href="#"><Image src="/telegram.svg" alt="telegram" width={24} height={24}/></Link>
                            <Link href="#"><Image src="/telegram.svg" alt="telegram" width={24} height={24}/></Link>
                            <Link href="#"><Image src="/insta.svg" alt="insta" width={24} height={24}/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}