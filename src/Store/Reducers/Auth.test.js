import reducer from './Auth';
import * as actionTypes from '../Actions/actionTypes';

describe('auth reducer',()=>{
    it('should return the intial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/',
        });
    });

    it('should store token upon login',()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/',
        } , { type:actionTypes.AUTH_SUCCESS,
            idToken:'test value',
            userId:'anything',})).toEqual({
                token:'test value',
                userId:'anything',
                error:null,
                loading:false,
                authRedirectPath:'/',
            });
    });
});