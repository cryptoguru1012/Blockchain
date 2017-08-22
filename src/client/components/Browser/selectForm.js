import React from 'react';

export default ({ input }) =>
  <select {...input}>
    <option value="">Select Category</option>
    <option value="currency">Currency</option>
    <option value="name">Name</option>
    <option value="geolocation">Geolocation</option>
    <option value="category">Category</option>
  </select>;
