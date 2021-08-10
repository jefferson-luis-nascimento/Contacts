import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import AvatarInput from '~/components/AvatarInput';
import Container from '~/components/Container';
import RegisterHeader from '~/components/RegisterHeader';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function Register({ match }) {
  const formRef = useRef(null);

  const { id, typePerson } = match.params;

  useEffect(() => {
    async function loadDeliverymen() {
      if (id) {
        const response = await api.get(`/contact/${id}`);

        if (typePerson === 'Legal') {
          formRef.current.setData({
            companyName: response.data.companyName,
            tradeName: response.data.tradeName,
            cnpj: response.data.cnpj,
          });
        }

        formRef.current.setFieldValue('avatar', response.data.avatar);
      }
    }

    loadDeliverymen();
  }, [id]);

  function handleBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('E-mail está inválido')
          .required('O destinatário é obrigatório'),
        avatar: Yup.number()
          .min(1, 'Selecione uma foto para seu entregador')
          .required('Selecione uma foto para seu entregador'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, avatar: avatar_id } = data;

      if (id) {
        try {
          await api.put(`/deliverymen/${id}`, {
            name,
            email,
            avatar_id,
          });

          toast.success('Entregador alterado com sucesso!');

          reset();

          history.push('/deliverymen');
        } catch (error) {
          toast.error('Falha ao alterar o entregador!');
        }
      } else {
        try {
          await api.post('/deliverymen', {
            name,
            email,
            avatar_id,
          });

          toast.success('Entregador cadastrado com sucesso!');

          reset();
        } catch (error) {
          toast.error('Falha ao gravar o entregador!');
        }
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <RegisterHeader
        handleBack={handleBack}
        handleSave={() => formRef.current.submitForm()}
      >
        Cadastro de Entregadores
      </RegisterHeader>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar" />
        <Input type="text" name="name" label="Nome" placeholder="John Doe" />
        <Input
          type="email"
          name="email"
          label="E-mail"
          placeholder="example@email.com"
        />
      </Form>
    </Container>
  );
}

Register.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      typePerson: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
