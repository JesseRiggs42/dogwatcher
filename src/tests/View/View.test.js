import { render, screen } from '@testing-library/react';
import View from '../../view/View';
import React from 'react';
// TODO: For future tests
// https://stackoverflow.com/questions/53961469/testing-chart-js-with-jest-enzyme-failed-to-create-chart-cant-acquire-contex

jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null
}));

// afterAll(() => {
//   global.gc();
// });

test('renders learn react link', () => {
    let controller = { getTestMessage:() => "Greatings from the controller." }
    render(<View controller={controller} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
