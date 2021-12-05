import React, { useEffect, useState } from "react"
import ItemList from '../../components/ItemList/ItemList';
import Paging from '../../components/Paging/Paging';
import { styled, Slider, Table, TableRow, TableCell, Checkbox, FormControlLabel } from '@material-ui/core';

import "./ItemlistPage.scss";
import Button from '../../components/Button/Button';

function ItemlistPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/foods")
			.then((res)=>res.json())
			.then((data)=>setData(data));
    },[])
	console.log(data);

	const prac_list = [
		{ name : "1번 상품", price : 7000 }, { name : "2번 상품", price : 8000 }, { name : "3번 상품", price : 7000 }, { name : "4번 상품", price : 4000 },
		{ name : "5번 상품", price : 7000 }, { name : "6번 상품", price : 3000 }, { name : "7번 상품", price : 6000 }, { name : "8번 상품", price : 2800 },
		{ name : "9번 상품", price : 7000 }, { name : "10번 상품", price : 3000 }, { name : "11번 상품", price : 6000 }, { name : "12번 상품", price : 2800 },
		{ name : "13번 상품", price : 7000 }, { name : "14번 상품", price : 3000 }, { name : "15번 상품", price : 6000 }, { name : "16번 상품", price : 2800 },
		{ name : "17번 상품", price : 7000 }, { name : "18번 상품", price : 3000 }, { name : "19번 상품", price : 6000 }, { name : "20번 상품", price : 2800 }
	];
	const [price, setPrice] = useState([0, 20000]);
	const handlePrice = (event, newValue) => {
		setPrice(newValue);
	};
	const [carbohydrate, setCarbohydrate] = useState([0, 50]);
	const handleCarbohydrate = (event, newValue) => {
		setCarbohydrate(newValue);
	};
	const [protein, setProtein] = useState([0, 50]);
	const handleProtein = (event, newValue) => {
		setProtein(newValue);
	};
	const [fat, setFat] = useState([0, 50]);
	const handleFat = (event, newValue) => {
		setFat(newValue);
	};
	const [calorie, setCalorie] = useState([0, 1000]);
	const handleCalorie = (event, newValue) => {
		setCalorie(newValue);
	};
	const [priority, setPriority] = useState("");
	const handlePriority = (event, newValue) => {
		setPriority(newValue);
	}
	const [page, setPage] = useState(1);
	const handlePage = (newValue) => {
		console.log(newValue);
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
				{/*<div className="filter_title">상품 필터</div>*/}
				<Table>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">카테고리</MyTableCell>
						<MyTableCell className="category_container">
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="도시락" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="샐러드" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="볶음밥" />
							<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="닭가슴살" />
						</MyTableCell>
					</TableRow>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">가격</MyTableCell>
						<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
							<Slider
								className="filter_slider" valueLabelDisplay="auto"
								value={price} min={0} max={20000} onChange={handlePrice}
							/>
						</TableCell>
						<MyTableCell>
							<input className="slider_input" value={price[0]} /> ~ <input className="slider_input" value={price[1]} />
						</MyTableCell>
					</TableRow>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">탄수화물</MyTableCell>
						<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
							<Slider
								className="filter_slider" valueLabelDisplay="auto"
								value={carbohydrate} min={0} max={100} onChange={handleCarbohydrate}
							/>
						</TableCell>
						<MyTableCell>
							<input className="slider_input" value={carbohydrate[0]} /> ~ <input className="slider_input" value={carbohydrate[1]} />
						</MyTableCell>
					</TableRow>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">단백질</MyTableCell>
						<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
							<Slider
								className="filter_slider" valueLabelDisplay="auto"
								value={protein} min={0} max={100} onChange={handleProtein}
							/>
						</TableCell>
						<MyTableCell>
							<input className="slider_input" value={protein[0]} /> ~ <input className="slider_input" value={protein[1]} />
						</MyTableCell>
					</TableRow>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">지방</MyTableCell>
						<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
							<Slider
								className="filter_slider" valueLabelDisplay="auto"
								value={fat} min={0} max={100} onChange={handleFat}
							/>
						</TableCell>
						<MyTableCell>
							<input className="slider_input" value={fat[0]} /> ~ <input className="slider_input" value={fat[1]} />
						</MyTableCell>
					</TableRow>
					<TableRow>
						<MyTableCell className="filter_name" variant="head">칼로리</MyTableCell>
						<TableCell className="filter_info" style={{ borderBottom:"none", padding: 5, height: 50 }}>
							<Slider
								className="filter_slider" valueLabelDisplay="auto"
								value={calorie} min={0} max={1000} onChange={handleCalorie}
							/>
						</TableCell>
						<MyTableCell>
							<input className="slider_input" value={calorie[0]} /> ~ <input className="slider_input" value={calorie[1]} />
						</MyTableCell>
					</TableRow>
				</Table>
				<div className="save_button">
					<Button text="필터 저장" size="16px" color="#ffffff" />
				</div>
			</div>
			<div className="list_container">
				<div className="item_priority">
					<select className="select" value={priority} onChange={handlePriority}>
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
