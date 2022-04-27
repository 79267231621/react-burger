import React from 'react';
import styles from './ModalOverlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay (props) {

    const closePopup = () =>{
        props.closePopup(false);
    }

    return (
        <div className={styles.overlay} onClick={closePopup}>
        </div>
    )
}

ModalOverlay.propTypes = {
    closePopup: PropTypes.func,
};