import React from 'react';
import styles from './IngredientDetails.module.css';

import { useSelector } from 'react-redux';


export default function IngredientDetails () {
    const { ingredient } = useSelector(
        store => store.ingredientDetails
    );

    return (
        <>
            <img className={styles.img} src={ingredient.image_large} alt={ingredient.name} />
            <div className={[styles.title, "text text_type_main-medium mt-4 mb-8"].join(" ")} >
                {ingredient.name}
            </div>
            <div className={[styles.nutritional, "text text_type_main-default text_color_inactive"].join(" ")}>
                <div className={styles.nutritional__item}>
                    Калории, ккал<br/>
                <span className="text text_type_digits-default">{ingredient.calories}</span>
                </div>
                <div className={styles.nutritional__item}>
                    Белки, г<br/>
                <span className="text text_type_digits-default">{ingredient.proteins}</span>
                </div>
                <div className={styles.nutritional__item}>
                    Жиры, г<br/>
                    <span className="text text_type_digits-default">
                        {ingredient.fat}
                    </span>
                </div>
                <div className={styles.nutritional__item}>
                    Углеводы, г<br/>
                    <span className="text text_type_digits-default">
                        {ingredient.carbohydrates}
                    </span>
                </div>
            </div>

        </>
    )
}
