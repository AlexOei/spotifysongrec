import React from 'react'
import {fireEvent, getByTestId, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ResultList from './resultlist';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('resultList', () => {
    test('resultList renders nothing',() => {
        const component = render(<ResultList/>)
        const element = component.getByTestId("test")
        expect(element).toBeDefined()
    })

    test('resultList renders given category data', () => {
        const category = {"items":[{
            "id": '1234',
            "name": 'alex'
            }]
        }
        const component = render(<ResultList category={category} title="name"/>)
        const title = component.getByTestId("title")
        const tracks = component.getByText("alex")
        expect(title).toHaveTextContent('name')
        expect(tracks).toHaveTextContent("alex")

    });



})