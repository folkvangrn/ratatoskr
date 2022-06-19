import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { Client } from '@/types/Client';
import { useState } from 'react';
import { filterBySearchingPhrase } from '../helpers';
import { AddClient } from './AddClient';
import { ClientListItem } from './ClientListItem';

export function Clients() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');

  document.title = 'Clients';

  const clients: Client[] = [
    {
      firstName: 'imie',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
      id: 2,
    },
    {
      firstName: 'lala',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
      id: 5,
    },
    {
      firstName: 'oke',
      lastName: 'nazwisko',
      phoneNumber: 'phonenr',
      address: 'address',
      id: 10,
    },
  ];

  const filteredClients = clients?.filter(client =>
    filterBySearchingPhrase(searchingPhrase, [
      client.firstName,
      client.lastName,
    ])
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
            refetchClients={() => {}} //TODO: Add refetchClients method
          />
        ) : null}
        {filteredClients.map(client => (
          <ClientListItem
            client={client}
            refetchClients={() => {}}
            key={client.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
