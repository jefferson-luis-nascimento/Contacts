import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled(Form)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: #fff;
  border-radius: 4px;
  margin: 20px 10px;
  padding: 10px;

  min-height: 400px;
`;
