import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../shared/utility';
const INGREDIENT_PRICE={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3,
};
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false,
    building:false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:  
        const updatedIngredient={[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
        const updateIngredients=updateObject(state.ingredients,updatedIngredient);
        const updateState={
            ingredients:updateIngredients,
            totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName],
            building:true,
        }
        return updateObject(state,updateState); 

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
             totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName],
             building:true
            };


        case actionTypes.SET_INGREDIENTS:
             return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat,
                },
                totalPrice:4,
                error:false,
                building:false
             };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
              return{
                   ...state,
                   error:true,
              };     
        default:
            return state;
    }
};

export default reducer;