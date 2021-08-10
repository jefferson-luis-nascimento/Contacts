import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Container, InputText } from './styles';
import Label from '~/components/Form/Label';
import Error from '~/components/Form/Error';

export default function Input({ name, label, placeholder, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputText
        name={name}
        placeholder={placeholder}
        rest={rest}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
