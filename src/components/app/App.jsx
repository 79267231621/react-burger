import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';

import { IngredientsContext, ConstructorContext } from '../../services/appContext';

export default function App (){
    const [state, setState] = React.useState({
        ingredients: [],
        ingredConstructor: [],
        isLoading: false,
        hasError: false
    });
    const [ingredients, setIngredients] = React.useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients';

    const constructorState = {
        ingredients: [],
        topBun: [],
        bottomBun: [],
        total: null
    };
    const [constructor, constructorDispatcher] = React.useReducer(updateConstructor, constructorState, undefined);

    function updateConstructor(state, action) {
        switch (action.type) {
            case "add":
                if( action.value.type === 'bun' ){
                    let total = (state.topBun.price)? state.topBun.price : null;
                        total += (state.bottomBun.price)? state.bottomBun.price : null ;
                    return {
                        ingredients: state.ingredients,
                        topBun: action.value,
                        bottomBun: action.value,
                        total: state.total + action.value.price + action.value.price - total
                    };
                } else if( !state.ingredients.find(ingredient => ingredient._id === action.value._id) ) {
                    return {
                        ingredients: [...state.ingredients, action.value ],
                        topBun: state.topBun,
                        bottomBun: state.bottomBun,
                        total: state.total + action.value.price
                    };
                } else {
                    return state;
                }

            case "remove":
                return {
                    ingredients: state.ingredients.filter(ingredient => ingredient._id != action.value._id),
                    topBun: state.topBun,
                    bottomBun: state.bottomBun,
                    total: state.total - action.value.price
                };
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    React.useEffect(() => {
        const getIngredients = async () => {
            setState({ ...state, hasError: false, isLoading: true });
            fetch(url).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then(data => {
                    setState({
                        ...state, isLoading: false
                    })
                    setIngredients( data.data );
                    data.data.forEach(function(item) {
                        constructorDispatcher({
                            type: 'add',
                            value: item
                        });
                    });

                })
                .catch(e => {
                    setState({ ...state, hasError: true, isLoading: false });
                    console.log(e);
                });

        };

        getIngredients();
    }, []);

    return (
        <>
            <AppHeader />
            <main className="container">
                {!state.isLoading &&
                !state.hasError &&
                    <ConstructorContext.Provider value={{ constructor, constructorDispatcher }}>
                        <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </IngredientsContext.Provider>
                    </ConstructorContext.Provider>
                }
            </main>
        </>
    )

}

