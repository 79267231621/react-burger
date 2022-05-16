import React from 'react';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";

import {useDispatch, useSelector} from "react-redux";
import { DELETE_INGREDIENT_DETAILS} from "../../services/actions/ingredientDetails";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

export default function BurgerIngredients () {
    const dispach = useDispatch();

    const [tab, setTab] = React.useState("bun");
    const { ingredients, groups } = useSelector(store => store.ingredients);
    const ingredientDetails = useSelector( store => store.ingredientDetails.ingredient );

    const closePopup = () => {
        dispach({type:DELETE_INGREDIENT_DETAILS});
    }

    const refs = React.useRef([]);
    refs.current = groups.map((element, index) => refs.current[index] ?? React.createRef());

    const onScroll = (e) => {
        const scrollTop = e.target.scrollTop;

        let possitions = [];
        refs.current.forEach((block, index)=>{
            possitions[index] = Math.abs(scrollTop - block.current.offsetTop);
        })

        const index = possitions.indexOf(Math.min(...possitions));
        setTab(groups[index].value);

    };

    return (
        <section className="col col-50 p-5">
            <p className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <div style={{ display: 'flex' }} className="mb-10 ">
                {groups.map((group, index)=>(
                    <Tab value={group.value} active={tab === group.value} onClick={setTab} key={index}>
                        {group.name}
                    </Tab>
                ))}
            </div>
            <div className={[styles.groupes, "scroll"].join(" ")} onScroll={ (e) => onScroll(e) }>
                {groups.map((group, index)=>(
                    <div className={[styles.groupe__ingrid, "mb-10"].join(" ")}
                         key={group.value}
                         ref={ refs.current[index] }
                    >
                        <p className="text text_type_main-medium mb-3">
                            {group.name}
                        </p>
                        <div className={[styles.ingrid, ""].join(" ")}>
                            {ingredients.map((inrgid, index)=>(
                                inrgid.type === group.value &&
                                    <BurgerIngredient {...inrgid} key={index} />

                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {ingredientDetails.name &&
                <Modal title="Детали ингредиента" closePopup={closePopup} >
                    <IngredientDetails />
                </Modal>
            }
        </section>
    )

}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes)
};
