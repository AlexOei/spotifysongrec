import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CreatePlaylist from './createplaylist';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({adapter: new Adapter()})

describe('createPlaylist', () => {

    test('form renders',() => {
        const component = render(<CreatePlaylist/>)
        expect(component).toBeDefined()
    })



})