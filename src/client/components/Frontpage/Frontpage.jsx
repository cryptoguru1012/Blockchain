import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Row, Col, Grid, Button} from 'react-bootstrap';

const homeStyle = {
	wellStyles: {
		width: '330px',
		margin: '0 auto 10px'
	},
	centerStyle: {
		minHeight: '76vh',
		display: 'flex',
		alignItems: 'center'
	}
}

class Frontpage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid>
				<div style={homeStyle.centerStyle}>
					<div style={homeStyle.wellStyles}>
						<Link className="btn btn-lg btn-primary btn-block" to={'/browser'}>Browser</Link>
						<Link className="btn btn-lg btn-primary btn-block" to={'/store/newItem'}>Sell</Link>
						<Link className="btn btn-lg btn-primary btn-block" to={'/about'}>About</Link>
					</div>
				</div>
			</Grid>
		);
	}

}

export default connect()(Frontpage);
