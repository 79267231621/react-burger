import React from 'react';
import styles from './ModalOverlay.module.css';
export default function ModalOverlay (props) {

    const closePopup = () =>{
        props.closePopup(false);
    }

    return (
        <div className={styles.overlay} onClick={closePopup}>
        </div>
    )
}