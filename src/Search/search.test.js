import React from 'react'
import {fireEvent, getByTestId, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Form from '../Form/form';
import Search from './search'
import handleClick from './search'
import mount from "enzyme/src/shallow";

const mock = () => {
    return ''
}

describe('Search', () => {
    test('search renders',() => {
        const component = render(<Search title = "mock"/>)
        expect(component.container).toHaveTextContent("mock")
    })

    test('handleClick', () => {
        const mockClick = jest.fn()
        const component = render(<Search/>)
        const form = component.container.querySelector('form')
        fireEvent.submit(form)
        expect(mockClick.mock.calls).toHaveLength(1)

    });

    test ('handleChange', () => {

        const component = mount(<Search/>)
        component.find("input").instance().value = "lmfao"



    })


})