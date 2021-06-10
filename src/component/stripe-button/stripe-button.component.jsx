import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51J0fEuEwf5qTr9qrXCYIEcazITtx0ZlJ5qInlTlHHD6x1wEfc6U9AZS2wcvCzYUNxOpKhXEZPl2ZnFO0aHHmq3jH00Qsywi0qU';

  const onToken = token => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://gamek.mediacdn.vn/133514250583805952/2021/5/13/kc2-162088389053473358010.jpg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      allowRememberMe
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;