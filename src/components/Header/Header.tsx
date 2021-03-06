import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

type HeaderProps = {
    login: string,
    isAuth: boolean,
    authLogout: () => void,
}

export const Header: React.FC<HeaderProps> = ({login, isAuth, authLogout}) => {
    return(
<header className={s.header}>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi4G6iWwC9BhsefDuAGPomNr43TyLXeiSZZUiss3cJI293luxIeN01Zqzx6ihrkcuPydk&usqp=CAU'/>

    <div className={s.loginBlock}>
        {isAuth ? <div>{login} - <button onClick={authLogout}>Logout</button></div> : <NavLink to={'/login'}>Login</NavLink>}
    </div>
</header>
    )
}
