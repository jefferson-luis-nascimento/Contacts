import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { Container, Content, Menu, Profile } from './styles';

import logo from '~/assets/fastfeet-logo.png';

import { signOut } from '~/store/modules/auth/actions';

const styles = {
  activeStyle: {
    fontWeight: 'bold',
    color: '#333',
  },
};

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.profile.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="FastFeet" />
          </Link>

          <Menu>
            <NavLink to="/deliveries" activeStyle={styles.activeStyle}>
              ENCOMENDAS
            </NavLink>
            <NavLink to="/deliverymen" activeStyle={styles.activeStyle}>
              ENTREGADORES
            </NavLink>
            <NavLink to="/recipients" activeStyle={styles.activeStyle}>
              DESTINATÁRIOS
            </NavLink>
            <NavLink to="/problems" activeStyle={styles.activeStyle}>
              PROBLEMAS
            </NavLink>
          </Menu>
        </nav>
        <aside>
          <Profile>
            <strong>{name}</strong>
            <button type="button" onClick={handleSignOut}>
              Sair do Sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
