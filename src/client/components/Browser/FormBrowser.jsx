import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Formsy from 'formsy-react';
import CircularProgress from 'material-ui/CircularProgress';
import { IconButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import Search from 'material-ui/svg-icons/action/search';

import { setOrder } from '../../redux/actions/browser';

import FormSelectCategories from './../FormSelectCategories';
import OrderByBrowser from './OrderByBrowser';

let orderItems = [
  {
    value: 'currency',
    name: 'Currency',
  },
  {
    value: 'title',
    name: 'Name',
  },
  {
    value: 'geolocation',
    name: 'Geolocation',
  },
  {
    value: 'paymentoptions_display',
    name: 'Payment options',
  },
  {
    value: 'category',
    name: 'Category',
  },
];

const styles = {
  spinnerStyle: {
    margin: 'auto',
    display: 'block',
    padding: 5,
  },
  align: {
    verticalAlign: 'middle',
    display: 'inline-block',
    float: 'none',
  },
};

class FormBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSubmit(data) {
    let data2 = {};
    if (data.category) data2.category = data.category;
    // if (data.regexp)
    data2.regexp = data.regexp;

    console.log('data ->', data2);
    this.props.onSearch(data2);
  }

  render() {
    return (
      <Row>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
          <Col xs={11} style={styles.align}>
            <Row>
              <FormsyText
                name="regexp"
                floatingLabelText="Search"
                hintText="Search..."
                validations="isSpecialWords"
                validationError="Please only use letters"
                fullWidth
              />
            </Row>
          </Col>
          <Col xs={1} style={styles.align}>
            <Row>
              {!this.props.browser.loading &&
                <IconButton type="submit" disabled={!this.state.canSubmit}>
                  <Search />
                </IconButton>}
            </Row>
          </Col>
          <Row>
            <Col xs={6}>
                <FormSelectCategories
                  name="category"
                  label="Category"
                  fullWidth
                />
            </Col>
            <Col xs={6}>
                <OrderByBrowser
                  items={orderItems}
                  onOrder={this.props.onOrder}
                />
            </Col>
          </Row>
          {this.props.browser.loading &&
            <CircularProgress size={50} style={styles.spinnerStyle} />}
        </Formsy.Form>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onOrder: (order) => {
      dispatch(setOrder(order));
    },
  };
}
export default connect(null, mapDispatchToProps)(FormBrowser);
