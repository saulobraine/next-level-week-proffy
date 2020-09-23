import React, { InputHTMLAttributes, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import arrowDown from '../../assets/images/icons/arrow-down.svg';
import arrowUp from '../../assets/images/icons/arrow-up.svg';

import './styles.css';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {

  const [selected, setSelected] = useState('Selecione');
  const [isActive, setIsActive] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  return (
    <OutsideClickHandler onOutsideClick={() => {
      if (selectRef.current?.classList.contains('select-options-open')) {
        selectRef.current?.classList.toggle('select-options-open');
        setIsActive(!isActive);
      }
    }}>
      <div className="select-block">
        <label htmlFor={name}>{label}</label>

        <div
          className="select-options"
          ref={selectRef}
        >
          <label onClick={() => {
            selectRef.current?.classList.toggle('select-options-open');
            setIsActive(!isActive);
          }}>
            {selected}

            {!isActive ? <img src={arrowDown} alt="Abrir" /> : <img src={arrowUp} alt="Fechar" />}

          </label>
          <div className="animate-options">
            {options.map((option) => (
              <React.Fragment key={option.value}>
                <label
                  htmlFor={option.value}
                  onClick={(e) => {
                    setSelected(option.label);
                    setIsActive(!isActive);
                    selectRef.current?.classList.toggle('select-options-open');
                  }}
                  className={selected === option.label ? "active-option" : ""}
                >
                  {option.label}
                </label>
                <input type="radio" id={option.value} name={name} value={option.value} {...rest} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Select;
