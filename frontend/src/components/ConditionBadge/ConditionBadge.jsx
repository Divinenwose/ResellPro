import React from 'react';
import './ConditionBadge.css';

const ConditionBadge = ({ condition }) => {
  return (
    <div className={`condition-badge ${condition.toLowerCase()}`}>
      {condition.toUpperCase()}
    </div>
  );
};

export default ConditionBadge;

