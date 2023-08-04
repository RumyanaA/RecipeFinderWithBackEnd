import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';

function Dropdown({ onSelect, options, selectedOption }) {
  const [isOptionsDivShown, setIsOptionsDivShown] = useState(false);

  const ref = useRef();

  const handleOptionSelect = (option) => {
    onSelect(option);
    setIsOptionsDivShown(false);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if ((isOptionsDivShown && ref.current && !ref.current.contains(e.target))
      || e.target.className === 'input-buttons-container') {
        setIsOptionsDivShown(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOptionsDivShown]);
  return (
    <div className="dropdown-container">
      <button onClick={() => setIsOptionsDivShown(!isOptionsDivShown)} className="dropbtn">{selectedOption}</button>
      {isOptionsDivShown
        ? (
          <div className="dropdown-content" ref={ref}>
            {options.map((option) => (
              <p className="dropdown-option" key={option} onClick={() => handleOptionSelect(option)}>
                {option}
              </p>
            ))}

          </div>
        )
        : null}

    </div>
  );
}

export default Dropdown;
