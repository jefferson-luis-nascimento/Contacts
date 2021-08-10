import React from 'react';
import PropTypes from 'prop-types';

import { Container, Initials } from './styles';

import randomColor from '~/util/randomColor';

export default function Avatar({ url, index, defaultText }) {
  const words = defaultText.split(' ');

  const initials = `${words[0].substring(0, 1)}${
    words.length > 1 ? words[words.length - 1].substring(0, 1) : ''
  }`;

  const color = randomColor(index);
  return (
    <Container>
      {url ? (
        <img src={url} alt={defaultText} />
      ) : (
        <Initials color={color}>{initials}</Initials>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number.isRequired,
  defaultText: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  url: null,
};
