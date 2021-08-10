import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '~/components/Container';
import Panel from '~/components/Panel';
import RegisterHeader from '~/components/RegisterHeader';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function NaturalPersonRegister() {
  const formRef = useRef(null);

  function handleBack() {
    history.goBack();
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        cpf: Yup.string().required('CPF is required'),
        birthday: Yup.string().required('Birthday is required'),
        gender: Yup.string().required('Gender is required'),
        addressLine1: Yup.string().required('Address Line 1 is required'),
        addressLine2: Yup.string(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        zipCode: Yup.string().required('ZipCode is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        cpf,
        birthday,
        gender,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode,
      } = data;

      try {
        await api.post('/naturalperson', {
          name,
          cpf,
          birthday,
          gender,
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          zipCode,
        });

        toast.success('Contact register successfully!');

        reset();
        handleBack();
      } catch (error) {
        toast.error('Error on save contact!');
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
        New Contact
      </RegisterHeader>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Panel>
          <Input type="text" name="name" label="Name" placeholder="John Doe" />
          <Input
            type="text"
            name="cpf"
            label="CPF"
            placeholder="EX. 123.456.789-01"
          />
          <Input
            type="text"
            name="birthday"
            label="Birthday"
            placeholder="Ex. 15/08/1985"
          />
        </Panel>
        <Panel>
          <Input type="text" name="gender" label="Gender" placeholder="Male" />
          <Input
            type="text"
            name="addressLine1"
            label="Address Line 1"
            placeholder="EX. 22 Acacia Avenue"
          />
          <Input
            type="text"
            name="addressLine2"
            label="address Line 2"
            placeholder=""
          />
        </Panel>
        <Panel>
          <Input
            type="text"
            name="city"
            label="City"
            placeholder="Ex. São Paulo"
          />
          <Input
            type="text"
            name="state"
            label="State"
            placeholder="Ex.SP"
            max-legth="2"
          />
          <Input
            type="text"
            name="country"
            label="Country"
            placeholder="EX. Brasil"
          />
        </Panel>
        <Panel>
          <Input
            type="text"
            name="zipCode"
            label="Zip Code"
            placeholder="Ex. 12345-147"
          />
        </Panel>
      </Form>
    </Container>
  );
}
