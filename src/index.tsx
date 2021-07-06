import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStoreWithApiConfig } from './store';
import { apiConfig } from './apiConfig';

import * as Sentry from '@sentry/react';
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://aa0edea63055490f9f55e6cbe7fc9a7b@o913027.ingest.sentry.io/5850497",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const store = createStoreWithApiConfig(apiConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App borderColour="blue" />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
