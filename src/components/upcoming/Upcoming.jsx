import React, { useRef, useState } from 'react';

import { MdArrowCircleRight, MdArrowCircleLeft } from 'react-icons/md';
import SwitchMovie from '../SwitchMovie';
import useFetchData from '../../hooks/useFetchData';
import SingleMovieCard from './SingleMovieCard';
import './styles.css';
import Skelton from '../Skelton';
import MoviesHeaderTitle from '../MoviesHeaderTitle';

const Upcoming = () => {
	const [endpoint, setEndpoint] = useState('day');
	const { data, error, loading } = useFetchData(`/trending/all/${endpoint}`);

	const sliderContianer = useRef();

	//? SWITCH TABS
	const onSwithTabChange = (tab, index) => {
		setEndpoint(tab == 'Day' ? 'day' : 'week');
	};

	//? SLIDER
	const navigateSlider = (direction) => {
		const container = sliderContianer.current;

		const scrollAmount =
			direction === 'left'
				? container.scrollLeft - container.offsetWidth
				: container.scrollLeft + container.offsetWidth;

		container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
	};

	return (
		<div className='py-10'>
			<div className='header mb-8 flex items-center justify-between'>
				<MoviesHeaderTitle title={'upcoming'} />
				<SwitchMovie
					onSwithTabChange={onSwithTabChange}
					data={['Day', 'Week']}
				/>
			</div>

			{loading ? (
				<div className='grid grid-cols-6 gap-4'>
					{[...Array(6)].map((_, index) => (
						<Skelton height={300} key={index} />
					))}
				</div>
			) : (
				<div className='relative'>
					<div className='movies-data gap-4 ' ref={sliderContianer}>
						{data?.results.map((movie, index) => (
							<SingleMovieCard
								data={movie}
								key={movie.id}
								mediaType={'movie'}
							/>
						))}

						<div className='controllers flex items-center justify-between absolute top-1/2 left-0 w-[100%] p-4'>
							<MdArrowCircleLeft
								size={25}
								className='text-white cursor-pointer shadow-lg'
								onClick={() => navigateSlider('left')}
							/>
							<MdArrowCircleRight
								size={25}
								className='text-white cursor-pointer shadow-lg'
								onClick={() => navigateSlider('right')}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Upcoming;
