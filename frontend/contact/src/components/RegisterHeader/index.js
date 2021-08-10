import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Container, BackButton, SaveButton } from './styles';
import PageTitle from '~/components/PageTitle';

export default function RegisterHeader({ children, handleBack, handleSave }) {
  return (
    <Container>
      <PageTitle>{children}</PageTitle>
      <div>
        <BackButton type="button" onClick={handleBack}>
          <MdChevronLeft size={24} color="#666" />
          <span>Back</span>
        </BackButton>
        <SaveButton type="button" onClick={handleSave}>
          <MdCheck size={24} color="#666" />
          <span>Save</span>
        </SaveButton>
      </div>
    </Container>
  );
}

RegisterHeader.propTypes = {
  children: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
