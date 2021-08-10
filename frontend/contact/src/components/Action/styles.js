import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Badge = styled.button`
  background: ${(props) => (props.visible ? '#bbb' : 'none')};
  border: 0;
  position: relative;
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    background: #eeefff;
  }
`;

export const ActionList = styled.div`
  flex: 1;
  display: ${(props) => {
    return props.visible ? 'block' : 'none';
  }};
  z-index: 1;
  position: absolute;
  min-width: 250x;
  left: calc(50% - 30px);
  top: calc(100% + 10px);
  background: #fff;
  border: 1px solid #eeefff;
  border-radius: 4px;
  padding: 10px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 5px);
    top: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
  }
`;

export const ActionItem = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none;
  border: 0;
  width: 100%;
  padding: 10px;

  & + button {
    border-top: 1px solid #eeefff;
    width: 100%;
  }

  span {
    margin-left: 10px;
    color: #999;
  }

  &:hover {
    background: #eeefff;
  }
`;
