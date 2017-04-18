import React from 'react';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';

class OfferViewError extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<Col xs={12}>
				<h2>Offer not found. :(</h2>
			</Col>
		);
	}
}

export default OfferViewError;