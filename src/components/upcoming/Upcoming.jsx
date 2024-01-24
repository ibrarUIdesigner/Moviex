import React, { useRef, useState } from 'react';
import { FaBeer, FaCaretRight } from 'react-icons/fa';
import { MdArrowCircleRight, MdArrowCircleLeft } from 'react-icons/md';
import SwitchMovie from '../SwitchMovie';
import useFetchData from '../../hooks/useFetchData';
import SingleMovieCard from './SingleMovieCard';
import './styles.css';
import Skelton from '../Skelton';

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
			<div className='relative'>
				<div className='movies-data gap-4 ' ref={sliderContianer}>
					{data?.results.map((movie, index) => (
						<SingleMovieCard data={movie} key={movie.id} />
					))}

					<div className='controllers flex items-center justify-between absolute top-1/2 left-0 w-[100%] p-4'>
						<MdArrowCircleLeft
							size={25}
							className='text-purple-700'
							onClick={() => navigateSlider('left')}
						/>
						<MdArrowCircleRight
							size={25}
							className='text-purple-700'
							onClick={() => navigateSlider('right')}
						/>
					</div>
				</div>
			</div>

			{loading && (
				<div className='grid grid-cols-6 gap-4'>
					{[...Array(6)].map((_, index) => (
						<Skelton key={index} />
					))}
				</div>
			)}
		</div>
	);
};

export default Upcoming;
