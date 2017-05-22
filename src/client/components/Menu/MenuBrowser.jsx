import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/browser';
import { doCategoryReq } from '../../redux/actions/store/category';

import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SearchBrowser from '../Browser/SearchBrowser';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { setVisibilityFilter } from '../../redux/actions/browser';
import  SSIcon from "./icon"

require('./styles/menu.scss');

class MenuBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeSearch: false,
			regexp: '',
			category: null
		};

		this.props.getCategories();
		this.handleCategory=this.handleCategory.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleToggleSerch = this.handleToggleSerch.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
	}

	handleToggle() {
		this.setState({ open: !this.state.open });
	}

	handleToggleSerch() {

		if (this.state.activeSearch !== null) {
			let data = {};
			data.regexp = this.state.regexp;
			data.category = this.state.category;

			this.props.onSearch(data);
			console.log('data submited: ', data);

		}

		this.setState({ activeSearch: !this.state.activeSearch });
	}

	handleCategory(value) {
			console.log(value);
			let data = {};
			this.setState({ 
				regexp: '',
				category: value
			});

			data.regexp = this.state.regexp;
			data.category = this.state.category;

			this.props.onSearch(data);
			console.log('data submited: ', data);
	}

	handleChangeData(data) {
		if (data.type === 'text')
			this.setState({regexp: data.value});

		if (data.type === 'category')
			this.setState({category: data.value});
			console.log(category);
	}

	renderCategories() {
		if (this.props.categories.categories.length > 0) {
			return this.props.categories.categories.map((category, i) => {
				if(i == 0){
					return (<MenuItem required key={i} value={category.cat} 
					onTouchTap={() => {this.handleCategory(category.cat);}}
					primaryText={category.cat} />);
				}else{
					return (<MenuItem key={i} value={category.cat}
					onTouchTap={() => {this.handleCategory(category.cat);}}
					primaryText={category.cat} />);
				}
				
			})
		}
	}

	render() {
		if (this.props.categories.error)
			alert('Error:\nCould not fetch categories\n' + this.props.categories.message);
		const props = Object.assign({}, this.props);
		delete props.categories;
		delete props.getCategories;
		let categories = this.renderCategories();
		
		return (
			<AppBar
				title={!this.state.activeSearch ? <p style={{fontFamily:'verdana', fontWeight:'bold'}}>moovr</p>: <SearchBrowser onChangeData={this.handleChangeData} regexp={this.state.regexp} />}
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
							onTouchTap={this.handleToggle}
							primaryText="Home"
						/>
					</Link>
					<Link to="/store/newItem">
						<MenuItem
							onTouchTap={this.handleToggle}
							primaryText="Sell"
						/>
					</Link>
					<MenuItem
						primaryText="Categories"
					/>
					<Link to="">
						<MenuItem
							onTouchTap={()=> {
								this.setState({ open: !this.state.open });
								this.props.onClick()}
							}
							primaryText="All"
						/>
					</Link>
					{this.renderCategories()}
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
		onClick: () => {
			dispatch(setVisibilityFilter('SHOW_ALL'))
		},
		getCategories: () => {
		  dispatch(doCategoryReq());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBrowser);
