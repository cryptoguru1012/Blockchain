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
				<h2>New offers typically appear in 1-2 minutes.
				<br/> Please wait or <a href="/">GO BACK</a> or <a href="/store/newItem">SUBMIT NEW OFFER</a></h2>
			</Col>
		);
	}
}

export default OfferViewError;