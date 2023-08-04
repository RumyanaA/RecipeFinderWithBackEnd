import React from 'react';
import './ErrorMessage.scss';

function ErrorMessage({ testid, message }) {
  return (
    <div data-testid={testid} className="message-container" style={{ visibility: message ? 'visible' : 'hidden' }}>
      {message}
    </div>
  );
}
export default ErrorMessage;
