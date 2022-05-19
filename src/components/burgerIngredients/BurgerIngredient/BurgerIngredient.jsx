import React from 'react';
import styles from './BurgerIngredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT_DETAILS} from "../../../services/actions/ingredientDetails";

import { useDrag } from 'react-dnd';

export default function BurgerIngredient (props) {

    const dispach = useDispatch();

    const cart = useSelector(
        store => store.cart
    );
    const counter = cart.ingredients.filter(ingredient => ingredient._id === props._id).length;


    const openPopup = (item) => {
        dispach({type:ADD_INGREDIENT_DETAILS, item: item});
    }

    const [, drag] = useDrag({
        type: "ingredient",
        item: props
    });


    return (
        <div className={[styles.ingrid__item, ""].join(" ")}
             onClick={ () => { openPopup(props) } }
             ref={drag}
        >
            {counter >= 1 &&
                <Counter count={counter} size="default" />
            }

            <div className={[styles.ingrid__img, "ml-4 mr-4"].join(" ")}>
                <img src={props.image} alt={props.name} />
            </div>
            <div className={[styles.ingrid__item__price, "m-1 text text_type_digits-default"].join(" ")}>
                {props.price} <CurrencyIcon type="primary" />
            </div>
            <div className={[styles.ingrid__item__title, "text text_type_main-default"].join(" ")}>
                {props.name}
            </div>
        </div>
    )

}
