import Image from "next/image";
import Link from "next/link";
import styles from "./nav.module.css";

export default function Nav() {
    return (
        <div className={styles.mainNav}>
            <div className={styles.boxNavCenter}>
                <Image src="/decabrinaLogo.svg" alt="logo" width={408} height={46}/>
                <Link href="#">продукция</Link>
                <Link href="#">о предприятии</Link>
                <Link href="#">доставка</Link>
                <div className={styles.boxSearch}>
                    <button>RU</button>
                </div>
                <button><Image src="/cart.svg" alt="cart" width={28} height={20}/></button>
            </div>
        </div>
    )
}