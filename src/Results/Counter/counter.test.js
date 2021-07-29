import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Counter from './counter';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('Counter', () => {

    test('counter renders',() => {
        const component = render(<Counter title = "name" count = "1"/>)
        const para = component.getByText("name added: 1")
        const button = component.getByText("Show name")
        expect(para).toHaveTextContent("name added: 1")
        expect(button).toHaveTextContent("Show name")

    })





})