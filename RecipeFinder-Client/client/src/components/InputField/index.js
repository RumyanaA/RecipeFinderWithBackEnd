import PropTypes from 'prop-types';
import React from 'react';
import './InputField.scss';

function InputField({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  label,
  autoComplete,
}) {
  return (
    <>
      <label className="floating-label" htmlFor={name}>{label}</label>
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
        style={error && { border: 'solid 1px red' }}
      />
      { error && <p>{ error }</p>}
    </>
  );
}

InputField.defaultProps = {
  type: 'text',
  name: 'input-name',
  className: 'default-input',
};

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
export default InputField;
