import React, { FC } from 'react';
import FormikInput, { InputProps } from './input';
import SubmitBtn from './submitButton';
import { SubmitBtnProps } from './submitButton';

const FormikControl: FC<InputProps | SubmitBtnProps > = (
  props
) => {
  switch (props.control) {
    case 'input':
      return <FormikInput {...(props as InputProps)} />;
    break;


    case 'submitBTN':
      return <SubmitBtn {...(props as SubmitBtnProps)} />;
    break;
  }
};

export default FormikControl;