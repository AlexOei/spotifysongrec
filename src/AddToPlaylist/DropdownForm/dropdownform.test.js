import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import DropdownForm from './dropdownform';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('dropdown form', () => {
    test('dropdown form renders',() => {
        const playlists = {
            "items":[{
                "id":"1234",
                "name":"alex"
            }]
        }

        const component = render(<DropdownForm playlists={playlists}/>)
        const option = component.getByTestId("option")
        expect(option).toHaveTextContent("alex")

    })


})