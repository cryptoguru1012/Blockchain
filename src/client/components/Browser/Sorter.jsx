import React, { Component } from 'react';
import * as actions from '../../redux/actions/sortActions.js';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PaginationField from './PaginationField';

class Sorter extends Component {
  renderFields() {
    const formFields = [
      { label: 'By Title', name: 'title', type: 'text' },
      { label: 'By Price', name: 'price', type: 'number' },
      { label: 'By Quantity', name: 'quantity', type: 'number' },
      { label: 'By Currency', name: 'currency', type: 'text' },
    ];
    return formFields.map(({ label, name, type }) =>
      <Field key={name} component={PaginationField} type={type} label={label} name={name} />,
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

  submitSort(values) {
    this.props.sortOffers(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.renderItems()}
        <form onSubmit={handleSubmit(this.submitSort.bind(this))}>
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
    form: 'sorter',
  })(Sorter),
);
