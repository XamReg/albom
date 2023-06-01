import React from "react";
import styles from "../styles/Modal.module.scss";

interface IBasketModal {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Basket = ({active, setActive}: IBasketModal) => {
    return (
        <div className={active ? styles.activeBasket : styles.wrapper} onClick={() => setActive(false)}>
            <div onClick={ e => e.stopPropagation()}>
                <h1 
                    className={styles.activeBasket_text}
                    >Продукты успешно добавлены в корзину</h1>   
                <button
                    className={styles.activeBasket_button}
                    >Перейти в корзину</button>
            </div>
        </div>
    )
}

export default Basket;