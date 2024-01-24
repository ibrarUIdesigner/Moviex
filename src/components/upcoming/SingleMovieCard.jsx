import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles.css';

const SingleMovieCard = ({ data }) => {
	const [moviePoster, setMoviePoster] = useState('');
	const { url } = useSelector((state) => state.home);

	const fallBackImage =
		'https://lh3.googleusercontent.com/proxy/O-mFZSyLgZwWUq_6sypcwahbrjdIr17SgePk5xoHG407Rxi3tdDrEaetLhuarvLAUBCHXGSxqc9TfDsMF6XlkWFwZxAHbcvdWcZXYzrzv66xYbC1MBWpzzMkq2bM';

	useEffect(() => {
		const poster = url?.poster + data.backdrop_path;
		setMoviePoster(poster);
	}, [url]);

	return (
		<div className='single-movie'>
			<div className='movie-poster'>
				<img
					src={moviePoster || fallBackImage}
					alt=''
					className='rounded-lg h-[300px] object-cover'
				/>
			</div>
		</div>
	);
};

export default SingleMovieCard;
