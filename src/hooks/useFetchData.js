import { useEffect, useState } from 'react';
import { fetchDataFormAPI } from '../services/api';

const useFetchData = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	console.log('URL', url);

	useEffect(() => {
		setLoading('Loading ...');
		setError(null);
		setData(null);
		fetchData();
	}, [url]);

	const fetchData = async () => {
		let result = await fetchDataFormAPI(url);

		if (result) {
			setData(result);
			setLoading(false);
			setError(null);
		} else {
			setData(null);
			setLoading(false);
			setError('Some error');
		}
	};

	return { data, loading, error };
};

export default useFetchData;
