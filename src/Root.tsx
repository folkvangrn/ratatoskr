import { Route, Routes } from 'react-router-dom';
import { Clients } from './components/organisms/Clients/Clients';
import { Ingredients } from './components/organisms/Ingredients/Ingredients';
import { Meals } from './components/organisms/Meals/Meals';
import { Orders } from './components/organisms/Orders/Orders';

function Root() {
  return (
    <Routes>
      <Route path="/clients" element={<Clients />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="*" element={<Clients />} />
    </Routes>
  );
}

export default Root;
