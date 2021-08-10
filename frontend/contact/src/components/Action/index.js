import React, { useState, useEffect } from 'react';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, ActionList, ActionItem } from './styles';

export default function Action({ id, actions, handleAction }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function renderIcon(icon) {
    const { Icon, size, color } = icon;

    return <Icon size={size} color={color} />;
  }

  function handleActionSelected(action) {
    setVisible(false);
    handleAction(action, id);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} visible={visible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        {actions.map((action) => (
          <ActionItem
            key={action.name}
            onClick={() => handleActionSelected(action.name)}
          >
            <>{renderIcon(action.icon)}</>
            <span>{action.label ? action.label : action.name}</span>
          </ActionItem>
        ))}
      </ActionList>
    </Container>
  );
}
