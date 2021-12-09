import React, {useState} from 'react'
import { Slider, TableRow, TableCell, styled } from '@material-ui/core';

import "./MySlider.scss";

function MySlider({ index, value, max, setValue }) {
	const field = ["가격", "탄수화물", "단백질", "지방", "칼로리"];
	const handleValue = (event, newValue) => {
		setValue(newValue);
	};
	const handleInputChange1 = (event) => {
		if (isNaN(event.target.value)){
			alert("숫자를 입력하세요.");
			setValue([0, value[1]]);
			return;
		}
		if (event.target.value > value[1]){
			setValue([value[1], value[1]]);
			return;
		}
		if (event.target.value === ''){
			setValue([0, value[1]]);
			return;
		}
		setValue([event.target.value, value[1]]);
	};
	const handleInputChange2 = (event) => {
		console.log(event.target.value);
		if (isNaN(event.target.value)){
			alert("숫자를 입력하세요.");
			setValue([value[0], max]);
			return;
		}
		if (event.target.value < value[0]){
			setValue([value[0], value[0]]);
			return;
		}
		if (event.target.value > max){
			setValue([value[0], max]);
			return;
		}
		if (event.target.value === ''){
			setValue([value[0], max]);
			return;
		}
		setValue([value[0], event.target.value]);
	};
	const handleEnter1 = (e) => {
		if(e.key === "Enter")
			handleInputChange1(e);
	}
	const handleEnter2 = (e) => {
		if(e.key === "Enter")
			handleInputChange2(e);
	}
	const MyTableCell = styled(TableCell)({
		borderBottom:"none",
		padding: 5,
		height: 50
	})
	return (
		<TableRow>
			<MyTableCell className="filter_name" variant="head">{field[index]}</MyTableCell>
			<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
				<Slider
					className="filter_slider" valueLabelDisplay="auto"
					value={value} min={0} max={max} onChange={handleValue}
				/>
			</TableCell>
			<MyTableCell>
				<input
					className="slider_input"
					placeholder={value[0]}
					onBlur={handleInputChange1}
					onKeyPress={handleEnter1}
				/> ~&nbsp;
				<input
					className="slider_input"
					placeholder={value[1]}
					onBlur={handleInputChange2}
					onKeyPress={handleEnter2}
				/>
			</MyTableCell>
		</TableRow>
	)
}

export default MySlider;
