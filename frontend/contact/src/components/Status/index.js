import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

const statusColor = {
  entregue: '#2ca42b',
  pendente: '#c1bc35',
  retirada: '#4d85ee',
  cancelada: '#de3b3b',
};

export default function Status({ children }) {
  const color = statusColor[children.toLowerCase()];
  const status = children.toUpperCase();

  if (!color) {
    throw new Error('Status Inválido');
  }

  return (
    <Container>
      <Content color={color}>{status}</Content>
    </Container>
  );
}

Status.propTypes = {
  children: PropTypes.string.isRequired,
};
