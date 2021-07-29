import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Recommendation from './recommendations';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Destination from "../Destination/destination";

Enzyme.configure({adapter: new Adapter()})

describe('recommendations', () => {

    test('form renders nothing when given no params',() => {
        const component = render(<Recommendation/>)
        const div = component.getByTestId("none")
        expect(div).toBeDefined()
    })

    test('form renders when given params',() => {
        const category = {"tracks":[{
                "id": '1234',
                "name": 'alex',
                "album":{"images": [
                        {"url":"https://i.scdn.co/image/ab6761610000e5ebed3b89aa602145fde71a163a"},
                        {"url":"https://i.scdn.co/image/ab67616100005174ed3b89aa602145fde71a163a"},
                        {"url":"https://i.scdn.co/image/ab6761610000f178ed3b89aa602145fde71a163a"}
                    ]}

            }]
        }

        const component = render(<Recommendation recs={category}/>)
        const div = component.getByTestId("title")
        expect(div).toBeDefined()

    })

})