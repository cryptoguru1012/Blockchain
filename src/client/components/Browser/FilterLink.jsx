import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from '../../redux/actions/browser';

class FilterLink extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.onClick();
	}

	render() {
		if (this.props.active) {
			return <span>{this.props.children}</span>
		}

		return (
			<a href="#" onClick={e => this.handleClick(e)} >
				{this.props.children}
			</a>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.browser.filter
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink)