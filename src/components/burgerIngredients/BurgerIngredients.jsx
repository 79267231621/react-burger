import React from 'react';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types'
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";

import { IngredientsContext } from '../../services/appContext';

export default function BurgerIngredients () {
    const [state, setState] = React.useState({
        ingridGroups: [
            { value: 'bun', name: 'Булки'},
            { value: 'sauce', name: 'Соусы'},
            { value: 'main', name: 'Начинки'}
        ],
    });
    const [current, setCurrent] = React.useState("bun");
    const [modal, setModal] = React.useState(false);

    const { ingredients } = React.useContext(IngredientsContext);

    const closePopup = () => {
        setModal(false);
    }

    let ingridGroups ={
        bun:[],
        sauce:[],
        main:[],
    };

    ingredients.forEach(function(item) {
        ingridGroups[item.type].push(item);
    });

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
                {state.ingridGroups.map((group)=>(
                    <div className={[styles.groupe__ingrid, "mb-10"].join(" ")} key={group.value}>
                        <p className="text text_type_main-medium mb-3">
                            {group.name}
                        </p>
                        <div className={[styles.ingrid, ""].join(" ")}>
                            {ingridGroups[group.value].map((inrgid, index)=>(

                                <div className={[styles.ingrid__item, ""].join(" ")} key={index} onClick={ () => { setModal(inrgid) } }>
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
            {modal &&
                <Modal title="Детали ингредиента" closePopup={closePopup} >
                    <IngredientDetails item={modal} />
                </Modal>
            }
        </section>
    )

}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes)
};
