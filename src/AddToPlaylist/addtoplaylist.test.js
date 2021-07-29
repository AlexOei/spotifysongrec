import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import AddToPlaylist from "./addtoplaylist";

Enzyme.configure({adapter: new Adapter()})

describe('addtoPlaylist', () => {

    test('dropdown renders',() => {
        const component = shallow(<AddToPlaylist/>)
        expect(component).toBeDefined()
    })



})