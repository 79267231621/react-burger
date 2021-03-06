// hocs/with-toggle.js
import React from 'react';
import styles from './OrderDetails.module.css';
import {useSelector} from "react-redux";

export default function OrderDetails () {

    const order = useSelector(
        store => store.order
    );

    return (
        <>
            <div className={[styles.title, "text text_type_digits-large mt-4"].join(" ")} >
                {order.number}
            </div>
            <p className="text text_type_main-medium mt-8 mb-15">
                Идентификатор заказа
            </p>
            <div className={styles.icon}>

            </div>
            <p className="text text_type_main-default mt-15 mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </p>

        </>
    )
}
