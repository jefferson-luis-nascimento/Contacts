import React from 'react';

import { ContentChild } from './styles';

export default function Panel({ children }) {
  return <ContentChild>{children}</ContentChild>;
}
