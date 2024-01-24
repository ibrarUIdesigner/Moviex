import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = ({ image }) => {
	return (
		<LazyLoadImage
			effect='opacity'
			className='h-screen'
			src={image} // use normal <img> attributes as props
		/>
	);
};

export default Image;
