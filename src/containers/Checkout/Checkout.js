import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContatctData';

class Checkout extends Component{


    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    checkoutcancelledHandler=()=>{
          this.props.history.goBack();
    }

    checkoutcontinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
  
render(){
   let summary= <Redirect to='/' />
   
   if(this.props.ings){
       const purchasedRedirect= this.props.purchased?<Redirect to='/' />:null;
       summary=(
       <div>
            {purchasedRedirect}
            <CheckoutSummary
             ingredients={this.props.ings}
             checkoutCancelled={this.checkoutcancelledHandler}
             checkoutContinue={this.checkoutcontinueHandler}></CheckoutSummary>
             <Route path={this.props.match.path+'/contact-data'}
              component={ContactData}></Route>
        </div>);
   }
    return summary
}


}

const mapStateTOProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
    };
};

export default connect(mapStateTOProps)(Checkout);