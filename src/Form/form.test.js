import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Form from './form';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('form', () => {
    test('form renders',() => {
        const component = render(<Form title = "mock"/>)
        expect(component.container).toHaveTextContent("mock")
    })

    test('handleClick', () => {
        const mockClick = jest.fn()
        const mockChange = jest.fn()
        const component = render(<Form handleClick={mockClick} handleChange={mockChange}/>)
        const form = component.container.querySelector('form')
        fireEvent.submit(form)
        expect(mockClick.mock.calls).toHaveLength(1)

    });

    test('handleChange', () => {
        const component = mount(<Form/>)
        component.find("input").instance().value = "lol"
        expect(component.find("input").instance().value).toEqual("lol")

    })


})

