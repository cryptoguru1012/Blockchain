import React, { PropTypes } from 'react';

function PaginationField({ label, type, input }) {
  return (
    <div style={{ margin: '8px 10px' }}>
      <label htmlFor="paginationField" style={{ margin: '0px 5px' }}>
        {label}
      </label>
      <input id="paginationField" {...input} type={type} />
    </div>)
}

PaginationField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.func,
    ]),
  ).isRequired,
};

export default PaginationField;
