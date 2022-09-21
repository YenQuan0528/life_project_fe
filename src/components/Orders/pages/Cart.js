import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStep } from '../../../orderContetxt/useCartStep';
import OrderList from './CartPage/OrderList';
import Summary from './CartPage/Summary';

const Cart = (props) => {
  const { setCurrentStep } = useCartStep();
  useEffect(() => {
    setCurrentStep(1);
  }, []);

  return (
    <>
      <OrderList />
      <Summary />
      <div className="orderStepBtns gap-3">
        <Link to="/products" className="btn stepBtn prevButton">
          繼續購買
        </Link>
        <Link to="/orderstep/checkout" className="btn stepBtn nextButton">
          下一步
        </Link>
      </div>
    </>
  );
};

export default Cart;
