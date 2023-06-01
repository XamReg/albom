import React from "react";
import styles from "../styles/Modal.module.scss";


interface ModalPr {
    active: boolean;
    setActive: any;
    photo: string | undefined;
}

const Modal = ({active, setActive, photo}: ModalPr) => {
    return (
        <div className={active ? styles.active : styles.wrapper} onClick={() => setActive(false)}>
            <div onClick={ e => e.stopPropagation()}>
                <img 
                    onClick={() => setActive(false)}
                    className={styles.active_img}
                    src={photo}
                    />                
            </div>
        </div>
    )
}

export default Modal;