import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { Client } from '@/types/Client';
import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddClient } from './AddClient';

type ClientListItemProps = {
  client: Client;
  refetchClients: VoidFunction;
};

export function ClientListItem({ client, refetchClients }: ClientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);
  
  const componentsArray = [
    <p>{`${client.firstName} ${client.lastName}`}</p>,
    <p>{client.phoneNumber}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
  ];



  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddClient
        refetchClients={()=>{}} //add method to
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          clientId={client.id}
          //   refetchClients={refetchClients}
        />
      ) : null}
    </>
  );
}
