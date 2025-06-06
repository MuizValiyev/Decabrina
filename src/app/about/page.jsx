import Image from "next/image";
import styles from "./about.module.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function About() {
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
          <h1>О нас</h1>
        </div>
        <div className={styles.boxInfo}>
          <p>
            DECABRINA - компания занимающийся производством и продажей
            пижам,домашней одежды и аксессуаров для женщин. Наши изделия
            являются исключительно авторскими. Каждая модель кропотливо
            разрабатывается отдельно, исходя из главных потребностей женщин-это
            красота и комфорт во время носки. <br /> Прежде чем мы запускаем в продажу
            новую модель, она проходит тест, что бы мы были уверены сами в своем
            продукте. <br /> <br /> ОСНОВАТЕЛЬНИЦА БРЕНДА-Юлия, является главным
            модельер-конструктором Бренда, запустить свою линейку для женщин было
            ее большой мечтой со студенческих годов, что успешно воплощается в
            реальность уже сейчас. <br /> <br /> ИДЕЯ БРЕНДА - раскрыть внутреннюю силу каждой
            женщины, ее красоту и уникальность. Дать понять, что мы достойны быть
            красивыми даже тогда,когда нас никто не видит, даже дома!Помочь
            обрести гармонию с самой собой, и со своим телом! <br /> <br /> КОЛЛЕКЦИИ DECABRINA
            отличаются своей простотой, лаконичностью и уникальностью. Широкий
            модельный ряд разработан так, что бы вы могли собрать свой уникальный
            набор, подходящий именно вам, все наши модели отлично сочетаются друг
            с другом. <br /> <br /> В НАШЕЙ КОМАНДЕ только лучшие специалисты, ответственно
            подходящие к ценностям Бренда, и так же переживающие за его
            репутацию! <br /> <br /> На данный момент магазин работает в режиме
            онлайн, оформить заказ можно не выходя из дома, через сайт, либо соц
            сети, посредством нашего менеджера. <br /> Для вашего удобства мы так же
            предоставляем услугу «примерка на дом», что существенно экономит ваше
            время на шоппинг! Если вы не смогли найти желаемый набор из
            наличия, мы всегда можем отшить его вам на заказ в течении 5-7
            дней, для этого вам понадобиться выбрать модель из нашего
            каталога, ткань, цвет и размер, а мы воплотим его в реальность! <br /> <br />
            БАЗИРУЕМСЯ мы в Ташкенте (Узбекистан). Доставку осуществляем по всей
            Республике и в любую точку мира. <br /><br />У нас большие амбиции, много
            интересных идей и огромное желание расти и развиваться. Мы с радостью
            рассматриваем интересные предложения о взаимовыгодном
            сотрудничестве, как в Узбекистане, так и за его пределами. <br /> <br /> <br /> С любовью к
            своему делу-команда DECABRINA
          </p>
          <Image src="/about.png" alt="about" width={400} height={556}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
