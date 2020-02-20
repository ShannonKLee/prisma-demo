import React from 'react';
import './styles.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

export default Button;