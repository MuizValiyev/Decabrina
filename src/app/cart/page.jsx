import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Cart() {
    return (
    <>
        <Nav />
            <div className={styles.mainContainer}></div>
        <Footer />
    </>
    )
}