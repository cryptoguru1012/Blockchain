import React from 'react';

export default ({ label, type, input }) =>
  <div style={{ margin: '8px 10px' }}>
    <label style={{ margin: '0px 5px' }}>
      {label}
    </label>
    <input {...input} type={type} />
  </div>;
