import PropTypes from 'prop-types';

import color from './colors';

export default function randomColor(index) {
  if (index >= color.colors.length) {
    return color.colors[0];
  }

  return color.colors[index];
}

randomColor.propTypes = {
  index: PropTypes.number.isRequired,
};
