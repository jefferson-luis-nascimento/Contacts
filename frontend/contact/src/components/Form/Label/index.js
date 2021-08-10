import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Label({ children }) {
  return <Container>{children}</Container>;
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
};
