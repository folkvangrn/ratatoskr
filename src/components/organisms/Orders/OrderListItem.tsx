import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddOrder } from './AddOrder';
import { Order } from '@/types/Order';
import { handleDeleteEntity } from '../helpers';

type OrderListItemProps = {
  order: Order;
  refetchOrders: VoidFunction;
};
const GET_ORDERS_QUERY = 'http://localhost:8080/take/restaurant/order';

export function OrderListItem({ order, refetchOrders }: OrderListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <div>
      <p>Order id: {order.id}</p>
      <br />
      <p>Ordered at: {new Date(order?.orderedAt!).toTimeString()}</p>
    </div>,
    <p>Price: {order.totalPrice}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button
      text="Delete"
      onClick={() =>
        handleDeleteEntity({
          query: `${GET_ORDERS_QUERY}/${order.id}`,
          afterDeleteFn: refetchOrders,
        })
      }
    />,
  ];

  return (
    <>
      <ListItemElements componentsArray={componentsArray} />
      {isModalOpen ? (
        <AddOrder
          refetchOrders={refetchOrders} //add method to
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          orderId={order.id}
        />
      ) : null}
    </>
  );
}
