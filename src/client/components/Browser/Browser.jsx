import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import { search } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';

class Browser extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid>
				<Col xs={12}>
					<FormBrowser onSearch={this.props.onSearch} browser={this.props.browser} />
					<ListBrowser items={this.props.browser.items}/>
				</Col>
			</Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
