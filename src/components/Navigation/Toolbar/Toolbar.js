import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationIntems';
import Menu from '../SideDrawer/Menu/Menu'


const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <Menu toOpen={props.toOpen}></Menu>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
        </nav>
    </header>
);


export default toolbar;