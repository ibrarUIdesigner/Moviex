import React, { useEffect, useState } from 'react';
import MoviesHeaderTitle from '../MoviesHeaderTitle';
import useFetchData from '../../hooks/useFetchData';
import Skelton from '../Skelton';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import SwitchMovie from '../SwitchMovie';
import { useNavigate } from 'react-router-dom';

const MostViewed = () => {
	const [endpoint, setEndpoint] = useState('movie');
	const { data, error, loading } = useFetchData(`${endpoint}/top_rated`);
	const [randomMedia, setRandomMedia] = useState(0);
	const { url } = useSelector((state) => state.home);
	const navigate = useNavigate();

	useEffect(() => {
		let randomNumber = Math.floor(Math.random() * data?.results.length + 1);
		setRandomMedia(randomNumber);

		const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

		console.log(currentDate);

		console.log(data);
	}, [data]);

	const onSwithTabChange = (tab, index) => {
		setEndpoint(tab == 'Movies' ? 'movie' : 'tv');
	};

	//? OPEN DETIALS PAGE
	const onDetailsPage = (endpoint, id) => {
		console.log(id, endpoint);
		setTimeout(() => {
			navigate(`${endpoint}/${id}`);
		}, 2000);
	};
	return (
		<div className='py-10'>
			<div className='header mb-8 flex items-center justify-between'>
				<MoviesHeaderTitle title={'Most Watched'} />
				<SwitchMovie
					data={['Movies', 'Tv Shows']}
					onSwithTabChange={onSwithTabChange}
				/>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					{loading || error ? (
						<>
							<Skelton height={400} />
						</>
					) : (
						data?.results[randomMedia] && (
							<div
								onClick={() =>
									onDetailsPage(endpoint, data?.results[randomMedia].id)
								}
								className='h-[400px]  rounded-lg overflow-hidden relative cursor-pointer'
							>
								<img
									className='h-[100%] w-[100%] object-cover'
									src={url?.backdrop + data?.results[randomMedia].backdrop_path}
									alt=''
								/>
								<div className='media-content absolute left-0 bottom-0 bg-black/50 backdrop-blur-[2px] p-2 py-3 w-[100%] flex items-center gap-4'>
									<span className='index-number text-white font-bold text-xl tracking-wider  bg-blue-950 flex justify-center items-center rounded-md w-[60px] h-[60px]  text-center'>
										01
									</span>
									<div>
										<strong className='block text-white text-2xl uppercase'>
											{data?.results[randomMedia].original_title ||
												data?.results[randomMedia].name ||
												data?.results[randomMedia].name}
										</strong>

										<div className='sub-content flex items-center gap-3 mt-1'>
											<span className='text-slate-300 text-xs uppercase'>
												{endpoint === 'movie' ? 'movie' : 'tv'}
											</span>
											<span className='text-slate-200'>-</span>
											<span className='text-slate-300 text-xs'>
												{dayjs(data?.results[randomMedia].release_date).format(
													'YYYY',
												)}
											</span>
											<span className='text-slate-200'>-</span>

											<span className='flex items-center gap-1 text-xs text-slate-300'>
												{data?.results[randomMedia]?.vote_average.toFixed(1)}
											</span>

											<span className='text-slate-200'>-</span>

											<span className='flex items-center gap-1 text-xs text-slate-300'>
												{data?.results[randomMedia]?.adult ? '18+' : 'PG'}
											</span>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>
				<div className='flex flex-col gap-[20px]'>
					{loading || error ? (
						<>
							{[...Array(3)].map((_, index) => (
								<Skelton height={120} key={index} />
							))}
						</>
					) : (
						<>
							{data?.results.slice(0, 3).map((movie, index) => (
								<div
									onClick={() => onDetailsPage(endpoint, movie.id)}
									key={index}
									className='flex cursor-pointer shadow-lg items-center justify-between h-[120px] bg-gray-900 rounded-md overflow-hidden p-1'
								>
									<div className='media-content  px-4  flex-1 items-center gap-4'>
										<div>
											<strong className='block text-white text-lg uppercase'>
												{movie.original_title ||
													movie.original_name ||
													movie.name}
											</strong>

											<div className='sub-content flex items-center gap-3 mt-1'>
												<span className='text-slate-300 text-xs uppercase'>
													{endpoint === 'movie' ? 'movie' : 'tv'}
												</span>
												<span className='text-slate-200'>-</span>
												<span className='text-slate-300 text-xs'>
													{dayjs(
														movie.release_date || movie.first_air_date,
													).format('YYYY')}
												</span>
												<span className='text-slate-200'>-</span>

												<span className='flex items-center gap-1 text-xs text-slate-300'>
													{movie?.vote_average.toFixed(1)}
												</span>

												<span className='text-slate-200'>-</span>

												<span className='flex items-center gap-1 text-xs text-slate-300'>
													{movie?.adult ? '18+' : 'PG'}
												</span>

												{movie?.origin_country && (
													<>
														<span className='text-slate-200'>-</span>

														<span className='flex items-center gap-1 text-xs text-slate-300'>
															{movie?.origin_country[0]}
														</span>
													</>
												)}
											</div>
										</div>
									</div>
									<div className='flex-2 h-[100%]'>
										<img
											className='h-[100%] w-[150px] object-cover rounded-md'
											src={url?.backdrop + movie.backdrop_path}
											alt=''
										/>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default MostViewed;
