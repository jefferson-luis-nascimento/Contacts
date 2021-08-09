/* import styled from 'styled-components';

export const Container = styled.div``;

export const TableList = styled.table`
  width: 100%;
  border: none;
  border-spacing: 0 15px;
  th {
    font-size: 16px;
    color: #444;
    text-align: left;
    padding: 5px 10px;
  }
  th.actions {
    text-align: right !important;
  }
  td {
    background: #fff;
    color: #666;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px;
    > div {
      display: flex;
      justify-content: flex-start;
    }
  }
  td.actions {
    > div {
      display: flex;
      justify-content: flex-end;
    }
  }
  td:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  td:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
*/
import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 32px;
  color: #3a3a3a;
  max-width: 350px;
  line-height: 40px;
  margin-top: 40px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 20px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 50px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    font-size: 16px;
    border: 2px solid #fff;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 200px;
    height: 50px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 50px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(50px);
    }

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin-left: 16px;

      strong {
        font-size: 16px;
        color: #3d3d4d;
      }

      p {
        font-size: 14px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
