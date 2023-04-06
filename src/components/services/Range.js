import React from 'react';

// Ant Design
import { DatePicker } from 'antd';

// Packages
import dayjs from 'dayjs';

const Range = (props) => {
	const { dateFormat, selectedRange, setSelectedRange } = props;

  // Función para actualizar el estado con el rango de fechas seleccionado
	const onRangeChange = (dates, dateStrings) => {
		if (dates) {
			// console.log('From: ', dates[0], ', to: ', dates[1]);
			// console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
			setSelectedRange(dates);
		} else {
			// console.log('Clear');
			selectedRange[0] = null;
			setSelectedRange(selectedRange);
		}
	};
	
	const rangePresets = [
		{
			label: 'Last 7 Days',
			value: [dayjs().add(-7, 'd'), dayjs()],
		},
		{
			label: 'Last 14 Days',
			value: [dayjs().add(-14, 'd'), dayjs()],
		},
		{
			label: 'Last 30 Days',
			value: [dayjs().add(-30, 'd'), dayjs()],
		},
		{
			label: 'Last 90 Days',
			value: [dayjs().add(-90, 'd'), dayjs()],
		},
	];

	const disabledDate = (current) => {
		return current && current > dayjs().endOf('day');
	};

	return (
		<div className='mb-4'>
			<DatePicker.RangePicker
				format={dateFormat}
				value={selectedRange}
				presets={rangePresets}
				onChange={onRangeChange}
				disabledDate={disabledDate}
			/>
		</div>
	);
};
export default Range;