import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import { showItems }                         from '../../actions';

const propTypes = {
  dispatch: PropTypes.func,
  userAgent: PropTypes.string,
  children: PropTypes.node,
};

class App extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    this.props.showItems()
  }
  
  renderItemsList(){
    return this.props.items.map((item) => {
      return (
        <li key={item.id}>{item.title}</li>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Items List</h1>
        <ul>
          { this.renderItemsList() }
        </ul>
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    userAgent: state.userAgent,
    items: state.item.list
  };
}

export default connect(mapStateToProps, {showItems})(App);
