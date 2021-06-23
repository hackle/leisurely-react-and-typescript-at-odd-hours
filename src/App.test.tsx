import React, { useRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { createStoreWithApiConfig } from './store';
import { PixaResponse } from './apiConfig';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

const pixaResponse: PixaResponse = {
  hits: [
    {
      previewURL: 'http://preview.url',
      largeImageURL: 'http://large.url',
      webformatURL: 'http://web.url'
    }
  ]
};
const store = createStoreWithApiConfig({
  loadImages: async () => pixaResponse
})

test('Renders app and can search', async () => {
  render(
      <Provider store={store}>
        <App borderColour="blue" />
      </Provider>
    );

  const searchButton = screen.getByRole('button', { name: 'Search' });

  fireEvent.click(searchButton);

  const errorMsg = await screen.findByText('Term is required');

  expect(errorMsg).not.toBeNull();

  const termInput = screen.getByRole('textbox');
  
  userEvent.type(termInput, 'tiger');

  userEvent.click(searchButton);

  await waitFor(() => screen.getByRole('img'));
});
