import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/browser';
import { doCategoryReq } from '../../redux/actions/store/category';

import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import SearchBrowser from '../Browser/SearchBrowser';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ActionSearch from 'material-ui/svg-icons/action/search';
import  SSIcon from "./icon";

require('./styles/menu.scss');

class MenuBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeSearch: false,
			regexp: '',
			safesearch: 'no',
			category: null
			//from: parseInt("226a4f45f3393f22"),
		};

		this.props.getCategories();
		this.handleCategory=this.handleCategory.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleHomeTap = this.handleHomeTap.bind(this);
		this.handleToggleSerch = this.handleToggleSerch.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
	}

	handleToggle() {
		this.setState({ open: !this.state.open });
	}

	handleHomeTap() {
		this.setState({regexp: null, 
			category:null,
			open: !this.state.open});
	}

	handleToggleSerch() {

		if (this.state.activeSearch !== null) {
			let data = {};
			data.regexp = this.state.regexp;
			if (this.state.category !== null) data.category = this.state.category;

			if (data.category !== null && data.regexp.length > 0)
				this.props.onSearch(data);
			else
				console.log('no action');
		}

		this.setState({ activeSearch: !this.state.activeSearch });
	}

	handleCategory(value) {
			
			let data = {};

			data.regexp = this.state.regexp;
			data.category = this.state.category;

			this.props.onSearch(data);
			console.log('data submited: ', data);
			this.handleToggle();
	}

	handleChangeData(data) {
		if (data.type === 'text')
			this.setState({regexp: data.value});

		if (data.type === 'category')
			this.setState({category: });
	}
	// a function for capetalizing first letter of sub categories
	firstToUpperCase(category) {
		// adding space before and after /
		var Category = category.replace(/\//g," / ");
		// adding space before and after +
			Category = Category.replace(/\+/g," + ");
		// capetalizing first character of every word of the string
			Category = category.toLowerCase().replace(/(\?:^|\s)\S/g, function(letter) {
					return letter.toUpperCase()});

		return Category;
	}
	/* a function for split category
	 * for example instead of 'some-word > another-word' it will be 'another-word'
	 */
	splitCategory(category){
		var OldCatItem = category
		var NewCatItem = OldCatItem.split(">").pop()
		return NewCatItem
	}
	renderCategories( start, stop) {
		if (this.props.categories.categories.length > 0) {
			return this.props.categories.categories.map((category, i) => {
				if( i >= start && i < stop) {
					// passing category.cat, it will return only the name of sub category
					var NewCatItem = this.splitCategory(category.cat);
					// capetalizing first letter of sub categories
				  NewCatItem = this.firstToUpperCase(NewCatItem)
					if(i == 0){
						return (<MenuItem required key={i} value={category.cat}
						onTouchTap={() => {this.handleCategory(NewCatItem);}}
						primaryText={NewCatItem} />);
					}else{
						return (<MenuItem key={i} value={category.cat}
						onTouchTap={() => {this.handleCategory(NewCatItem);}}
						primaryText={NewCatItem} />);
					}
				}
			})
		}
	}

	render() {
		if (this.props.categories.error)
			alert('Error:\nCould not fetch categories\n' + this.props.categories.message);
		const props = Object.assign({}, this.props)
		delete props.categories;
		delete props.getCategories;
		let categories = this.renderCategories();

		return (
			<AppBar
				title={!this.state.activeSearch ? <p style={{fontWeight:'bold'}}>moovr</p>: <SearchBrowser style={{float:'right'}} onChangeData={this.handleChangeData} regexp={this.state.regexp} />}
				className="appbar-color"
				onLeftIconButtonTouchTap={this.handleToggle}
				onRightIconButtonTouchTap={this.handleToggleSerch}
				iconElementLeft={<IconButton><SSIcon /></IconButton>}
				iconElementRight={<IconButton><ActionSearch /></IconButton>}
			>
				<Drawer
					open={this.state.open}
					docked={false}
					onRequestChange={open => this.setState({ open })}
				>
					<AppBar showMenuIconButton={false} title="Menu" />
					<Link to="/">
						<MenuItem
							onTouchTap={this.handleHomeTap}
							primaryText="Home"
						/>
					</Link>
					<Link to="/store/newItem">
						<MenuItem
							onTouchTap={this.handleToggle}
							primaryText="Sell"
						/>
					</Link>
					<ListItem
						primaryText="Categories"
						nestedItems={[
							<MenuItem
								key={0}
								onTouchTap={this.handleToggle}
								primaryText="All"
								containerElement={<Link to=""/>}
							/>,
						<ListItem
							key={1}
							primaryText="For Sale"
							nestedItems={this.renderCategories(0,27)}
						/>,
						<ListItem
							key={2}
							primaryText="Services"
							nestedItems={this.renderCategories(27,36)}
						/>,
						<ListItem
							key={3}
							primaryText="Wanted"
							nestedItems={this.renderCategories(36,37)}
						/>,
						<ListItem
							key={4}
							primaryText="Certificates"
							nestedItems={this.renderCategories(37,42)}
						/>]} />
					<Link to="">
						<MenuItem
							disabled
							onTouchTap={this.handleToggle}
							primaryText="About"
						/>
					</Link>
					<Link to="">
						<MenuItem
							disabled
							onTouchTap={this.handleToggle}
								primaryText="Register"
						/>
					</Link>
					<Link to="">
						<MenuItem
							disabled
							onTouchTap={this.handleToggle}
							primaryText="Profile"
						/>
					</Link>
				</Drawer>
			</AppBar>
		);
	}
}

function mapStateToProps(state) {
	let browser = state.browser;
	const categories = state.categories;
  	return { categories, browser };
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (data) => {
			dispatch(search(data));
		},
		getCategories: () => {
		  dispatch(doCategoryReq());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBrowser);
