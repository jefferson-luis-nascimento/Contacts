import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function Filter({
  handleRegisterNormalPerson,
  handleRegisterLegalPerson,
}) {
  return (
    <Container>
      <button type="button" onClick={handleRegisterNormalPerson}>
        <MdAdd size={24} color="#666" />
        <span>New Natural Person</span>
      </button>

      <button type="button" onClick={handleRegisterLegalPerson}>
        <MdAdd size={24} color="#666" />
        <span>New Legal Person</span>
      </button>
    </Container>
  );
}

Filter.propTypes = {
  handleRegisterNormalPerson: PropTypes.func.isRequired,
  handleRegisterLegalPerson: PropTypes.func.isRequired,
};
