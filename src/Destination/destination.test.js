import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Destination from './destination';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('destination', () => {

    test('form renders nothing when given no params',() => {
        const component = render(<Destination/>)
        const div = component.getByTestId("none")
        expect(div).toBeDefined()
    })

    test('form renders when given params',() => {
        const playlists = {
            "items":[{
                "id":"1234",
                "name":"alex"
            }]
        }
        const component = render(<Destination playlists={playlists} token="123" recs="lol" />)
        const div = component.getByTestId("option")
        expect(div).toBeDefined()
    })

})