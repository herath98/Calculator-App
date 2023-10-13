import React from 'react';

const DigitButton = ({ digit, dispatch }) => {
  const handleClick = () => {
    dispatch({ type: 'add-digit', payload: { digit } });
  };

  return (
    <button onClick={handleClick}>{digit}</button>
  );
};

export default DigitButton;
