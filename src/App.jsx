import { useEffect } from 'react';
import './App.css';
import { Home } from './pages';
import { fetchDataFormAPI } from './services/api';
import { useSelector, useDispatch } from 'react-redux';
import { getAPIConfiguration } from './store/home.slice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		apiTest();
	}, []);
	const apiTest = async () => {
		let res = await fetchDataFormAPI('movie/popular');

		if (res) {
			dispatch(getAPIConfiguration(res));
			console.log(res);
		}
	};
	return (
		<>
			<Home />
		</>
	);
}

export default App;
