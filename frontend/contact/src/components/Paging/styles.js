import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    margin: 10px;
    padding: 5px;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      background: #ddd;
    }
  }

  span {
    color: #444;
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
  }
`;
