import React, { PropTypes } from 'react';

function SelectForm({ input }) {
  return (
    <select {...input}>
      <option value="">Select Category</option>
      <option value="currency">Currency</option>
      <option value="name">Name</option>
      <option value="geolocation">Geolocation</option>
      <option value="category">Category</option>
    </select>
  );
}

SelectForm.propTypes = {
  input: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  ).isRequired,
};


export default SelectForm;
