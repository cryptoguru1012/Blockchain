import React, { Component} from 'react'
import Paper from 'material-ui/Paper';
import Img from 'react-image'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {grey50, grey800} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

require('./styles/map-markerInfo.scss');

class ItemList extends Component{
	render(){
		return (
			<div className="Item__Wrap">
				<div className="item__header">
					{this.props.marker.title}
				</div>
				<div className="item__body">
					<div className="item__body-row">
						<div className="item__body-photo">
						<Img src="https://image.ibb.co/er6NWa/dummyimg.png" style={{height:100, width: 100}}/>
						</div>
						<div className="item__body-info">
							<div className="item__bodyInfo-row">
								<div className="item__bodyInfo-field">Category:</div>
								<div className="item__bodyInfo-data">{this.props.marker.category}</div>
							</div>
							<div className="item__bodyInfo-row">
								<div className="item__bodyInfo-field">Price:</div>
								<div className="item__bodyInfo-data">{this.props.marker.price}{" "}{this.props.marker.currency}</div>
							</div>
							<div className="item__bodyInfo-row">
								<div className="item__bodyInfo-field">Quantity:</div>
								<div className="item__bodyInfo-data">{this.props.marker.quantity}</div>
							</div>
						</div>
					</div>
					<div className="item__body-row">
						<div className="item__bodyInfo-field">Description:</div>
					</div>
					<div className="item__body-row">
						<div className="item__bodyInfo-data">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo</div>
					</div>
				</div>
				<div className="item__footer">
						<RaisedButton
							backgroundColor={grey800}
							labelColor={grey50}
							href={'/offer/' + this.props.marker.offer}
							target="_blank"
							label="Add to Cart"
							icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
						/>
				</div>
			</div>
		)
	}
}

export default ItemList