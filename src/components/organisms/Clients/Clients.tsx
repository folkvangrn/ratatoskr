import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useGet } from '@/hooks/useGet';
import { useModal } from '@/hooks/useModal';
import { Client } from '@/types';
import { useState } from 'react';
import { filterBySearchingPhrase } from '../helpers';
import { AddClient } from './AddClient';
import { ClientListItem } from './ClientListItem';

const GET_CLIENTS_QUERY = 'http://localhost:8080/take/restaurant/client';

export function Clients() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  const {
    data: clients = [],
    error,
    isLoading,
    refetchData: refetchClients,
  } = useGet<Client[]>({ query: GET_CLIENTS_QUERY });

  document.title = 'Clients';
  const filteredClients = clients?.filter(client =>
    filterBySearchingPhrase(searchingPhrase, [client.name, client.surname])
  );

  return (
    <Dashboard>
      <ListWrapper
        handleOpenModal={handleOpenModal}
        singularName="Client"
        handleChangeSearchInput={setSearchingPhrase}
      >
        {isModalOpen ? (
          <AddClient
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            refetchClients={refetchClients}
          />
        ) : null}
        {(filteredClients || []).map(client => (
          <ClientListItem
            client={client}
            refetchClients={refetchClients}
            key={client.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
