import React from 'react';
import { connect } from 'react-redux';
import { search, setRegexp } from '../../redux/actions/browser';

import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SearchBrowser from '../Browser/SearchBrowser';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

require('./styles/menu.scss');

class MenuBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeSearch: false,
			regexp: '',
			category: null,
		};

		this.handleToggle = this.handleToggle.bind(this);
		this.handleToggleSerch = this.handleToggleSerch.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
	}

	handleToggle() {
		this.setState({ open: !this.state.open });
	}

	handleToggleSerch() {

		if (this.state.activeSearch) {
			let data = {};
			data.regexp = this.state.regexp;
			if (this.state.category !== null) data.category = this.state.category;

			if (data.category !== null && data.regexp.length > 0)
				this.props.onSearch(data);
			else
				console.log('no action');
			console.log('data ->', data);
		}

		this.setState({ activeSearch: !this.state.activeSearch });
	}

	handleChangeData(data) {
		if (data.type === 'text')
			this.setState({regexp: data.value});

		if (data.type === 'category')
			this.setState({category: data.value});
	}

	render() {
		return (
			<AppBar
				title={!this.state.activeSearch ? <p>Shopshot</p>: <SearchBrowser onChangeData={this.handleChangeData} category={this.state.category} regexp={this.state.regexp} />}
				className="appbar-color"
				onLeftIconButtonTouchTap={this.handleToggle}
				onRightIconButtonTouchTap={this.handleToggleSerch}
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

	return { browser };
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (data) => {
			dispatch(search(data));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBrowser);
