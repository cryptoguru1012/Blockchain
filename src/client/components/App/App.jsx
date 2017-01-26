import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func,
  userAgent: PropTypes.string,
  children: PropTypes.node,
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (<h1>Hello World</h1>);
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    userAgent: state.userAgent,
  };
}

export default connect(mapStateToProps)(App);
