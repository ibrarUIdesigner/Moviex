import React from 'react';
import { FaBeer, FaCaretRight } from 'react-icons/fa';

const MoviesHeaderTitle = ({ title }) => {
	return (
		<div className='flex items-center gap-2'>
			<span className='w-6 h-8 flex items-center justify-center bg-purple-700  rounded-md'>
				<FaCaretRight color='white' />
			</span>
			<strong className='text-white uppercase text-lg'>{title}</strong>
		</div>
	);
};

export default MoviesHeaderTitle;
