import React from 'react';
import './Title.scss';

function Title({ title }) {
  return (
    <div className="all-ingridients-title">
      <div className="all-ingridients-left-line" />
      {title}
      {' '}
      <div className="all-ingridients-right-line" />
    </div>
  );
}

export default Title;
