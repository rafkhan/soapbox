import React from 'react';
import styles from '../stylesheets/Input.module.scss';
import classNames from 'classnames';

const Input = ({ placeHolder, value, onChange, className = ''}) => (
  <input
    placeholder={placeHolder}
    className={classNames(styles.Input, className)}
    value={value}
    onChange={e => {
      e.preventDefault();
      onChange(e.target.value);
    }}
  />
);

export default Input;