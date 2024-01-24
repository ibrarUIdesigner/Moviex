import React from 'react';
import './styles.css';

const MovieBanner = () => {
	return (
		<div className='h-screen bg-blue-950 relative hero-banner'>
			<img
				className='h-[100%] w-[100%] object-cover object-left-top'
				src='https://stat5.bollywoodhungama.in/wp-content/uploads/2024/01/Shaitaan-1.jpg'
				alt=''
			/>

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
	);
};

export default MovieBanner;
