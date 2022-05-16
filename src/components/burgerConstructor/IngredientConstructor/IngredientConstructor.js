import React from 'react';
import styles from './IngredientConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
    DELETE_CONSTRUCTOR_INGREDIENT,
    UPDATE_CONSTRUCTOR_INGREDIENT
} from "../../../services/actions/cart";

export default function IngredientConstructor (props) {
    const dispatch = useDispatch();
console.log(props);
    const [{ opacity }, dragCart] = useDrag({
        type: "cart",
        item: props.item ,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [ , dropCart] = useDrop({
        accept: "cart",
        drop(item) {
            dispatch({
                type: UPDATE_CONSTRUCTOR_INGREDIENT,
                item: item,
                updateItem: props.item
            });
        },
    });

    return (
        <div ref={dropCart}>

            <div className={[styles.ingrid__item].join(" ")}
                 draggable
                 ref={dragCart}
                 style={{ opacity }}
            >
                <DragIcon type="primary" />
                <ConstructorElement
                    text={props.item.name}
                    price={props.item.price}
                    thumbnail={props.item.image}
                    handleClose={() => dispatch({type: DELETE_CONSTRUCTOR_INGREDIENT, item: props.item, index: props.index})}
                />
            </div>
        </div>
    )
}