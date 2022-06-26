import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { AddOrder } from './AddOrder';
import { Order } from '@/types/Order';
import { filterBySearchingPhrase } from '../helpers';
import { OrderListItem } from './OrderListItem';
import { useGet } from '@/hooks/useGet';
const GET_ORDERS_QUERY = 'http://localhost:8080/take/restaurant/order';

export function Orders() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  const [searchingPhrase, setSearchingPhrase] = useState<string>('');
  document.title = 'Orders';

  const {
    data: orders = [],
    error,
    isLoading,
    refetchData: refetchOrders,
  } = useGet<Order[]>({ query: GET_ORDERS_QUERY });

  const filteredOrders = orders?.filter(order =>
    filterBySearchingPhrase(searchingPhrase, [
      order.id?.toString(),
      order.totalPrice.toString(),
    ])
  );
  console.log(orders);

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
            refetchOrders={refetchOrders} //TODO: Add refetchClients method
          />
        ) : null}
        {filteredOrders?.map(order => (
          <OrderListItem
            order={order}
            refetchOrders={refetchOrders}
            key={order.id}
          />
        ))}
      </ListWrapper>
    </Dashboard>
  );
}
