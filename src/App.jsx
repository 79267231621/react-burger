import React from 'react';
import './App.css';
import AppHeader from './components/appHeader/AppHeader';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients';
import Modal from './components/modal/Modal';

//class App extends React.Component {
export default function App (){
    const [state, setState] = React.useState({
        ingredients: [],
        ingredConstructor: [],
        isLoading: false,
        hasError: false
    });

    const [url, setUrl] = React.useState('https://norma.nomoreparties.space/api/ingredients')

    const [ingredientPopup, setIngredientPopup] = React.useState(false);
    const [orderPopup, setOrderPopup] = React.useState(false);

    React.useEffect(() => {
        const getIngredients = async () => {
            setState({ ...state, hasError: false, isLoading: true });
            fetch(url)
                .then(res => res.json())
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

    /* Modal */
    const [modalType, setModalType] = React.useState();
    const [modalItem, setModalItem] = React.useState();
    const [modal, setModal] = React.useState(false);

    const modalVisible = (array) => {
        if( array !== false ){
            setModal(true);
            setModalItem(array.item);
            setModalType(array.type);
        }else{
            setModal(false);
        }

    }
    return (
        <>
            <AppHeader />
            <main className="container">
                {!state.isLoading &&
                !state.hasError &&
                state.ingredients &&
                state.ingredConstructor &&
                    <>
                        <BurgerIngredients ingredients={state.ingredients} modalVisible={modalVisible} />
                        <BurgerConstructor ingredients={state.ingredients} modalVisible={modalVisible} />
                    </>
                }
            </main>
            {modal &&
            modalType &&
                <Modal title={modalItem.title} item={modalItem.item} type={modalType} modalVisible={modalVisible} />
            }


        </>
    )

}

