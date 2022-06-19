import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/atoms/Button/Button';

import { ListItemElements } from '@/components/atoms/ListItemElements/ListItemElements';
import { AddOrder } from './AddOrder';
import { Order } from '@/types/Order';

type ClientListItemProps = {
  order: Order;
  refetchOrders: VoidFunction;
};

export function OrderListItem({ order, refetchOrders }: ClientListItemProps) {
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal(false);

  const componentsArray = [
    <p>{order.id}</p>,
    <p>{order.totalPrice}</p>,
    <Button text="Edit" onClick={handleOpenModal} />,
    <Button text="Delete" onClick={() => {}} />,
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
