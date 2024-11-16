import React, { FC } from 'react';
import FormikInput, { InputProps } from './input';
import SubmitBtn from './submitButton';
import { SubmitBtnProps } from './submitButton';
import { SwitchProps } from './switch';
import FormikSwitch from './switch';

const FormikControl: FC<InputProps | SubmitBtnProps | SwitchProps > = (
  props
) => {
  switch (props.control) {
    case 'input':
      return <FormikInput {...(props as InputProps)} />;
    break;

    case 'submitBTN':
      return <SubmitBtn {...(props as SubmitBtnProps)} />;
    break;

    case 'switch':
      return <FormikSwitch {...(props as SwitchProps)} />;
    break;
  }
};

export default FormikControl;