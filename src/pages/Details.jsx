import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import Skelton from '../components/Skelton';
import { ContentWrapper } from '../components';
import { useSelector } from 'react-redux';
import './styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoMdPlayCircle } from 'react-icons/io';
import dayjs from 'dayjs';

const Details = () => {
	const { mediaType, id } = useParams();
	const { data, loading, error } = useFetchData(`${mediaType}/${id}`);
	const { url } = useSelector((state) => state.home);

	useEffect(() => {
		console.log(mediaType, id);
		console.log(data, error, loading);
	}, [mediaType, id]);

	return (
		<div>
			{error ? (
				<>
					<ContentWrapper>
						<div className='grid sm:grid-cols-2 gap-4 py-10'>
							<Skelton height={400} />
							<div className='grid gap-4 grid-rows-6 grid-flow-col '>
								{[...Array(6)].map((_, i) => (
									<Skelton key={i} height={50} />
								))}
							</div>
						</div>
					</ContentWrapper>
				</>
			) : (
				<div
					className={` bg-center  bg-poster-image  h-screen py-10`}
					style={{
						backgroundImage: `url(${url?.backdrop + data?.backdrop_path})`,
					}}
				>
					<ContentWrapper>
						<div className='block sm:flex items-center justify-center gap-10 h-[100%]'>
							<div
								style={{ flex: 1 }}
								className='poster-image overflow-hidden h-full'
							>
								<img
									className='rounded-md h-full object-cover object-center'
									src={url?.poster + data?.backdrop_path}
									alt=''
								/>
							</div>
							<div style={{ flex: 2 }} className='movie-details '>
								<h1 className='text-3xl font-bold text-white'>
									{data?.title || data?.name} (
									{dayjs(data?.release_date).format('YYYY')})
								</h1>
								<span className='text-slate-300 text-xs '>{data?.tagline}</span>

								<div className='genres mt-1'>
									{!!data && (
										<>
											{data.genres.map((g, i) => (
												<span
													key={i}
													className='inline-block p-1 bg-red-500 text-xs text-white font-thin rounded-sm mr-1'
												>
													{g.name}
												</span>
											))}
										</>
									)}
								</div>

								<div className='ratingandtrailer mt-5 flex items-center gap-4'>
									<div style={{ width: 50, height: 50 }}>
										<CircularProgressbar
											value={data?.vote_average}
											text={data?.vote_average.toFixed(1)}
											maxValue={10}
											styles={buildStyles({
												trailColor: '#fff',

												textSize: '20px',
												pathColor: `${
													Math.floor(data?.vote_average) < 5
														? 'red'
														: Math.floor(data?.vote_average) < 7
														? 'orange'
														: 'green'
												}`,
											})}
										/>
									</div>
									<IoMdPlayCircle size={60} color='white' />{' '}
									<span className='text-white'>Play Trailer</span>
								</div>

								<div className='mt-5 overview'>
									<strong className='text-white text-lg'>Overview</strong>
									<p className='text-white text-sm font-light'>
										{data?.overview}
									</p>
								</div>

								<div className='subinfo mt-5'>
									<div className='border-b mb-3 pb-3 border-blue-900'>
										<strong className='text-sm'>Status: </strong>
										<span className='font-thin text-xs'>{data?.status}</span>
									</div>
									<div className='border-b pb-3 border-blue-900'>
										<strong className='text-sm'>Release Date: </strong>
										<span className='font-thin text-xs'>
											{dayjs(data?.release_date).format('MMM D, YYYY')}
										</span>
									</div>
								</div>
							</div>
						</div>
					</ContentWrapper>
				</div>
			)}
		</div>
	);
};

export default Details;
