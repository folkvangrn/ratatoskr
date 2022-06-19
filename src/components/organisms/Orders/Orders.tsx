import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { AddOrder } from './AddOrder';
import { Order } from '@/types/Order';
import { filterBySearchingPhrase } from '../helpers';
import { OrderListItem } from './OrderListItem';

export function Orders() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Orders';

  const orders: Order[] = [
    {
      id: 11,
      totalPrice: 22,
      meals: [],
    },
    {
      id: 13,
      totalPrice: 55,
      meals: [],
    },
    {
      id: 15,
      totalPrice: 44,
      meals: [],
    },
  ];

  const filteredOrders = orders?.filter(order =>
    filterBySearchingPhrase(searchingPhrase, [
      order.id?.toString(),
      order.totalPrice.toString(),
    ])
  );

  return (
    <Dashboard>
      <ListWrapper
        handleOpenModal={handleOpenModal}
        singularName="Order"
        handleChangeSearchInput={setSearchingPhrase}
      >
        {isModalOpen ? (
          <AddOrder
            isOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            refetchOrders={() => {}} //TODO: Add refetchClients method
          />
        ) : null}
        {filteredOrders.map(order => (
          <OrderListItem
            order={order}
            refetchOrders={() => {}}
            key={order.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
