import React from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import { ConstructorElement, Button, DragIcon, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor (props) {
    const [total, setTotal] = React.useState(610);
    const [orderPopup, setOrderPopup] = React.useState(false);

    React.useEffect(() => {
        const calculation = () => {
            let calculationTotal = null;
            for (var i = 0; i < props.ingredients.length; i++) {
                calculationTotal += props.ingredients[i].price;
            }
            setTotal(calculationTotal);
        }

        calculation();
    }, [props.ingredients]);

    const modalVisible = () => {
        props.modalVisible({
            visible: true,
            type: 'OrderDetails',
            item: {
                item: {number:'023452'}
            }
        })
    }

    return (
        <section className="col col-50 mt-25 pl-4 pr-4">

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>

                <div className={[styles.ingrid, "scroll"].join(" ")}>
                        {props.ingredients.map((element, index)=>(
                            <div  className={styles.ingrid__item} key={index}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={element.name}
                                    price={element.price}
                                    thumbnail={element.image}
                                />
                            </div>
                        ))}

                </div>
                <div className={[styles.burgerTop, "ml-8"].join(" ")}>

                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
            </div>
            <footer className={[styles.constructor__footer, "mt-10"].join(" ")}>
                <div className={[styles.constructor__footer__total, "text text_type_digits-medium mr-10"].join(" ")}>
                    {total}
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={modalVisible}>
                    Оформить заказ
                </Button>

            </footer>

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

BurgerConstructor.propTypes = {
    modalVisible: PropTypes.func,
    topBurger: PropTypes.arrayOf(ingredientsPropTypes),
    ingredients: PropTypes.arrayOf(ingredientsPropTypes),
    bottomBurger: PropTypes.arrayOf(ingredientsPropTypes)
};
