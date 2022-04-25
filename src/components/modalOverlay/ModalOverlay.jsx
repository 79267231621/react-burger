import React from 'react';
import styles from './ModalOverlay.module.css';
export default function ModalOverlay (props) {

    const Closed = () =>{
        props.modalVisible(false);
    }

    return (
        <div className={styles.overlay} onClick={Closed}>
        </div>
    )
}