import React from 'react';
import styles from './IngredientConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import {
    deleteConstructorIngredient, updateConstructorIngredient
} from "../../../services/actions/cart";

export default function IngredientConstructor (props) {
    const dispatch = useDispatch();

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
            dispatch( updateConstructorIngredient(item, props.item) );
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
                    handleClose={() => dispatch(deleteConstructorIngredient(props.item) )}
                />
            </div>
        </div>
    )
}