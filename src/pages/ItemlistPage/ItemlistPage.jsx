import React, { useEffect, useState } from "react"
import ItemList from '../../components/ItemList/ItemList';
import Paging from '../../components/Paging/Paging';
import MySlider from "../../components/MySlider/MySlider";
import { styled, Slider, Table, TableRow, TableCell, Checkbox, FormControlLabel } from '@material-ui/core';

import "./ItemlistPage.scss";
import Button from '../../components/Button/Button';

function ItemlistPage() {
	const [data, setData] = useState([]);
	const [priority, setPriority] = useState("sortbyname");
	const [price, setPrice] = useState([0, 20000]);
	const [carbohydrate, setCarbohydrate] = useState([0, 50]);
	const [protein, setProtein] = useState([0, 50]);
	const [fat, setFat] = useState([0, 50]);
	const [calorie, setCalorie] = useState([0, 1000]);
	
	const handleFilter = (e) => {
		fetch(`http://localhost:8080/foods/fs?filter=price,carbohydrate,protein,fat,kcal&min=${price[0]},${carbohydrate[0]},${protein[0]},${fat[0]},${calorie[0]}&max=${price[1]},${carbohydrate[1]},${protein[1]},${fat[1]},${calorie[1]}`)
			.then((res)=>res.json())
			.then((data)=>setData(data.filter(info => info.price >= 1000)));
	};
	useEffect(() => {
		fetch(`http://localhost:8080/foods`)
			.then((res)=>res.json())
			.then((data)=>setData(data.filter(info => info.price >= 1000)));
    },[])
	if (priority === "sortbyname"){
		data.sort(function(a, b) {
			if(a.name > b.name) return 1;
			if(a.name < b.name) return -1;
			if(a.name === b.name) return 0;
		});
	} else if (priority === "popular"){
		data.sort(function(a, b) {
			return b.avg_rate - a.avg_rate;
		});
	} else if (priority === "cheap"){
		data.sort(function(a, b) {
			return a.price - b.price;
		});
	} else if (priority === "expensive"){
		data.sort(function(a, b) {
			return b.price - a.price;
		});
	}

	const handlePriority = (e) => {
		setPriority(e.target.value);
	}
	const [page, setPage] = useState(1);
	const handlePage = (newValue) => {
		setPage(newValue);
	};
	const postsPerPage = 8;
	const indexOfLast = page * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	function currentPosts(tmp) {
		let currentPosts = 0;
		currentPosts = tmp.slice(indexOfFirst, indexOfLast);
		return currentPosts;
	  };
	const MyTableCell = styled(TableCell)({
		borderBottom:"none",
		padding: 5,
		height: 50
	})
	return (
		<div className="listpage_container">
			<div className="filter_container">
				<Table>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">카테고리</MyTableCell>
						<MyTableCell className="category_container">
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="도시락" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="샐러드" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="볶음밥" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="닭가슴살" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="기타" />
						</MyTableCell>
					</TableRow>
					<MySlider index={0} value={price} max={60000} setValue={setPrice} />
					<MySlider index={1} value={carbohydrate} max={250} setValue={setCarbohydrate} />
					<MySlider index={2} value={protein} max={150} setValue={setProtein} />
					<MySlider index={3} value={fat} max={250} setValue={setFat} />
					<MySlider index={4} value={calorie} max={3000} setValue={setCalorie} />
				</Table>
				<div className="save_button">
					<Button text="필터 적용" size="16px" color="#ffffff" onClick={handleFilter}/>
				</div>
			</div>
			<div className="list_container">
				<div className="item_priority">
					<select className="select" value={priority} onChange={handlePriority}>
						<option value="sortbyname">가나다순</option>
						<option value="popular">인기순</option>
						<option value="cheap">가격낮은순</option>
						<option value="expensive">가격높은순</option>
					</select>
				</div>
				<ItemList list={currentPosts(data)} />
			</div>
			<div className="paging">
				<Paging page={page} count={data.length} setPage={handlePage}/>
			</div>
		</div>
	)
}

export default ItemlistPage;
