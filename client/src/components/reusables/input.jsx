import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  colSize: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const FormInput = ({
  id,
  name,
  value,
  colSize,
  label,
  error,
  type,
  onChange
}) => {
  const className = `input-field col ${colSize}`;
  return (
    <div className={className}>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={value}
        className="validate"
        onChange={onChange}
        required
      />
      <label htmlFor={id}>{label}</label>
      {/* { error && <span className="red-text accent-1">{error}</span> } */}
    </div>
  );
};

FormInput.propTypes = propTypes;

export default FormInput;

