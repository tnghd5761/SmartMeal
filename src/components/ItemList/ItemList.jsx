import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from "react-router-dom";

import './ItemList.scss';

function ItemList( list ) {
	return (
		<div className="ItemList">
			<Grid container spacing={3} className="list_container">
				{list.list.map((c) => (
					<Grid item xs={3}>
						<div className="link_container">
							<Link to='/detail'>
								<div className="list_box">
									<div className="item_image">상품 이미지</div>
									<div className="item_name">{c.name}</div>
									<div className="item_price">{c.price}</div>
								</div>
							</Link>
						</div>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

export default ItemList;
