import React from 'react';
import PaginationField from './PaginationField';
import { Field } from 'redux-form';
import selectForm from './selectForm';

export default () =>
  <div style={{ width: '100%' }}>
    <Field name="selectForm" component={selectForm} />
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
  </div>;
