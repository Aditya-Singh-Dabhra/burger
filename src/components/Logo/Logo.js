import React from 'react';
import classes from './Logo.module.css';
import BurgerLogo from '../../assets/image/original.png';
const logo=(props)=>(
    <div className={classes.Logo} style={{height:props.height,marginBottom:props.marginBottom}}>
        <img src={BurgerLogo} alt="myBurger"/>
    </div>
);


export default logo;