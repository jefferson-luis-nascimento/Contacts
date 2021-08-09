import React from 'react';

import { Container, Content, Profile } from './styles';

import history from '../../services/history';

const Header: React.FC = () => {
  function handleNewContact() {
    history.push(`/contact/register`);
  }

  return (
    <Container>
      <Content>
        <aside>
          <Profile>
            <button type="button" onClick={handleNewContact}>
              New Contact
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
};

export default Header;
