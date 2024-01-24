import React from 'react';
import { MovieBanner } from '../components';
import { useSelector } from 'react-redux';

const Home = () => {
	const { url } = useSelector((state) => state.home);

	return (
		<div>
			<MovieBanner />
			<h1>Home PAge us here.. {url.total_pages}</h1>
		</div>
	);
};

export default Home;
