import React, { FC } from 'react';
import FormikInput, { InputProps } from './input';
import SubmitBtn from './submitButton';
import { SubmitBtnProps } from './submitButton';
import { SwitchProps } from './switch';
import FormikSwitch from './switch';
import TeaxtArea, { TeaxtAreaProps } from './teaxtArea';
import FormikFile, { fileProps } from './file';
import FormikCheck, { checkProps } from './checkbox';
import SelectChips, { selectProps } from './selectChips';

const FormikControl: FC<
  InputProps | SubmitBtnProps | SwitchProps | TeaxtAreaProps | fileProps | checkProps | selectProps
> = (props) => {
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

    case 'teaxtArea':
      return <TeaxtArea {...(props as TeaxtAreaProps)} />;
      break;

    case 'file':
      return <FormikFile {...(props as fileProps)} />;
      break;

    case 'checkbox':
      return <FormikCheck {...(props as checkProps)} />;
      break;

    case 'selectChips':
      return <SelectChips {...(props as selectProps)} />;
      break;
  }
};

export default FormikControl;
