import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOC/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../../Store/Actions/index';
import {updateObject , checkValidity} from '../../../shared/utility';
class ContactData extends Component{
      state={
          orderForm:{      
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'YOur Name', 
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },   
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'YOur Street No.', 
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            pinCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'YOur PostalCode', 
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:7,
                },
                valid:false,
                touched:false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country', 
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'YOur E-mail', 
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                },
                valid:false,
                touched:false,
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'Fastest',displayValue:'Fastest'},
                        {value:'Cheapest',displayValue:'Cheapest'}

                    ] 
                },
                validation:{},
                value:'Fastest',
                valid:true,
                touched:false,
            },
          },
          formIsValid:false,
      }

      orderHandler=(event)=>{
          event.preventDefault();
           const formData={};
           for (let formElementIdentifier in this.state.orderForm){
               formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
           }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId,

        }
        this.props.onOrderBurger(order ,this.props.token);
        
      }

      inputChangeHandler=(event,inputIdentifier)=>{
        //   console.log(event.target.value);
          const updatedFormElement= updateObject(this.state.orderForm[inputIdentifier],{
              value:event.target.value,
              valid:checkValidity(event.target.value , this.state.orderForm[inputIdentifier].validation),
              touched:true,
          });
          const updatedOrderForm=updateObject(this.state.orderForm,{
            [inputIdentifier]:updatedFormElement,
          });
          let formIsValid=true;
          for(let inputIdentifer in updatedOrderForm){
              formIsValid=updatedOrderForm[inputIdentifer].valid&&formIsValid;
          }
          
          this.setState({
              orderForm:updatedOrderForm,
              formIsValid:formIsValid,
          });


      }

      render(){
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            });
        }  
        let form =(<form onSubmit={this.orderHandler}>
            {/* <Input elementType={} elementConfig={} value={}></Input> */}
            {formElementArray.map(formElement=>(
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChangeHandler(event,formElement.id)}>
                </Input>
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
        </form>)
        if(this.props.loading){
            form=<Spinner></Spinner>
        }
         return (<div className={classes.ContactData} >
                 <h4>Enter Your Contact Data</h4>
                 {form}
            </div>
         );

      }


}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actionTypes.purchaseBurger(orderData,token)),
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));