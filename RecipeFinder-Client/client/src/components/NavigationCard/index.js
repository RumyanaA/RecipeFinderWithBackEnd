import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationCard.scss';

function NavigationCard({
  testId, title, description, routerLink,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routerLink);
  };
  return (
    <div className="card" onClick={handleClick} data-testid={testId}>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
}

export default NavigationCard;
