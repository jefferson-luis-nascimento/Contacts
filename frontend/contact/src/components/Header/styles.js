import styled from 'styled-components';

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

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      width: 174px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #999;
    }
  }

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
    color: #de3b3b;
    border: none;
    background: #fff;
    font-size: 14px;
  }
`;
