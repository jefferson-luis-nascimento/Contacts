import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 36px;
    height: 36px;

    border-radius: 50%;
  }
`;

export const Initials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: ${(props) => lighten(0.25, props.color)};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: ${(props) => props.color};
  margin: 0 5px;
`;
