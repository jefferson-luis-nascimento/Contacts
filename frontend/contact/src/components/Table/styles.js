import styled from 'styled-components';

export const Container = styled.div``;

export const TableList = styled.table`
  width: 100%;
  border: none;
  border-spacing: 0 15px;

  th {
    font-size: 16px;
    color: #666;
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
