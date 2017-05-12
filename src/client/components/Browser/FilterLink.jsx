import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from '../../redux/actions/browser';

let styles = {
	filter: {
		padding: '5px 10px',
		color: 'rgba(0, 0, 0, 0.298039)',
		fontSize: '16px',
		fontWeight: 'bold',
		display: 'inline-block'
	}
}

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
			return <span style={{ ...styles.filter, color: '#263238' }}>{this.props.children}</span>;
		}

		return (
			<a href="#" onClick={e => this.handleClick(e)} style={styles.filter} >
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