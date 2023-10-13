import React from 'react';

const OperationButton = ({ operation, dispatch }) => {
  const handleClick = () => {
    dispatch({ type: 'choose-operation', payload: { operation } });
  };

  return (
    <button onClick={handleClick}>{operation}</button>
  );
};

export default OperationButton;
