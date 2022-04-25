import React from 'react';
import PropTypes from 'prop-types';

import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


export default function BurgerIngredients (props) {
    const [state, setState] = React.useState({
        ingridGroups: [
            { value: 'bun', name: 'Булки'},
            { value: 'sauce', name: 'Соусы'},
            { value: 'main', name: 'Начинки'}
        ],
    });
    const [current, setCurrent] = React.useState("bun");

    let ingridGroups ={
        bun:[],
        sauce:[],
        main:[],
    };

    props.ingredients.forEach(function(item, index, array) {

        ingridGroups[item.type].push(item);
    });

    const modalVisible = (e, inrgid) => {
        props.modalVisible({
            visible: true,
            type: 'IngredientDetails',
            item: {
                item: inrgid,
                title: 'Детали ингридиента'
            }
        })
    }

    return (
        <section className="col col-50 p-5">
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }} className="mb-10 ">
                {state.ingridGroups.map((group, index)=>(
                    <Tab value={group.value} active={current === group.value} onClick={setCurrent} key={index}>
                        {group.name}
                    </Tab>
                ))}
            </div>
            <div className={[styles.groupes, "scroll"].join(" ")}>
                {state.ingridGroups.map((group, index)=>(
                    <div className={[styles.groupe__ingrid, "mb-10"].join(" ")} key={group.value}>
                        <p className="text text_type_main-medium mb-3">
                            {group.name}
                        </p>
                        <div className={[styles.ingrid, ""].join(" ")}>
                            {ingridGroups[group.value].map((inrgid, index)=>(

                                <div className={[styles.ingrid__item, ""].join(" ")} key={index} onClick={(e) => {
                                    modalVisible(e, inrgid);
                                }}>
                                    {inrgid.__v >= 1 &&
                                        <Counter count={inrgid.__v} size="default" />
                                    }

                                    <div className={[styles.ingrid__img, "ml-4 mr-4"].join(" ")}>
                                        <img src={inrgid.image} alt={inrgid.name} />
                                    </div>
                                    <div className={[styles.ingrid__item__price, "m-1 text text_type_digits-default"].join(" ")}>
                                        {inrgid.price} <CurrencyIcon type="primary" />
                                    </div>
                                    <div className={[styles.ingrid__item__title, "text text_type_main-default"].join(" ")}>
                                        {inrgid.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}

const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number

});

BurgerIngredients.propTypes = {
    modalVisible: PropTypes.func,
    ingredients: PropTypes.arrayOf(ingredientsPropTypes)
};
