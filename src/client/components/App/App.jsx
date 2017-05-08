import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey600, grey900, grey800, grey300} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Menu from '../Menu';
import Frontpage from '../Frontpage';

const propTypes = {
	dispatch: PropTypes.func,
	userAgent: PropTypes.string,
	children: PropTypes.node,
};

injectTapEventPlugin();

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const muiTheme = getMuiTheme({
			palette: {
					primary1Color: grey900,
					primary2Color: grey600,
					primary3Color: grey300,
					canvasColor: grey300,
			},
			appBar: {
				height: 70,
			},
		});

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div style={{ position:"relative" }}>
					<Menu/>
					<div style={{marginTop:muiTheme.appBar.height}}>
						{this.props.children}
					</div>
				</div>
			</MuiThemeProvider>
		);
		}

}

App.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userAgent: state.userAgent
	};
}

export default connect(mapStateToProps)(App);