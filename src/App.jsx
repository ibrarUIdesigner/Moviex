import { useEffect } from 'react';
import './App.css';
import { Home } from './pages';
import { fetchDataFormAPI } from './services/api';
import { useSelector, useDispatch } from 'react-redux';
import { getAPIConfiguration } from './store/home.slice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		fetchAPIConfigs();
	}, []);
	const fetchAPIConfigs = async () => {
		let res = await fetchDataFormAPI('/configuration');

		if (res) {
			let url = {
				backdrop: res.images.secure_base_url + 'original',
				poster: res.images.secure_base_url + 'original',
				profile: res.images.secure_base_url + 'original',
			};

			dispatch(getAPIConfiguration(url));
		}
	};
	return (
		<>
			<Home />
		</>
	);
}

export default App;
