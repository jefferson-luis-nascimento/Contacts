import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PageTitle({ children }) {
  return <Container>{children}</Container>;
}

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
