import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  img {
    margin: 60px 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 16px;
      font-weight: bold;
      align-self: flex-start;
      margin: 10px 20px;
    }

    span {
      color: #ff1a40;
      align-self: flex-start;
      margin: 5px 20px;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      margin: 0px 20px;
      font-size: 16px;
      height: 44px;
    }

    button {
      border: none;
      border-radius: 4px;
      background: #ccc;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      height: 44px;
      margin: 30px 20px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#ccc')};
      }
    }
  }
`;
