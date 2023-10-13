import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './style.css';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.justEvaluated) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          justEvaluated: false,
        };
      }
      if (action.payload.digit === '0' && state.currentOperand === '0') {
        return state;
      } else if (action.payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === '' || state.currentOperand === null) {
        return state;
      }

      return {
        ...state,
        operation: action.payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: '',
      };

    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      return {
        currentOperand: '',
        previousOperand: '',
        operation: null,
      };

    case ACTIONS.EVALUATE:
      const prev = parseFloat(state.previousOperand);
      const current = parseFloat(state.currentOperand);

      if (isNaN(prev) || isNaN(current) || state.operation === null) {
        return state;
      }

      let result = 0;

      switch (state.operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
        default:
          return state;
      }

      return {
        currentOperand: result.toString(),
        previousOperand: '',
        operation: null,
        justEvaluated: true,
      };

    default:
      return state;
  }
}

function App() {
  const initialState = {
    currentOperand: '',
    previousOperand: '',
    operation: null,
    justEvaluated: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{state.previousOperand}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
