import React from 'react';
import { useActivityCart } from '../../../../orderContetxt/useActivityCart';
import { useProductCart } from '../../../../orderContetxt/useProductCart';

const Summary = (props) => {
  const productCart = useProductCart();
  const activityCart = useActivityCart();
  return (
    <>
      <h2 className="h1 ps-3 pb-2 text-center">付款摘要</h2>
      <hr />

      <div className="row summary">
        <div className="row text-end">
          <div className="col">
            共 {productCart.state.totalItems + activityCart.state.totalItems}{' '}
            項目
          </div>
        </div>
        <div className="row">
          <div className="row text-end">
            <div className="col-10">總計：</div>
            <div className="col">
              $ {productCart.state.cartTotal + activityCart.state.cartTotal}
            </div>
          </div>
          {/* TODO: 點數 */}
          <div className="row text-end ">
            <div className="col-10">LIFE點數(現有:265)：</div>
            <div className="col-2">
              100
              {/* <select>
                <option value={100} />
              </select> */}
            </div>
          </div>
          <div className="row text-end text-danger ">
            <div className="col-10">折扣金額：</div>
            <div className="col">-100</div>
          </div>
          <div className="row text-end">
            <div className="col-10">應付金額：</div>
            <div className="col">
              ${' '}
              {productCart.state.cartTotal + activityCart.state.cartTotal - 100}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="summaryex">
        <div className="row text-center">
          <div className="col">
            共 {productCart.state.totalItems + activityCart.state.totalItems}{' '}
            項目
          </div>
        </div>
        <div className="row">
          <div className="row gap-3">
            <div className="col text-end">總計：</div>
            <div className="col text-start">
              $ {productCart.state.cartTotal + activityCart.state.cartTotal}
            </div>
          </div>
          <div className="row gap-3 ">
            <div className="col text-end">LIFE點數(現有:265)：</div>
            <div className="col text-start">100</div>
          </div>
          <div className="row gap-3 text-danger ">
            <div className="col text-end">折扣金額：</div>
            <div className="col text-start">-100</div>
          </div>
          <div className="row gap-3">
            <div className="col text-end">應付金額：</div>
            <div className="col text-start">
              ${' '}
              {productCart.state.cartTotal + activityCart.state.cartTotal - 100}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Summary;
