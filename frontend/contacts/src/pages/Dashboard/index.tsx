import React, { useState, useEffect } from 'react';

import { Title } from './styles';

import api from '../../services/api';

interface Contact {
  id: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  name: string;
  cpf: string;
  birthday: Date;
  gender: string;
  typePerson: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface Result {
  success: boolean;
  message: string;
  payload: { contacts: Contact[] };
}

const Dashboard: React.FC<Result> = () => {
  const [contacts, setContacs] = useState<Contact[]>([]);

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get<Result>(`contact`);

      if (response.data.payload) {
        setContacs(response.data.payload.contacts);
      }
    }

    loadContacts();
  }, []);

  return (
    <>
      <Title>My Contacts</Title>

      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.name ?? contact.companyName}</li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
