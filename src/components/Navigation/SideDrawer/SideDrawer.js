import React from 'react';

import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationIntems';
import classes from './SideDrwaer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliiary';
const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return (<Aux>
         <Backdrop show={props.open} clicked={props.closed}></Backdrop>
        
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <Logo height='11%' marginBottom="32px"/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
            </nav>
        </div>
        </Aux>
    );
};


export default sideDrawer;