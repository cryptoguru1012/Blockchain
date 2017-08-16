import React from 'react';

export default ({ input, label, type }) =>
  <div>
    <label>
      {label}
    </label>
    <input {...input} type={type} style={{ marginBottom: '5px' }} />
  </div>;
