import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Results from './results';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('results', () => {
    test('results renders nothing given no parameters',() => {
        const component = render(<Results/>)
        const div = component.getByTestId("none")
        expect(div).toBeDefined()
    })

    test('results renders counter', () => {
        const category = {"items":[{
                "id": '1234',
                "name": 'alex',
                "images": [
                    {"url":"https://i.scdn.co/image/ab6761610000e5ebed3b89aa602145fde71a163a"},
                    {"url":"https://i.scdn.co/image/ab67616100005174ed3b89aa602145fde71a163a"},
                    {"url":"https://i.scdn.co/image/ab6761610000f178ed3b89aa602145fde71a163a"}
                ]
            }]
        }
        const component = render(<Results track="blue" name={category}/>)
        const div = component.getByTestId("title")
        expect(div).toBeDefined()

    });



})