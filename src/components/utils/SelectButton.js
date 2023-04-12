import React, { useState, useEffect } from 'react';

// Packages
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectButton = (props) => {
	const { options, name, value, onChange } = props;

	const [selectOptions, setSelectOptions] = useState([]);

	useEffect(() => {
		let optsArray = [];

		options.forEach((opt) => {
			let obj = {};
			obj.value = opt._id !== undefined ? opt._id.$oid : opt.value;
			obj.label = opt.name;
			optsArray.push(obj);
		});

		setSelectOptions(optsArray);
	}, [options]);

	return (
		<Select
			classNamePrefix='select'
			placeholder='Select...'
			noResultsText='No options'
			maxMenuHeight={170}
			options={selectOptions}
			value={value !== null ? selectOptions.find(opt => opt.value === value) : null}
			onChange={(e) => onChange(e, name)}
			isDisabled={false}
			isClearable={true}
			isSearchable={true}
			theme={(selectTheme) => ({
				...selectTheme,
				colors: {
					...selectTheme.colors,
					primary50: undefined,
				},
			})}
		/>
	);
}

SelectButton.propTypes = {
	options: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired
};

export default SelectButton;
