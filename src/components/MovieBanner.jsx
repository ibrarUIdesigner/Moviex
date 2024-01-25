import React, { useEffect, useState } from 'react';
import './styles.css';
import useFetchData from '../hooks/useFetchData';
import { useSelector } from 'react-redux';
import Image from './Image';
import { FaArrowRight, FaStar, FaSearch } from 'react-icons/fa';
import { ContentWrapper } from './index';
import dayjs from 'dayjs';

const MovieBanner = () => {
	const { data, loading } = useFetchData('movie/upcoming');
	const { url } = useSelector((state) => state.home);
	const [randomMovie, setRandomMovie] = useState(0);

	const [background, setBackground] = useState(
		'https://stat5.bollywoodhungama.in/wp-content/uploads/2024/01/Shaitaan-1.jpg',
	);

	const fallBackImage =
		'https://lh3.googleusercontent.com/proxy/O-mFZSyLgZwWUq_6sypcwahbrjdIr17SgePk5xoHG407Rxi3tdDrEaetLhuarvLAUBCHXGSxqc9TfDsMF6XlkWFwZxAHbcvdWcZXYzrzv66xYbC1MBWpzzMkq2bM';

	useEffect(() => {
		if (data) {
			setRandomMovie(Math.floor(Math.random() * data?.results.length) + 1);
		}
	}, [url, data]);

	return (
		<>
			<div className='md:h-screen sm:h-[300px] bg-blue-950 relative hero-banner'>
				{!loading && (
					<img
						className='object-cover object-left-top'
						src={
							url?.backdrop + data?.results[randomMovie]?.backdrop_path ??
							fallBackImage
						}
						alt=''
					/>
				)}

				<div className='banner-content z-10 w-2/3 sm:w-1/3 absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
					<div className='search border border-slate-200 flex mt-10 items-center relative'>
						<input
							type='text'
							id='first_name'
							className='bg-gray-50/5 backdrop-blur-[3px] text-slate-500 text-sm   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search movies or tv shows here ...'
							required
						/>
						<button
							type='button'
							className='flex absolute top-1/2 -translate-y-1/2 right-0 items-center gap-2 w-[50px] rounded-full focus:outline-none text-white bg-gradient-to-r from-orange-400 to-red-500  font-medium  text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
						>
							<FaSearch size={25} />
						</button>
					</div>
				</div>

				{/* Movies DEtails Here */}
				<ContentWrapper>
					<div className='movie-details z-10 absolute bottom-20 w-1/2 hidden  md:block'>
						<h3 className='text-4xl text-white font-bold uppercase'>
							{data?.results[randomMovie]?.original_title}
						</h3>

						<div className='sub-details flex items-center gap-3 mt-3'>
							<span className='text-slate-300 uppercase text-xs'>movie</span>
							<span className='flex items-center gap-1 text-slate-300 text-xs'>
								<FaStar className='text-red' color='yellow' />
								{data?.results[randomMovie]?.vote_average.toFixed(1)}
							</span>
							<span className='text-slate-300 text-xs'>
								{dayjs(data?.results[randomMovie]?.release_date).format('YYYY')}
							</span>
							<span className='text-slate-300 text-xs'>
								{data?.results[randomMovie]?.adult ? 'Adult' : 'PG'}
							</span>
						</div>

						<p className='text-slate-300 text-sm mt-2 font-light leading-relaxed'>
							{data?.results[randomMovie]?.overview}
						</p>
					</div>
				</ContentWrapper>
			</div>
		</>
	);
};

export default MovieBanner;
