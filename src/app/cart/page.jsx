import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Cart() {
  return (
    <>
      <Nav />
      <div className={styles.mainContainer}>
        <div className={styles.boxOneProduct}>
          <div className={styles.boxLeft}>
            <div className={styles.selectProduct}></div>
            <h1>Название</h1>
            <h2>Описание:</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Fringilla porttitor
              sollicitudin mattis pellentesque pellentesque. Morbi ac integer
              commodo et vitae egestas volutpat. Tellus interdum montes sit
              ornare lobortis vitae augue at. Cras urna consequat lectus
              accumsan vestibulum pharetra ac mattis viverra. Cursus arcu nibh
              quis varius congue condimentum ipsum. Orci vulputate nec volutpat
              enim. Orci sed sollicitudin diam at ac consequat feugiat sagittis
              proin. Vitae egestas proin pretium amet nec pretium mattis nisl.
              Eu in donec eu tincidunt dui semper mauris purus varius. Vehicula
              in morbi ipsum quam viverra. Vel at sed quam tristique sapien
              imperdiet.
            </p>
            <div className={styles.boxRowPrice}>
              <p>цена</p>
              <p>$500</p>
            </div>
          </div>
          <div className={styles.boxRight}>
            <Image
              src="/oneProduct.png"
              alt="Product"
              width={400}
              height={556}
            />
          </div>
        </div>
        <div className={styles.boxRowSelectAll}>
          <div className={styles.selectAll}>
            <div className={styles.selectProduct}></div>
            <p>Выбрать все</p>
          </div>
          <Link href="/order" className={styles.order}>
            Оформить заказ
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
