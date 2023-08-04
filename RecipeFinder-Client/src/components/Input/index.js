import PropTypes from 'prop-types';
import React from 'react';
import './Input.scss';

function Input({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  label,
  autoComplete,
  min,
  max,
  onFocus,
  disabled,
}) {
  const inlineStyles = {
    border: error && 'solid 1px red',
    padding: type === 'range' ? 0 : '0.6rem 1.2rem',
  };
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        required
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        autoComplete={autoComplete}
        min={min}
        max={max}
        onFocus={onFocus}
        style={inlineStyles}
        disabled={disabled}
      />
      { error && <p>{ error }</p>}
    </>
  );
}

Input.defaultProps = {
  type: 'text',
  name: 'input-name',
  className: 'default-input',
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
export default Input;
