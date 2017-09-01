import React, { PropTypes } from 'react';

export default PaginationField = ({ label, type, input }) => {
  console.log('ACZ -->', this.props);
  return(
    <div style={{ margin: '8px 10px' }}>
      <label htmlFor="paginationField" style={{ margin: '0px 5px' }}>
        {label}
      </label>
      <input id="paginationField" {...input} type={type} />
    </div>;
  )
}

PaginationField.propTypes = {
  label:PropTypes.string.isRequired,
  type:PropTypes..isRequired,
  input:PropTypes..isRequired,
}