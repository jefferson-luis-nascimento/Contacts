import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select/async';
import { useField } from '@unform/core';

import { Container } from './styles';
import Label from '~/components/Form/Label';
import Error from '~/components/Form/Error';

export default function AsyncSelect({ name, label, ...rest }) {
  const [inputValue, setInputValue] = useState({});
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Select
        isClearable
        cacheOptions
        defaultValue={defaultValue}
        onChange={(selected) => setInputValue(selected)}
        value={inputValue}
        ref={selectRef}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadOptions: PropTypes.func.isRequired,
};

AsyncSelect.defaultProps = {
  label: null,
};
