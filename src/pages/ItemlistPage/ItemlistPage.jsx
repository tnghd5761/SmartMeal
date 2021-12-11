import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ItemList from '../../components/ItemList/ItemList';
import Paging from '../../components/Paging/Paging';
import MySlider from "../../components/MySlider/MySlider";
import { styled, Table, TableRow, TableCell, Checkbox, FormControlLabel } from '@material-ui/core';

import "./ItemlistPage.scss";
import Button from '../../components/Button/Button';

function ItemlistPage({ match, location }) {
	
	const [data, setData] = useState([]);
	const [priority, setPriority] = useState("sortbyname");
	const [price, setPrice] = useState([0, 60000]);
	const [carbohydrate, setCarbohydrate] = useState([0, 250]);
	const [protein, setProtein] = useState([0, 150]);
	const [fat, setFat] = useState([0, 250]);
	const [calorie, setCalorie] = useState([0, 3000]);
	const [page, setPage] = useState(1);

	const { isLogin } = useSelector(state=>state.user)
	useEffect(() => {
		if (isLogin){
			fetch("http://localhost:8080/filter_default")
				.then((res)=>res.json())
				.then((data)=>{
					setCalorie([data.min_cal, data.max_cal]);
					setCarbohydrate([data.min_tan, data.max_tan]);
					setProtein([data.min_dan, data.max_dan]);
					setFat([data.min_ji, data.max_ji]);
					fetch(`http://localhost:8080/foods/fs?filter=price,carbohydrate,protein,fat,kcal&min=${price[0]},${data.min_tan},${data.min_dan},${data.min_ji},${data.min_cal}&max=${price[1]},${data.max_tan},${data.max_dan},${data.max_ji},${data.max_cal}`)
						.then((res)=>res.json())
						.then((data)=>setData(data.filter(info => info.price >= 1000)));
				})
		} else {
			fetch(`http://localhost:8080/foods/fs?filter=price,carbohydrate,protein,fat,kcal&min=${price[0]},${carbohydrate[0]},${protein[0]},${fat[0]},${calorie[0]}&max=${price[1]},${carbohydrate[1]},${protein[1]},${fat[1]},${calorie[1]}`)
				.then((res)=>res.json())
				.then((data)=>setData(data.filter(info => info.price >= 1000)));
		}
		setPage(1);
	},[])

	const handleFilter = (e) => {
		fetch(`http://localhost:8080/foods/fs?filter=price,carbohydrate,protein,fat,kcal&min=${price[0]},${carbohydrate[0]},${protein[0]},${fat[0]},${calorie[0]}&max=${price[1]},${carbohydrate[1]},${protein[1]},${fat[1]},${calorie[1]}`)
			.then((res)=>res.json())
			.then((data)=>setData(data.filter(info => info.price >= 1000)));
		setPage(1);
	};

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
		setPage(1);
	}
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
				{match.params.id === "search" &&
					<ItemList list={currentPosts(data.filter(info => info.name.includes(location.state.search)))} />
				}
				{match.params.id === "base" &&
					<ItemList list={currentPosts(data)} />
				}
			</div>
			<div className="paging">
				{match.params.id === "search" &&
					<Paging page={page} count={data.filter(info => info.name.includes(location.state.search)).length} setPage={handlePage}/>
				}
				{match.params.id === "base" &&
					<Paging page={page} count={data.length} setPage={handlePage}/>
				}
			</div>
		</div>
	)
}

export default ItemlistPage;
