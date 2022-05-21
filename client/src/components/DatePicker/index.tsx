import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useColorMode } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

interface Props {
  isInvalid?: boolean,
  isWhite?: boolean,
}

const DatePicker = (props: Props & ReactDatePickerProps) => {
  const isLight = useColorMode().colorMode === 'light';

  const { isInvalid, isWhite, ...restProps } = props;
  
  return (
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        wrapperClassName={`${isInvalid && "react-datapicker__error"} ${isWhite && "react-datepicker__white-background"}`}
        className="react-datapicker__input-text"
        autoComplete='off'
        {...restProps}
      />
    </div>

  );
};

export default DatePicker;
