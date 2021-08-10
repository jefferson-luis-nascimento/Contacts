import React, { forwardRef } from 'react';

import { Container } from './styles';

const Form = forwardRef((props, ref) => {
  const { children } = props;
  return (
    <Container ref={ref} {...props}>
      {children}
    </Container>
  );
});

export default Form;
