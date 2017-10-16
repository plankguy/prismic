import React from 'react';
import PropTypes from 'prop-types';

import './Hamburger.css';

const PROP_TYPES = {
  parentClass: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

const DEFAULT_PROPS = {
  parentClass: '',
  isOpen: false,
};

const Hamburger = (props) => {
  const baseClass = 'Hamburger';
  console.log('Hamburger props:',  props);

  return (
    <button
      className={`${baseClass} ${props.parentClass}__${baseClass}${props.isOpen ? ' is-open' : ''}`}
      onClick={props.clickHandler}
    >
      <span className={`${baseClass}__patties`}></span>
    </button>
  )
};

Hamburger.propTypes = PROP_TYPES;
Hamburger.defaultProps = DEFAULT_PROPS;

export default Hamburger;