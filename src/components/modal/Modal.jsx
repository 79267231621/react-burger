// hocs/with-toggle.js
import React from 'react';
import PropTypes from "prop-types";
import styles from './Modal.module.css';
import ModalOverlay from '../modalOverlay/ModalOverlay';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import OrderDetails from '../orderDetails/OrderDetails';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";


export default function Modal (props) {
    const [type, setType] = React.useState();

    React.useEffect(() => {

        document.addEventListener('keypress', keypressEsc)
        return () => {
            document.removeEventListener("keypress", keypressEsc);
        }

    }, []);

    const keypressEsc = (e) => {
        let keyCode = e.keyCode;
        if (keyCode === '27') {
            Closed();
        }
    }

    const Closed = () =>{
        props.modalVisible(false);
    }

    return (
        <>
            <ModalOverlay modalVisible={props.modalVisible} />
            <div className={[styles.modal, "p-10 pb-15"].join(" ")} >
                <div className={[styles.close, "m-10 mt-15"].join(" ")} onClick={Closed}>
                    <CloseIcon type="primary" />
                </div>
                <h2 className={[styles.title, "text text_type_main-large"].join(" ")}>
                    {props.title}
                </h2>
                <div className={styles.container}>
                    {props.type == "IngredientDetails" &&
                        <IngredientDetails item={props.item} />
                    }
                    {props.type == "OrderDetails" &&
                        <OrderDetails item={props.item} />
                    }
                </div>
            </div>
        </>
    )
}

Modal.propTypes = {
    modalVisible: PropTypes.func,
    title: PropTypes.string,
    item: PropTypes.object,
    type: PropTypes.string
};
