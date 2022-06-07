import { Dashboard } from '@/components/molecules/Dashboard/Dashboard';
import { ListWrapper } from '@/components/molecules/ListWrapper/ListWrapper';
import { useModal } from '@/hooks/useModal';

export function Orders() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal(false);
  document.title = 'Orders';

  return (
    <Dashboard>
      <ListWrapper handleOpenModal={handleOpenModal} singularName="Order">
        <div>xdddd</div>
        <div>blabla</div>
      </ListWrapper>
    </Dashboard>
  );
}
