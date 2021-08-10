import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function Filter({
  filter,
  setFilter,
  placeholder,
  handleRegister,
}) {
  return (
    <Container>
      <div>
        <MdSearch size={24} color="#999" />
        <input
          type="text"
          name="filer"
          id="filter"
          placeholder={placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleRegister}>
        <MdAdd size={24} color="#666" />
        <span>New Contact</span>
      </button>
    </Container>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleRegister: PropTypes.func.isRequired,
};
