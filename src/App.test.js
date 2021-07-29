import { render, screen } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import {prettyDOM} from "@testing-library/react";

test('renders login button ', () => {
  const component = render(<App/>)
  expect(component.container).toHaveTextContent("Login to Spotify")
});

test('error shows', () => {
  const component = render(<App />)
  const error = component.getByText("Search")
  expect(error).toBeDefined()

});


