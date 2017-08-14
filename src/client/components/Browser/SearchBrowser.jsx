import React from 'react';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';

/**
 * Class SearchBrowser
 */
class SearchBrowser extends React.Component {
	constructor(props) {
		super(props);

		this.handleChangeText = this.handleChangeText.bind(this);
	}

	handleChangeText(e) {
		this.props.onChangeData({
			type: 'text',
			value: e.target.value
		});
	}

	render() {
		return (
			<Formsy.Form style={{marginTop: '10px'}}>
				<Row>
					<Col xs={12} sm={12} mdOffset={4} md={8} md={8}>
						<TextField
							name="search"
							onChange={this.handleChangeText}
							value={this.props.regexp}
							hintText="Search"
							inputStyle={{color: '#fff'}}
							hintStyle={{color: '#fff'}}
							style={{display:'block'}}
							fullWidth={true}
						/>
					</Col>
				</Row>
			</Formsy.Form>
		);
	}
}

export default SearchBrowser;