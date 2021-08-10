import React, { useState, useEffect, useCallback } from 'react';
import { MdEdit, MdRemoveRedEye } from 'react-icons/md';

import Container from '~/components/Container';
import Filter from '~/components/Filter';
import Table from '~/components/Table';
import PageTitle from '~/components/PageTitle';

import api from '~/services/api';
import history from '~/services/history';

export default function Contact() {
  const [data, setData] = useState(null);
  const [paging, setPaging] = useState({ currentPage: 1, totalPages: 1 });
  const [filter, setFilter] = useState('');

  const numberOfPages = useCallback((totalItems, itemsPerPage) => {
    const rest = totalItems % itemsPerPage;

    return Math.trunc(totalItems / itemsPerPage) + (rest > 0 ? 1 : 0);
  }, []);

  const loadContacts = useCallback(
    (page) => {
      async function load() {
        const response = await api.get('/contact');

        setPaging({
          currentPage: page,
          itemsPerPage: 5,
          totalPages: numberOfPages(response.data.count, 5),
        });

        setData({
          columns: [
            { name: 'Id', type: 'id', show: false },
            { name: 'Index', show: false },
            { name: 'Type' },
            { name: 'Name' },
            { name: 'Document' },
            { name: 'City' },
            { name: 'State' },
          ],
          items: response.data.payload.map((contact, index) => {
            return {
              id: contact.id,
              index,
              typePerson:
                contact.typePerson === 'LegalPerson' ? 'Legal' : 'Natural',
              name:
                contact.typePerson === 'LegalPerson'
                  ? contact.companyName
                  : contact.name,
              document:
                contact.typePerson === 'LegalPerson'
                  ? contact.cnpj
                  : contact.cpf,
              city: contact.city,
              state: contact.state,
            };
          }),
          actions: [
            {
              name: 'View',
              icon: {
                Icon: MdRemoveRedEye,
                size: 20,
                color: '#4d85ee',
                to: '/',
              },
            },
            {
              name: 'Edit',
              icon: {
                Icon: MdEdit,
                size: 20,
                color: '#4d85ee',
              },
            },
          ],
        });
      }

      load();
    },
    [numberOfPages]
  );

  useEffect(() => {
    loadContacts(1);
  }, []);

  useEffect(() => {
    loadContacts(paging.currentPage, filter);
  }, [filter]);

  function handleRegisterNormalPerson() {
    history.push('/register-np');
  }

  function handleRegisterLegalPerson() {
    history.push('/register-lp');
  }

  function handleEdit(id, typePerson) {
    if (typePerson === 'Legal') {
      history.push(`/edit-lp/${id}`);
    } else {
      history.push(`/edit-np/${id}`);
    }
  }

  async function handleView(id) {
    history.push(`/register/${id}/true`);
  }

  function handleAction(action, id) {
    switch (action.toLowerCase()) {
      case 'edit':
        handleEdit(id);
        break;
      case 'view':
        handleView(id);
        break;
      default:
        throw new Error('Action not found.');
    }
  }

  return (
    <Container>
      <PageTitle>Welcome to MyContacts</PageTitle>
      <Filter
        filter={filter}
        setFilter={setFilter}
        placeholder="Find by name"
        handleRegisterNormalPerson={handleRegisterNormalPerson}
        handleRegisterLegalPerson={handleRegisterLegalPerson}
      />
      <Table
        data={data}
        paging={paging}
        loadItems={loadContacts}
        handleAction={handleAction}
      />
    </Container>
  );
}
