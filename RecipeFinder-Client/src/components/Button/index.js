import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

function Button({
  type,
  onClick,
  id,
  className,
  label,
  testId,
}) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={className}
      data-testid={testId}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  className: 'primary-button',
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  testId: PropTypes.string,
};

export default Button;
