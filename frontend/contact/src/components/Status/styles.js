import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
`;

export const Content = styled.span`
  margin-right: auto;
  background: ${(props) => lighten(0.3, props.color)};
  border: 0;
  position: relative;
  height: 30px;
  padding: 7px 10px 2px 20px;
  border-radius: 30px;
  font-size: 10px;
  font-weight: bold;
  color: ${(props) => props.color};

  &::before {
    position: absolute;
    left: 10px;
    top: 13px;
    width: 6px;
    height: 6px;
    background: ${(props) => props.color};
    content: '';
    border-radius: 50%;
  }
`;
