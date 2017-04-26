import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { FormsySelect } from 'formsy-material-ui/lib';
import { MenuItem } from 'material-ui';
import { SelectField } from 'material-ui';

class OrderByBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderItemsOption = this.renderItemsOption.bind(this);
    this.state = {
      selected: '',
    };
  }

  handleSubmit(e) {
    this.setState({
      selected: e.target.label,
    });
    console.log(e.target.label);
    this.props.onOrder(e.target.value);
  }

  renderItemsOption() {
    if (this.props.items.length > 0) {
      return this.props.items.map((item, i) => (
        <MenuItem
          key={item.value}
          value={item.value}
          label={item.name}
          primaryText={item.name}
        />
      ));
    }
  }

  render() {
    return (
      <SelectField
        floatingLabelText="Order by"
        value={this.state.selected}
        onChange={this.handleSubmit}
        fullWidth
      >
        {this.renderItemsOption()}
      </SelectField>
    );
  }
}

export default OrderByBrowser;
