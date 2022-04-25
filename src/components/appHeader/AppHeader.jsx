import React from 'react';
import styles from './AppHeader.module.css';

import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {


    render() {

        return (
            <header>
                <div className="container">
                    <div className="col col-33">
                        <nav className={styles.nav}>
                            <div className={[styles.nav__item, styles.active,"text","text_type_main-default", "p-5", "m-1"].join(" ")}>
                                <BurgerIcon type="primary" />
                                <span className="ml-2">Конструктор</span>
                            </div>
                            <div className={[styles.nav__item,"text","text_type_main-default", "p-5", "m-1"].join(" ")}>
                                <ListIcon type="secondary" />
                                <span className="ml-2">Лента заказов</span>
                            </div>
                        </nav>
                    </div>
                    <div className="col col-33">
                        <div className={styles.logo}>
                            <Logo />
                        </div>
                    </div>
                    <div className="col col-33 text-rigth">
                        <nav className={styles.nav_right}>
                            <div className={[styles.nav__item,"text","text_type_main-default", "p-5", "m-1"].join(" ")}>
                                <ProfileIcon type="secondary" />
                                <span className="ml-2">Личный кабинет</span>
                            </div>
                        </nav>
                    </div>

                </div>

            </header>
        )
    }
}

export default AppHeader;