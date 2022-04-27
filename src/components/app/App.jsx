import React from 'react';
import AppHeader from '../appHeader/AppHeader';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';

export default function App (){
    const [state, setState] = React.useState({
        ingredients: [],
        ingredConstructor: [],
        isLoading: false,
        hasError: false
    });

    const [url, setUrl] = React.useState('https://norma.nomoreparties.space/api/ingredients')

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
                        ...state, ingredients: data.data, isLoading: false
                    })
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
                state.ingredients &&
                state.ingredConstructor &&
                    <>
                        <BurgerIngredients ingredients={state.ingredients} />
                        <BurgerConstructor ingredients={state.ingredients} />
                    </>
                }
            </main>
        </>
    )

}

