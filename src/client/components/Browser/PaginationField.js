import React from 'react';

export default ({ label, type }) =>
  <div style={{ margin: '8px 10px' }}>
    <label style={{ margin: '0px 5px' }}>
      {label}
    </label>
    <input type={type} />
  </div>;
