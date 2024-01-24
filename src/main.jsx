import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Details, PageNotFound } from './pages';

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/details', element: <Details /> },
	{ path: '*', element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</>,
);
