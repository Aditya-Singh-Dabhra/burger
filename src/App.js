import React,{Component} from 'react';
import {Route ,Switch,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/Actions/index';

class App  extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    let routes=(
      <Switch>
      <Route path='/auth' component={Auth}></Route>
      <Route path='/' exact component={BurgerBuilder}></Route>
      <Redirect to='/'></Redirect>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes=<Switch>
      <Route path='/checkout' component={Checkout}></Route>
      <Route path='/orders' component={Orders}></Route>
      <Route path='/auth' component={Auth}></Route>
      <Route path='/logout' component={Logout}></Route>
      <Route path='/' exact component={BurgerBuilder}></Route>
      </Switch>
    }
  return (
    <div >
      <Layout>
      <Switch>
      {routes}
      </Switch>
      </Layout>
    </div>
  );
}
}

const mapStateToProps=state=>{
  return {
    isAuthenticated:state.auth.token !== null,
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
