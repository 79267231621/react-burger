// hocs/with-toggle.js
import React from 'react';
import PropTypes from "prop-types";
import styles from './IngredientDetails.module.css';
import BurgerConstructor from "../burgerConstructor/BurgerConstructor";


export default function IngredientDetails (props) {
    const [type, setType] = React.useState();

    return (
        <>
            <img className={styles.img} src={props.item.image_large} />
            <div className={[styles.title, "text text_type_main-medium mt-4 mb-8"].join(" ")} >
                {props.item.name}
            </div>
            <div className={[styles.nutritional, "text text_type_main-default text_color_inactive"].join(" ")}>
                <div className={styles.nutritional__item}>
                    Калории, ккал<br/>
                <span className="text text_type_digits-default">{props.item.calories}</span>
                </div>
                <div className={styles.nutritional__item}>
                    Белки, г<br/>
                <span className="text text_type_digits-default">{props.item.proteins}</span>
                </div>
                <div className={styles.nutritional__item}>
                    Жиры, г<br/>
                    <span className="text text_type_digits-default">
                        {props.item.fat}
                    </span>
                </div>
                <div className={styles.nutritional__item}>
                    Углеводы, г<br/>
                    <span className="text text_type_digits-default">
                        {props.item.carbohydrates}
                    </span>
                </div>
            </div>

        </>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.object
};