import { Route, Routes } from 'react-router-dom';
import { Clients } from './components/organisms/Clients/Clients';
import { Orders } from './components/organisms/Orders/Orders';

function Root() {
  return (
    <Routes>
      <Route path="/clients" element={<Clients />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<Clients />} />
    </Routes>
  );
}

export default Root;
