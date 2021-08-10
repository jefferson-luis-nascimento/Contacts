import React, { useState, useEffect } from 'react';

import { Container, TableList } from './styles';
import Action from '~/components/Action';
import Avatar from '~/components/Avatar';
import NameWithInitials from '~/components/NameWithInitials';
import Status from '~/components/Status';
import Paging from '~/components/Paging';

export default function Table({ data, paging, loadItems, handleAction }) {
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if (!data) return;

    setNewData({
      columns: data.columns.map((column) => ({
        name: column.name,
        type: column.type ? column.type : '',
        show: column.show === undefined ? true : column.show,
      })),
      actions: data.actions,
      items: data.items.map((item) => ({
        id: item.id,
        newItem: Object.values(item).map((value, index) => {
          return {
            value,
            type: data.columns[index].type || '',
            show:
              data.columns[index].show === undefined
                ? true
                : data.columns[index].show,
            index: item.index,
          };
        }),
      })),
    });
  }, [data]);

  function renderColumn(item) {
    if (!item.show) return <></>;

    switch (item.type) {
      case 'id':
        return <td key={item.value}>#{item.value}</td>;
      case 'initials':
        return (
          <td key={item.value.name}>
            <NameWithInitials index={item.index} avatar_url={item.value.url}>
              {item.value.name}
            </NameWithInitials>
          </td>
        );
      case 'image':
        return (
          <td className="" key={item.value.url}>
            <Avatar
              url={item.value.url}
              index={item.index}
              defaultText={item.value.defaultValue}
            />
          </td>
        );
      case 'status':
        return (
          <>
            <td key={item.value}>
              <Status>{item.value}</Status>
            </td>
          </>
        );
      default:
        return <td key={item.value}>{item.value}</td>;
    }
  }

  return (
    <Container>
      <TableList>
        <thead>
          <tr>
            {newData &&
              newData.columns.map(
                (column) =>
                  column.show && <th key={column.name}>{column.name}</th>
              )}
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newData &&
            newData.items.map((newItem) => (
              <tr key={newItem.id}>
                {Object.values(newItem).map((value) =>
                  Object.values(value).map((newValue) => renderColumn(newValue))
                )}
                <td key="action" className="actions">
                  <Action
                    id={newItem.id}
                    actions={newData.actions}
                    handleAction={handleAction}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </TableList>
      <Paging paging={paging} loadItems={loadItems} />
    </Container>
  );
}
