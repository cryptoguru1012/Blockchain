import React from 'react';
import PaginationField from './PaginationField';
import { Field } from 'redux-form';

function renderField(selectedField) {
  switch (selectedField) {
    case 'currency':
      return (
        <div style={{ display: 'flex' }}>
          <h4>Currency:</h4>
          <Field
            key="currencyHigh"
            component={PaginationField}
            type="radio"
            label="Highest"
            name="currency"
            value="currencyHigh"
          />
          <Field
            key="currencyLow"
            component={PaginationField}
            type="radio"
            label="Lowest"
            name="currency"
            value="currencyLow"
          />
        </div>
      );
      break;

    case 'name':
      return (
        <div style={{ display: 'flex' }}>
          <h4>Name:</h4>
          <Field
            key="nameHigh"
            component={PaginationField}
            type="radio"
            label="Ascending"
            name="name"
            value="nameHigh"
          />
          <Field
            key="nameLow"
            component={PaginationField}
            type="radio"
            label="Descending"
            name="name"
            value="nameLow"
          />
        </div>
      );
      break;

    case 'geolocation':
      return (
        <div style={{ display: 'flex' }}>
          <h4>Geolocation:</h4>
          <Field
            key="geoClose"
            component={PaginationField}
            type="radio"
            label="Nearest"
            name="geolocation"
            value="Nearest"
          />
          <Field
            key="geoFar"
            component={PaginationField}
            type="radio"
            label="Farthest"
            name="geolocation"
            value="Furthest"
          />
        </div>
      );
      break;

    case 'category':
      return (
        <div style={{ display: 'flex' }}>
          <h4>Category :</h4>
          <Field
            key="categoryHigh"
            component={PaginationField}
            type="radio"
            label="A-Z"
            name="category"
            value="A-Z"
          />
          <Field
            key="categoryLow"
            component={PaginationField}
            type="radio"
            label="Z-A"
            name="category"
            value="Z-A"
          />
        </div>
      );
      break;

    default:
      return <div />;
      break;
  }
}

export default ({ selectedField }) =>
  <div
    style={{
      width: '90%',
      border: '1px solid #333',
      background: '#f9f9f9',
      padding: 16,
      margin: 16,
    }}
  >
    <h2 style={{ color: 'red' }}>
      You must select only one sort option ({selectedField}) at a time. If you want to choose
      another hit clear first.
    </h2>
    <h3 style={{ color: 'blue' }}>Choose as many filters as you want (checkboxes)</h3>
    <div style={{ display: 'flex' }}>
      <h4>Payment Options:</h4>
      <Field key="sys" component={PaginationField} type="checkbox" label="SYS" name="sys" />
      <Field
        key="btc"
        component={PaginationField}
        type="checkbox"
        value="btc"
        label="BTC"
        name="btc"
      />
      <Field key="zec" component={PaginationField} type="checkbox" label="ZEC" name="zec" />
    </div>

    <hr />
    {renderField(selectedField)}
  </div>;
