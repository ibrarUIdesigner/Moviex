import React from 'react';
import {
	ContentWrapper,
	MostViewed,
	MovieBanner,
	Upcoming,
} from '../components';
import { useSelector } from 'react-redux';
import Popular from '../components/popular/Popular';

const Home = () => {
	const { url } = useSelector((state) => state.home);

	return (
		<div>
			<MovieBanner />
			<ContentWrapper>
				<Upcoming />
				<Popular />
				<MostViewed />
			</ContentWrapper>
		</div>
	);
};

export default Home;
