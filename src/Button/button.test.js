import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Button from './button';
import {prettyDOM} from "@testing-library/react";

test('button clicks', () => {
    const mockHandler = jest.fn()
    const component = render(<Button handleClick = {mockHandler} title = "mock"/>)
    const button = component.getByText('mock')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
});