import React from 'react';
import './styles.css';

const Error = ({ msg }) => (
  <div className="errorContainer">
    {msg}
  </div>
);

export default Error;