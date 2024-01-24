import React, { useEffect, useState } from 'react';
import './styles.css';
import useFetchData from '../hooks/useFetchData';
import { useSelector } from 'react-redux';
import Image from './Image';

const MovieBanner = () => {
	const { data, loading } = useFetchData('movie/upcoming');
	const { url } = useSelector((state) => state.home);

	const [background, setBackground] = useState(
		'https://stat5.bollywoodhungama.in/wp-content/uploads/2024/01/Shaitaan-1.jpg',
	);

	const fallBackImage =
		'https://lh3.googleusercontent.com/proxy/O-mFZSyLgZwWUq_6sypcwahbrjdIr17SgePk5xoHG407Rxi3tdDrEaetLhuarvLAUBCHXGSxqc9TfDsMF6XlkWFwZxAHbcvdWcZXYzrzv66xYbC1MBWpzzMkq2bM';

	useEffect(() => {
		let randomNumber = Math.floor(Math.random() * 20) + 1;
		const bg = url?.backdrop + data?.results[randomNumber]?.backdrop_path;
		setBackground(bg);
	}, [data]);

	return (
		<>
			<div className='h-screen bg-blue-950 relative hero-banner'>
				{!loading && (
					<img
						className='object-cover object-left-top'
						src={background ?? fallBackImage}
						alt=''
					/>
				)}

				<div className='banner-content z-10 w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
					<h3 className='text-[45px] text-white font-bold'>Welcome</h3>
					<p className='text-white text-sm'>
						Millions of Movies, Tv shows and people to dicover.{' '}
						<span className='block'>Explore Now</span>
					</p>
					<div className='search flex mt-10 items-center'>
						<input
							type='text'
							id='first_name'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='John'
							required
						/>
						<button
							type='button'
							className='w-[150px] focus:outline-none text-white bg-purple-700 hover:bg-purple-800  font-medium  text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
						>
							Purple
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieBanner;
