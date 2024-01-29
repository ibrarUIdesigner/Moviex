import React, { useEffect, useRef, useState } from 'react';
import { MdArrowCircleRight, MdArrowCircleLeft } from 'react-icons/md';
import MoviesHeaderTitle from '../MoviesHeaderTitle';
import SwitchMovie from '../SwitchMovie';
import useFetchData from '../../hooks/useFetchData';
import Skelton from '../Skelton';
import { useSelector } from 'react-redux';
import SingleMovieCard from '../upcoming/SingleMovieCard';

const Popular = () => {
	const [endpoint, setEndpoint] = useState('movie');

	const { url } = useSelector((state) => state.home);
	const { data, error, loading } = useFetchData(`/${endpoint}/popular`);

	const sliderContianer = useRef();

	//? SWITCH TABS
	const onSwithTabChange = (tab, index) => {
		setEndpoint(tab == 'Movies' ? 'movie' : 'tv');
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

	useEffect(() => {
		console.log(data);
	}, [url, data]);

	console.log(error);

	return (
		<div className='py-10'>
			<div className='header mb-8 flex items-center justify-between'>
				<MoviesHeaderTitle title={'popular'} />
				<SwitchMovie
					onSwithTabChange={onSwithTabChange}
					data={['Movies', 'Tv Shows']}
				/>
			</div>

			{loading || error ? (
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
								mediaType={endpoint}
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

export default Popular;
