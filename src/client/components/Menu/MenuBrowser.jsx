import React, { Component, PropTypes } from 'react';
import {
	Row,
	Col,
	Grid,
	Nav,
	Navbar,
	NavItem,
	NavDropdown,
} from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Formsy from 'formsy-react';
import FormSelectCategories from '../FormSelectCategories';


require('./styles/menu.scss');

class MenuBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeSearch: false,
			phraseSearch: '' 
		};

		this.handleToggle = this.handleToggle.bind(this);
		this.handleToggleSerch = this.handleToggleSerch.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleToggle() {
		this.setState({ open: !this.state.open });
	}

	handleToggleSerch() {
		if (this.state.activeSearch)
			console.log('phraseSearch: ', this.state.phraseSearch);

		this.setState({ activeSearch: !this.state.activeSearch });
	}

	handleChange(e) {
		this.setState({phraseSearch: e.target.value});
	}

	renderTitle() {
		if (!this.state.activeSearch) {
			return (
				<p>Shopshot</p>
			);
		} else {
			return (
				
				<Formsy.Form style={{marginTop: '10px'}}>
					<Row>
						<Col xs={6}>
							<TextField
								name="search"
								onChange={e => this.handleChange(e)}
								value={this.state.phraseSearch}
								hintText="Search"
								inputStyle={{color: '#fff'}}
								hintStyle={{color: '#fff'}}
								style={{display:'block'}}
								fullWidth={true}
							/>
						</Col>
						<Col xs={6}>
							<FormSelectCategories
								name="category"
								fullWidth={true}
								hintText="Category"
								labelStyle={{color: '#fff'}}
								menuStyle={{color: '#fff'}}
								hintStyle={{color: '#fff'}}
								style={{display:'block'}}
							/>
						</Col>
					</Row>
				</Formsy.Form>
			);
		}
	}

	render() {
		return (
			<AppBar
				title={this.renderTitle()}
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

export default MenuBrowser;
