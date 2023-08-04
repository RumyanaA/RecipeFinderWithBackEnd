import React from 'react';
import './TextArea.scss';

function TextArea({ value, onChange, name, placeholder, rows, cols, label }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        className="default-textarea"
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </>
  );
}

export default TextArea;
