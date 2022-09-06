import React, { useState } from 'react';
import Headers from '../public_component/Header';
import Footer from '../public_component/Footer';
import BackToTop from '../public_component/BackToTop';
import '../../styles/Order/orderstep.scss';
import StepNavigation from './component/StepNavigation';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderCheck from './pages/OrderCheck';

const OrderStep = () => {
  const stepLabel = ['確認購物車', '填寫資料', '訂單完成'];
  const [currentStep, updateCurrentStep] = useState(1);

  const stepComponent = (s) => {
    switch (s) {
      case 1:
        return (
          <Cart
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <Checkout
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <OrderCheck
            updateCurrentStep={updateCurrentStep}
            currentStep={currentStep}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <Headers />

      <div className="cartPage">
        <StepNavigation currentStep={currentStep} stepLabel={stepLabel} />

        {stepComponent(currentStep)}
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default OrderStep;
