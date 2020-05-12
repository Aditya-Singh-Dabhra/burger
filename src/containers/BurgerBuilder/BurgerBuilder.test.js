import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({adapter:new Adapter()});

describe('<BurgerBUilder',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}></BurgerBuilder>);
    });

    it('should render <BuildControls/> when recieving ingredients',()=>{
        wrapper.setProps({'ings':{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});