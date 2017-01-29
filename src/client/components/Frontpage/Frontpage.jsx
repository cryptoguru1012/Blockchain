import React from 'react';
import { connect }                          from 'react-redux';
import { showItems }                         from '../../actions';

class Frontpage extends React.Component {
    
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    this.props.showItems()
  }
  
  renderItemsList(){
    return this.props.items.map((item) => {
      return (
        <li key={item.id}> {item.title} </li>
      )
    })
  }
  
  render() {
    return (
        <div className="row">
          <div className="col-lg-12">
            <h1>Items List</h1>
            <ul>
              { this.renderItemsList() }
            </ul>
          </div>
        </div>
    );
  }
    
}


function mapStateToProps(state) {
  return {
    items: state.items.list
  };
}

export default connect(mapStateToProps, {showItems})(Frontpage);