import Image from "next/image";
import styles from "./delivery.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Delivery() {
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div
          className={styles.boxDelivery}
          style={{ backgroundImage: `url('/delivery.png')` }}
        >
          <h1>Доставка</h1>
        </div>
        <div className={styles.boxInfo}>
          <div>
            <li>В Ташкенте отправляем через курьера.</li>
            <li>По Узбекистану отправляем через BTS.</li>
            <li>За границей отправляем по договору с клиентом.</li>
          </div>
          <Image src="/delivery2.png" alt="delivery" width={400} height={556} />
        </div>
      </div>
      <Footer />
    </>
  );
}
