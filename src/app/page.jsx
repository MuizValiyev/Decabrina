import Image from "next/image";
import styles from "./home.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxCategories}>
          <div className={styles.oneCategory} style={{backgroundImage: `url('/inTrends.png')`}}>
            <h1>В тренде</h1>
          </div>
          <div className={styles.oneCategory} style={{backgroundImage: `url('/inTrends.png')`}}>
            <h1>В тренде</h1>
          </div>
        </div>

        <div className={styles.boxThrends}>
          <h1>Тренды</h1>
          <div className={styles.boxScroll}>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
            <div className={styles.oneThrend}>
              <Image
                src="/oneThrend.svg"
                alt="oneThrend"
                width={316}
                height={440}
              />
              <h2>Название</h2>
              <p>Цена</p>
            </div>
          </div>
        </div>

        <div className={styles.boxInfo}>
          <h1>DECABRINA - это исключительно авторские работы.</h1>
          <p>
            Мы разрабатываем модели с учетом комфорта, красоты и лаконичности,
            так, что бы каждая смогла найти у нас что то свое. В нашем
            интернет-магазине вы сможете оформить заказ всего за несколько
            минут, оплатить его удобным способом и заказать доставку в любой
            город или страну.
          </p>
          <p>Наслаждайтесь покупками, не выходя из дома!</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
