import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { Client } from '@/types/Client';
import { handleDeleteEntity } from '../helpers';
import { AddClient } from './AddClient';

type ClientListItemProps = {
  client: Client;
  refetchClients: VoidFunction;
};
const GET_CLIENTS_QUERY = 'http://localhost:8080/take/restaurant/client';

export function ClientListItem({
  client,
  refetchClients,
}: ClientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{`${client.name} ${client.surname}`}</p>,
    <p>{client.email}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button
      text="Delete"
      onClick={() =>
        handleDeleteEntity({
          query: `${GET_CLIENTS_QUERY}/${client.id}`,
          afterDeleteFn: refetchClients,
        })
      }
    />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddClient
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          clientId={client.id}
          refetchClients={refetchClients}
        />
      ) : null}
    </>
  );
}
