import React from 'react';
import PropTypes from 'prop-types';

import { Container, Name } from './styles';

import Avatar from '~/components/Avatar';

export default function NameWithInitials({ children, index, avatar_url }) {
  return (
    <Container>
      <Avatar url={avatar_url} index={index} defaultText={children} />
      <Name>{children}</Name>
    </Container>
  );
}

NameWithInitials.propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  avatar_url: PropTypes.string,
};

NameWithInitials.defaultProps = {
  avatar_url: null,
};
