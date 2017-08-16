import React, { Component } from 'react';
import * as actions from '../../redux/actions/sortActions.js';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PaginationField from './PaginationField';

class Pagination extends Component {
  renderFields() {
    const formFields = [
      { label: 'Start of items', name: 'itemStart' },
      { label: 'Number of items', name: 'itemCount' },
    ];
    return formFields.map(({ label, name }) =>
      <Field key={name} component={PaginationField} type="text" label={label} name={name} />,
    );
  }

  renderItems() {
    return this.props.items.map((item, i) =>
      <div key={i}>
        <h3>
          {item.title}
        </h3>
        <p>
          price: {item.price} {item.currency}
        </p>
      </div>,
    );
  }

  submitPagination(values) {
    const { itemStart, itemCount } = values;
    this.props.fetchOffers(itemStart, itemCount);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>
          Number of items showing: {this.props.items.length}
        </h1>
        {this.renderItems()}
        <form onSubmit={handleSubmit(this.submitPagination.bind(this))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.sorter,
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'pagination',
  })(Pagination),
);
