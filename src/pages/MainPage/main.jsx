import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './main.scss';

function main() {
	var settings ={
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll:1
	};
	return (
		<div className="main-container">
			<div className="promotion-container">
				<Slider {...settings}>
					<div>
						<img src="https://wiseux.speedgabia.com/imdak/contents/main_banner_promotion/20210831_1630394465.jpg" />
					</div>
					<div>
						<img src="https://wiseux.speedgabia.com/imdak/contents/main_banner_promotion/20210205_1612495481.jpg" />
					</div>
				</Slider>
			</div>
			<div className="prefer-container">
				인기상품
			</div>
		</div>
	)
}

export default main;
