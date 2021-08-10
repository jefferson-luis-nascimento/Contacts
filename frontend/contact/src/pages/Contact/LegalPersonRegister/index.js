import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '~/components/Container';
import Panel from '~/components/Panel';
import RegisterHeader from '~/components/RegisterHeader';
import Input from '~/components/Form/Input';
import Form from '~/components/Form';

import api from '~/services/api';
import history from '~/services/history';

export default function LegalPersonRegister({ match }) {
  const formRef = useRef(null);

  const { id } = match.params;

  useEffect(() => {
    async function loadContact() {
      if (id) {
        const response = await api.get(`/contact/legal-person/${id}`);

        formRef.current.setData({
          companyName: response.data.companyName,
          tradeName: response.data.tradeName,
          cnpj: response.data.cnpj,
          addressLine1: response.data.addressLine1,
          addressLine2: response.data.addressLine2,
          city: response.data.city,
          state: response.data.state,
          country: response.data.coutry,
          zipCode: response.data.zipCode,
        });
      }
    }

    loadContact();
  }, [id]);

  function handleBack() {
    history.goBack();
  }

  async function handleSubmit(data, { reset }) {
    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        companyName: Yup.string().required('Company Name is required'),
        tradeName: Yup.string().required('Trade Name is required'),
        cnpj: Yup.string().required('CNPJ is required'),
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
        companyName,
        tradeName,
        cnpj,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zipCode,
      } = data;

      try {
        if (id) {
          await api.put('/legalperson', {
            id,
            companyName,
            tradeName,
            cnpj,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            zipCode,
          });
        } else {
          await api.post('/legalperson', {
            companyName,
            tradeName,
            cnpj,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            zipCode,
          });
        }
        toast.success('Contact is saved successfully!');

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
        {!id ? 'New Legal Person' : 'Edit Legal Person'}
      </RegisterHeader>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Panel>
          <Input
            type="text"
            name="companyName"
            label="Company Name"
            placeholder="Ex. Femsa SA"
          />
          <Input
            type="text"
            name="tradeName"
            label="Trade Name"
            placeholder="Ex. Coca Cola Company"
          />
          <Input
            type="text"
            name="cnpj"
            label="CNPJ"
            placeholder="EX. 01.234.456/0001-01"
          />
        </Panel>
        <Panel>
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
          <Input
            type="text"
            name="city"
            label="City"
            placeholder="Ex. São Paulo"
          />
        </Panel>
        <Panel>
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

LegalPersonRegister.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
