import React, { Component } from 'react';
import classes from './Layout.module.css';
import {connect } from 'react-redux';
import Aux from '../../HOC/Auxiliiary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
  state={
    showSideDrawer:false,
  }
  sideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer:false});

  }

  sideDrawerOpenHandler=()=>{
    this.setState((prevState=>{
      return {showSideDrawer:!prevState.showSideDrawer}
    }));
  }

     render(){
       return (<Aux>
        <div >
            <Toolbar
             isAuth={this.props.isAuthenticated} 
             toOpen={this.sideDrawerOpenHandler}>
            </Toolbar>
            <SideDrawer open={this.state.showSideDrawer}
             isAuth={this.props.isAuthenticated} 
             closed={this.sideDrawerClosedHandler}>
            </SideDrawer>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
        </Aux>
       )
     }

} 

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
  };
};





export default connect(mapStateToProps)(Layout);