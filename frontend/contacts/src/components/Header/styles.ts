import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 44px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  aside {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #999;
    font-weight: bold;
    margin: 0 10px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  strong {
    color: #666;
    font-weight: bold;
    font-size: 16px;
  }
  button {
    color: #ffff;
    border: none;
    background: green;
    height: 40px;
    width: 200px;
    border-radius: 4px;

    &:hover {
      background: ${() => darken(0.05, 'green')};
    }
  }
`;
