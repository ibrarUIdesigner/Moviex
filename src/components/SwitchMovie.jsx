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
		<div className='bg-indigo-950 rounded-full border border-slate-500'>
			<div className='tab-item h-[40px]  flex items-center justify-between  relative'>
				{data.map((tab, index) => (
					<span
						onClick={() => onTabChange(tab, index)}
						key={index}
						className={` text-xs text-white p-1  rounded-full w-[100px] text-center cursor-pointer relative z-10`}
					>
						{tab}
					</span>
				))}

				<span
					ref={changer}
					style={{ left }}
					className=' h-[100%] tab-bg-chnger bg-gradient-to-r from-orange-400 to-red-500 p-1 rounded-full w-[100px] absolute  '
				></span>
			</div>
		</div>
	);
};

export default SwitchMovie;
