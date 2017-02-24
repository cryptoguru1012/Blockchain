import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, blue700, blue100, orangeA700, grey900, grey800, grey300} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import style from './css/style.css';
import muiThemeable from 'material-ui/styles/muiThemeable';


import Menu from '../Menu';
import Frontpage from '../Frontpage';
import Footer from '../Footer';

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

  // const muiTheme = getMuiTheme({
  //     palette: {
  //       primary1Color: orangeA700,
  //       primary2Color: grey900,
  //       primary3Color: grey300
  //     }
  //   }, {
  //     avatar: {
  //       borderColor: null
  //     },
  //     userAgent: this.props.userAgent
  //   });
  const muiTheme = getMuiTheme({
  palette: {
      primary1Color: orangeA700,
      primary2Color: grey900,
      primary3Color: grey300,
      canvasColor: grey300
  },
  appBar: {
    height: 70,
  },
});

    const Main= {
      //paddingBottom: '160px' // footer height size + 60px
      height:"calc(100vh + 200px)"
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ position:"relative" }}>
          <div>
            <Menu/>
          </div>
          <div style={{background:muiTheme.palette.primary3Color,paddingBottom:'160px', marginTop:71, minHeight:'100vh'}}>
            {this.props.children}
          </div>
          <Footer/>
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