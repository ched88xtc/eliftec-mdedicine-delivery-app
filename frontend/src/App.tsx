import { PageHeader } from './components/PageHeader/PageHeader';
import { Routes, Route } from 'react-router-dom';
import { ShopPageWrapper } from './components/ShopPage/ShopPageWrapper';
import { ShoppingCart } from './components/ShoppingCartPage/ShoppingCart';
import { CompletedOrder } from './components/CompletedOrder/CompletedOrder';
import { OrdersHistory } from './components/OrdersHistory/OrdersHistory';
import { CouponsPage } from './components/CouponsPage/CouponsPage';

function App() {
  return (
    <>
      <PageHeader/>
      <Routes>
        <Route path='/' element={<ShopPageWrapper />} />
        <Route path='/cart' element={<ShoppingCart />} />
        <Route path='/completed-order/:orderId' element={<CompletedOrder />} />
        <Route path='/history' element={<OrdersHistory />} />
        <Route path='/coupons' element={<CouponsPage />} />
      </Routes>
    </>
  );
}

export default App;
