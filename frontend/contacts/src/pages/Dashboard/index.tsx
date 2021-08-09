import React, { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';

import Action from '../../components/Action';
import Header from '../../components/Header';
import { Container, Table, Title, Row } from './styles';

import api from '../../services/api';
import history from '../../services/history';

interface Contact {
  id: string;
  companyName: string;
  cnpj: string;
  name: string;
  cpf: string;
  typePerson: 'LegalPerson' | 'NaturalPerson';
  city: string;
  state: string;
}

interface Result {
  success: boolean;
  message: string;
  payload: Contact[];
}

const Dashboard: React.FC<Result> = () => {
  const [contacts, setContacs] = useState<Contact[]>([]);

  function handleVisualize(id: string) {
    history.push(`/contact/visualize/${id}`);
  }
  function handleEdit(id: string) {
    history.push(`/contact/edit/${id}`);
  }

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get<Result>(`contact`);

      if (response.data.payload) {
        setContacs(response.data.payload);
      }
    }

    loadContacts();
  }, []);

  function handleAction(action: string, id: string) {
    switch (action.toLowerCase()) {
      case 'visualize':
        handleVisualize(id);
        break;
      case 'edit':
        handleEdit(id);
        break;
      default:
        throw new Error('Action not found.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Welcome to MyContacts</Title>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Document</th>
              <th>City</th>
              <th>State</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <Row key={contact.id} rowPair={index % 2 === 0}>
                <td className="name">
                  {contact.typePerson === 'LegalPerson'
                    ? contact.companyName
                    : contact.name}
                </td>
                <td className="document">
                  {contact.typePerson === 'LegalPerson'
                    ? contact.cnpj
                    : contact.cpf}
                </td>
                <td className="city">{contact.city}</td>
                <td className="state">{contact.state}</td>
                <td key="action" className="actions">
                  <Action
                    id={contact.id}
                    actions={[
                      {
                        name: 'visualize',
                        icon: {
                          icon: MdRemoveRedEye,
                          size: 20,
                          color: '#4d85ee',
                        },
                        label: 'Visualize',
                      },
                      {
                        name: 'edit',
                        icon: {
                          icon: MdEdit,
                          size: 20,
                          color: '#4d85ee',
                        },
                        label: 'Edit',
                      },
                    ]}
                    handleAction={handleAction}
                  />
                </td>
              </Row>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Dashboard;
