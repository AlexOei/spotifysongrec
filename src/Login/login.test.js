import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Login from './login';
import {prettyDOM} from "@testing-library/react";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('login', () => {

    test('button renders', () => {
        const component = shallow(<Login/>)
        const button = component.find('button')
        expect(button.text()).toBe('Login to Spotify')
    })

})


