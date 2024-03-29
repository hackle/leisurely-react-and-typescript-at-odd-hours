import React, { useRef } from 'react';
import { findByRole, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { createStoreWithApiConfig } from './store';
import { PixaResponse } from './apiConfig';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { AppUser } from './auth/auth';

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
  loadImages: async () => pixaResponse,
  loadUser: async () => ({ } as AppUser)
});

xtest('Renders app and can search', async () => {
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

  const rotateButton = screen.getByRole('button', { name: 'Rotate' });
  userEvent.click(rotateButton);

  const rotatedImg = await screen.findByRole('img');

  expect(rotatedImg.style.transform).toEqual('rotate(15deg)');
});
