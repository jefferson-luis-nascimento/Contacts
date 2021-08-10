import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import { toast } from 'react-toastify';

import addImage from '~/assets/addimage.png';
import { Container } from './styles';
import Error from '~/components/Form/Error';

import api from '~/services/api';

export default function AvatarInput({ name, ...rest }) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const inputRef = useRef(null);

  const handlePreview = useCallback(async (e) => {
    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    try {
      const response = await api.post('/files', formData);

      const { url } = response.data;

      setFile(response.data);
      setPreview(url);
    } catch (error) {
      toast.error('Falha ao carregar a imagem');
    }
  }, []);

  useEffect(() => {
    registerField({
      name: 'avatar',
      ref: inputRef.current,
      clearValue: () => {
        setFile(null);
        setPreview(null);
      },
      setValue: (_, data) => {
        if (data) {
          setPreview(data.url);
          setFile(data);
        }
      },
      getValue: () => {
        if (file) {
          return file.id;
        }
        return 0;
      },
    });
  }, [file, preview, fieldName, inputRef, registerField]);
  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || addImage} alt="" />
        <input
          id="avatar"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handlePreview}
          {...rest}
        />
      </label>
      {error && <Error>{error}</Error>}
    </Container>
  );
}
