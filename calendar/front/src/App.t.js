import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App', () => {
  const root = render(<App />);
  expect(root).not.toBeNull();
});
