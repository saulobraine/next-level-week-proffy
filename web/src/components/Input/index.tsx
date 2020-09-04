import React, { InputHTMLAttributes, useState, FormEvent, useRef } from 'react';

import openEye from '../../assets/images/icons/eye-open.svg';
import closeEye from '../../assets/images/icons/eye-close.svg';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, name, type, ...rest }) => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const divInputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowPassword = (e: FormEvent) => {
    setToggleShowPassword(!toggleShowPassword);

    if (toggleShowPassword) {
      inputRef.current?.setAttribute('type', 'password');
    } else {
      inputRef.current?.setAttribute('type', 'text');
    }

    e.preventDefault();
  };

  return (
    <div ref={divInputRef} className="input-block">
      <label htmlFor={name}>{label}</label>
      {type === 'password' && (
        <button
          type="button"
          className="input-toggle-password"
          onClick={handleShowPassword}
        >
          {!toggleShowPassword && <img src={openEye} alt="Ver senha" />}

          {toggleShowPassword && <img src={closeEye} alt="Ocultar senha" />}
        </button>
      )}
      <input
        {...rest}
        className={type === "password" ? "password" : "" }
        type={type}
        id={name}
        ref={inputRef}
        onBlur={(e) => {
          if (e.currentTarget.value.length > 0) {
            divInputRef.current?.classList.add('active');
          } else {
            divInputRef.current?.classList.remove('active');
          }
        }}
      />
    </div>
  );
};

export default Input;
