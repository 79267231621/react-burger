import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../appHeader/AppHeader';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';

import { getIngredients } from "../../services/actions/ingredients";

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export default function App (){
    const dispatch = useDispatch();

    const { ingredientsRequest, ingredientsFailed } = useSelector(
        store => store.ingredients
    );

    React.useEffect(() => {
        dispatch( getIngredients() );
    }, []);

    return (
        <>
            <AppHeader />
            <main className="container">
                {!ingredientsRequest &&
                !ingredientsFailed &&
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                }
            </main>
        </>
    )

}

