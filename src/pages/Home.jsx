import React from 'react';
import { ContentWrapper, MovieBanner, Upcoming } from '../components';
import { useSelector } from 'react-redux';

const Home = () => {
	const { url } = useSelector((state) => state.home);

	return (
		<div>
			<MovieBanner />
			<ContentWrapper>
				<Upcoming />
			</ContentWrapper>
		</div>
	);
};

export default Home;
