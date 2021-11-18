import React from 'react';
import ItemList from '../../components/ItemList/ItemList';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './main.scss';

function main() {
	const prac_list = [
		{ name : "1번 상품", price : 7000 },
		{ name : "2번 상품", price : 8000 },
		{ name : "3번 상품", price : 7000 },
		{ name : "4번 상품", price : 4000 },
		{ name : "5번 상품", price : 7000 },
		{ name : "6번 상품", price : 3000 },
		{ name : "7번 상품", price : 6000 },
		{ name : "8번 상품", price : 2800 }
	];
	var settings ={
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll:1
	};
	return (
		<div className="main_container">
			<div className="promotion_container">
				<Slider {...settings}>
					<div>
						<img src="https://wiseux.speedgabia.com/imdak/contents/main_banner_promotion/20210831_1630394465.jpg" />
					</div>
					<div>
						<img src="https://wiseux.speedgabia.com/imdak/contents/main_banner_promotion/20210205_1612495481.jpg" />
					</div>
				</Slider>
			</div>
			<div className="prefer_container">
				<div className="prefer_title">
					<div className="black">SMART</div>
					&nbsp;
					<div className="blue">인기</div>
					<div className="black">상품</div>
				</div>
				<ItemList list={prac_list} />
			</div>
		</div>
	)
}

export default main;