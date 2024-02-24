import { render, screen } from '@testing-library/react';
import View from '../view/View';
import React from 'react';

test('renders learn react link', () => {
  render(<View />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
