import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Error({ children }) {
  return <Container>{children}</Container>;
}

Error.propTypes = {
  children: PropTypes.string.isRequired,
};
