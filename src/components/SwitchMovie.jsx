import React, { useRef, useState } from 'react';

const SwitchMovie = ({ data, onSwithTabChange }) => {
	const [selectedTab, setSelectedTab] = useState(0);
	const [left, setLeft] = useState(0);

	const changer = useRef();

	const onTabChange = (tab, index) => {
		setLeft(index * 100);

		setTimeout(() => {
			setSelectedTab(index);
		}, 300);

		onSwithTabChange(tab, index);
	};

	return (
		<div className='bg-white p-1 rounded-full'>
			<div className='tab-item  flex items-center justify-between  relative'>
				{data.map((tab, index) => (
					<span
						onClick={() => onTabChange(tab, index)}
						key={index}
						className={`${
							selectedTab === index ? 'text-white' : 'text-slate-700'
						}  p-1  rounded-full w-[100px] text-center cursor-pointer relative z-10`}
					>
						{tab}
					</span>
				))}

				<span
					ref={changer}
					style={{ left }}
					className='tab-bg-chnger bg-purple-700 p-1 rounded-full w-[100px] absolute h-[32px] '
				></span>
			</div>
		</div>
	);
};

export default SwitchMovie;
