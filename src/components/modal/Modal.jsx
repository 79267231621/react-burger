// hocs/with-toggle.js
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import styles from './Modal.module.css';
import ModalOverlay from '../modalOverlay/ModalOverlay';


import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function Modal (props) {

    React.useEffect(() => {

        document.addEventListener('keydown', handleEscKey)
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        }

    }, []);

    const handleEscKey = (e) => {
        const keyCode = e.key;
        if (keyCode === 'Escape') {
            closePopup();
        }
    }

    const closePopup = () =>{
        props.closePopup(false);
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closePopup={props.closePopup} />
            <div className={[styles.modal, "p-10 pb-15"].join(" ")} >
                <div className={[styles.close, "m-10 mt-15"].join(" ")} onClick={closePopup}>
                    <CloseIcon type="primary" />
                </div>
                <h2 className={[styles.title, "text text_type_main-large"].join(" ")}>
                    {props.title}
                </h2>
                <div className={styles.container}>
                    {props.children}
                </div>
            </div>
        </>,
        document.getElementById('modal')
    );
}

Modal.propTypes = {
    closePopup: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element
};
