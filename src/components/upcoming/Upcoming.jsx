import React, { useState } from 'react';
import { FaBeer, FaCaretRight } from 'react-icons/fa';
import SwitchMovie from '../SwitchMovie';
import useFetchData from '../../hooks/useFetchData';
import SingleMovieCard from './SingleMovieCard';

const Upcoming = () => {
	const [endpoint, setEndpoint] = useState('day');
	const { data, error, loading } = useFetchData(`/trending/all/${endpoint}`);

	//? SWITCH TABS
	const onSwithTabChange = (tab, index) => {
		setEndpoint(tab == 'Day' ? 'day' : 'week');
		console.log(data);
	};

	return (
		<div className=''>
			<div className='header mb-8 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='w-6 h-8 flex items-center justify-center bg-purple-700  rounded-md'>
						<FaCaretRight color='white' />
					</span>
					<strong className='text-white uppercase text-lg'>Upcoming</strong>
				</div>
				<h3>
					<SwitchMovie
						onSwithTabChange={onSwithTabChange}
						data={['Day', 'Week']}
					/>
				</h3>
			</div>

			<div className='movies-data grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{data?.results.slice(0, 6).map((movie, index) => (
					<SingleMovieCard data={movie} key={movie.id} />
				))}
			</div>
		</div>
	);
};

export default Upcoming;
