import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 30px;

  > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  background: #ccc;
  color: #fff;
  width: 100px;
  padding: 5px 10px;
  margin-right: 10px;
  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#ccc')};
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  background: #ccc;
  color: #fff;
  width: 100px;
  padding: 5px 10px;
  font-weight: bold;

  &:hover {
    background: ${darken(0.1, '#ccc')};
  }
`;
