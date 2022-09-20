import { Field, ErrorMessage } from 'formik';
import CreditCard from './CreditCard';

function Payment({
  values,
  payment,
  currentPayment,
  setCurrentPayment,
  setFieldValue,
}) {
  const showPaymentDetail = (vid) => {
    if (currentPayment !== vid) return null;
    if (currentPayment === 1) {
      return (
        <p className="px-5">
          1、選擇"ATM付款"即生成供本次使用的銀行虛擬帳號與唯一的訂單編號（轉帳時請務必輸入正確帳號，避免轉錯帳號造成損失）
          <br />
          2、虛擬帳號從生成之時起在24小時內有效，超時則無法付款成功
        </p>
      );
    }
    if (currentPayment === 4) {
      return <CreditCard values={values} setFieldValue={setFieldValue} />;
    }
    return null;
  };

  return (
    <>
      <h2 className="mb-3">付款方式</h2>

      <div className="payment">
        {payment.map((v, i) => {
          return (
            <>
              <div className="mb-2 px-2" key={v.id}>
                <label>
                  <Field
                    className="me-3"
                    type="radio"
                    name="payment"
                    value={v.id}
                    onChange={(e) => {
                      setCurrentPayment(v.id);
                      setFieldValue('payment', v.id);
                    }}
                    checked={v.id === currentPayment}
                  />
                  {v.order_payment}
                </label>
                {showPaymentDetail(v.id)}
              </div>
            </>
          );
        })}
        <ErrorMessage name="payment">
          {(err) => (
            <>
              <p className="text-danger px-2">{err}</p>
            </>
          )}
        </ErrorMessage>
      </div>
    </>
  );
}

export default Payment;
