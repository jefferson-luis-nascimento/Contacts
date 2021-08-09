import styled from 'styled-components';
import { darken } from 'polished';

interface RowProps {
  rowPair: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1000px;
  min-width: 500px;
  margin: auto;
  margin-top: 40px;
`;

export const Title = styled.h1`
  height: 20px;
  font-weight: bold;
  color: #5c5c5c;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border: none;
  margin-top: 20px;
  border-spacing: 0 15px;
  th {
    font-size: 16px;
    color: #444;
    text-align: left;
    padding: 5px 10px;
  }
  th.actions {
    text-align: right;
  }
`;

export const Row = styled.tr<RowProps>`
  background: ${props => (props.rowPair ? '#fafafb' : '#fff')};
  &:hover {
    background: ${props => darken(0.05, props.rowPair ? '#fafafb' : '#fff')};
  }
  td.name {
    width: 40%;
  }
  td.document {
    width: 30%;
  }
  td.city {
    width: 10%;
  }
  td.state {
    width: 10%;
  }
  td {
    background: none;
    color: #333;
    text-align: left;
    line-height: 20px;
    padding: 5px 10px;
  }
  td.actions {
    width: 20%;
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
