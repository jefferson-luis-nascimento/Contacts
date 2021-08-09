import React, { useState, useEffect } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, Badge, ActionList, ActionItem } from './styles';

interface IconInterface {
  icon?: React.ComponentType<IconBaseProps>;
  size: number;
  color: string;
}

interface Action {
  name: string;
  icon: IconInterface;
  label: string;
}

interface ActionProps {
  id: string;
  actions: Action[];
  handleAction(action: string, id: string): void;
}

const Action: React.FC<ActionProps> = ({
  id,
  actions,
  handleAction,
}: ActionProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function renderIcon(icon: IconInterface) {
    const { icon: Icon, size, color } = icon;

    return Icon && <Icon size={size} color={color} />;
  }

  function handleActionSelected(action: string) {
    setVisible(false);
    handleAction(action, id);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} visible={visible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        {actions.map(action => (
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
};

export default Action;
