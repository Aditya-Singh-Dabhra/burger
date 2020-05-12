import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import NavigationItems from './NavigationIntems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<NavigationItems />',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper=shallow(<NavigationItems />);
    })


    it('should render two <NavigationItems /> if you are not authenticated',()=>{
        // const wrapper=shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems /> if you are authenticated',()=>{
        // const wrapper=shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render three <NavigationItems /> if you are authenticated',()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Log-Out</NavigationItem>)).toEqual(true);
    });
});